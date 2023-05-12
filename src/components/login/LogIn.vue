<template>
  <div class="login">
    <el-form class="login-form" :model="loginForm" :rules="rules" ref="form">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="아이디" ref="usernameInput">
          <template #prepend>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="비밀번호"
          type="password"
          ref="passwordInput"
        >
          <template #prepend>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item style="float: right">
        <el-button type="primary" native-type="submit" block @click.prevent="login"
          >로그인
        </el-button>

        <el-button block @click.prevent="closeDialog">취소</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted, getCurrentInstance } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { FormRules } from 'element-plus'

  interface Login {
    username: string
    password: string
  }

  const emits = defineEmits<{
    (e: 'close-handler', type: string): void
  }>()

  const { proxy } = getCurrentInstance() as CurrentInstance

  let loading: Nullable<void> = null
  const loginForm = reactive<Login>({
    username: '',
    password: '',
  })

  const rules = reactive<FormRules>({
    username: [
      {
        required: true,
        message: '아이디를 입력하세요.',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '비밀번호를 입력하세요.',
        trigger: 'blur',
      },
    ],
  })

  function login() {
    const store = useAuthStore()
    loading = proxy.$cmmLoading('')

    store
      .logIn(loginForm)
      .then(() => {
        closeDialog()
      })
      .catch((err) => {
        loginForm.password = ''
        console.log(err)
        if (
          err.response.status === 400 &&
          err.response.data.error_description &&
          err.response.data.error_description.indexOf('잠겨') > -1
        ) {
          proxy.$errorMessage(err.response.data.error_description)
        } else if (
          err.response.status === 400 &&
          err.response.data.error_description &&
          err.response.data.error_description.indexOf('유효') > -1
        ) {
          proxy.$errorMessage('관리자 승인이 필요한 계정입니다.')
        } else if (err.response.status === 400) {
          proxy.$errorMessage('일치하는 사용자 정보가 없습니다.')
        } else {
          proxy.$errorMessage('로그인 처리 중 에러가 발생했습니다.')
        }
      })
      .finally(() => {
        loading.close()
      })
  }

  function closeDialog() {
    emits('close-handler', 'login')
  }

  onMounted(() => {
    //글로벌변수 호출 확인
    console.log(proxy.$cmmLoading)
  })
</script>

<style scoped>
  .login {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .login-button {
    width: 100%;
  }

  .login-form {
    margin: auto;
    width: 100%;
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    /* background-color: white; */
    padding: 10px;
  }

  .login-form a {
    width: 100%;
    text-decoration: none;
  }

  /* .el-button--primary {
background: #339578;
border-color: #549280;
} */
</style>
