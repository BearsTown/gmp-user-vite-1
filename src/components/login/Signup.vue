<template>
  <div class="signUp">
    <div class="register-form">
      <el-form
        ref="userRef"
        :model="user"
        class="demo-dynamic"
        :rules="rules"
        style="text-align: center"
        label-position="top"
      >
        <el-form-item prop="id" label="아이디">
          <el-input v-model="user.id" />
        </el-form-item>
        <el-form-item prop="name" label="이름">
          <el-input v-model="user.name" />
        </el-form-item>
        <el-form-item prop="email" label="이메일">
          <el-input v-model="user.email" />
        </el-form-item>
        <div style="display: flex; margin-bottom: 22px">
          <el-form-item label="비밀번호" prop="password" style="flex: 1">
            <el-input v-model="user.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="비밀번호 확인" prop="checkPass" style="padding-left: 10px; flex: 1">
            <el-input v-model="user.checkPass" type="password" autocomplete="off" />
          </el-form-item>
        </div>
        <div>
          <!-- <div style="float: left; margin: 0 0 0 30px">
            <el-button @click="goHome()">취소</el-button>
          </div> -->
          <el-form-item style="float: right">
            <el-button type="primary" id="submit" @click="submitForm(userRef)">가입</el-button>
            <el-button @click="resetForm(userRef)">초기화</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, getCurrentInstance } from 'vue'

  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  import { FormInstance, FormRules } from 'element-plus'

  interface UserSign {
    id: string
    name: string
    email: string
    password: string
    checkPass: string
  }

  const { proxy } = getCurrentInstance() as CurrentInstance

  const emits = defineEmits<{
    (e: 'close-handler', type: string): void
  }>()

  const router = useRouter()
  const store = useUserStore()

  const userRef = ref<FormInstance>()
  const user = reactive<UserSign>({
    email: '',
    password: '',
    checkPass: '',
    id: '',
    name: '',
  })

  const rules = reactive<FormRules>({
    email: [{ validator: validateEmail, trigger: 'blur' }],
    id: [{ required: true, validator: validatePass3, trigger: 'blur' }],
    password: [{ required: true, validator: validatePass, trigger: 'blur' }],
    checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
    name: [{ required: true, message: '이름은 필수입니다!', trigger: 'blur' }],
  })

  function validatePass(rule, value, callback) {
    if (value === '') {
      callback(new Error('비밀번호를 입력해주세요!'))
    } else {
      if (user.checkPass !== '') {
        if (!userRef.value) return
        userRef.value.validateField('checkPass')
      }
      callback()
    }
  }

  function validatePass2(rule, value, callback) {
    if (value === '') {
      callback(new Error('비밀번호를 확인은 필수입니다!'))
    } else if (value !== user.password) {
      callback(new Error('비밀번호를 확인해주세요!'))
    } else {
      callback()
    }
  }

  function validatePass3(rule, value, callback) {
    const regExp = /^[_A-Za-z0-9-]{5,20}$/
    console.log(value)

    if (value === '') {
      callback(new Error('아이디 확인은 필수입니다!'))
    } else if (!regExp.test(value)) {
      callback(new Error('5~20자의 영문, 숫자와 특수기호(_),(-)만 사용 가능합니다.'))
    } else {
      callback()
    }
  }

  function validateEmail(rule, value, callback) {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}$/i

    if (value != null && !regExp.test(value)) {
      callback(new Error('이메일 주소 형식을 확인하십시오.'))
    } else {
      callback()
    }
  }

  function submitForm(formName) {
    formName.validate((valid, fields) => {
      if (valid) {
        store
          .register(user)
          .then(() => {
            proxy.$successMessage('가입되었습니다.')
            emits('close-handler', 'signUp')
          })
          .catch((err) => {
            if (err.response.status === 409) {
              proxy.$errorMessage(err.response.data)
            } else {
              proxy.$errorMessage('회원가입 처리 중 에러가 발생했습니다.')
            }
          })
      } else {
        return false
      }
    })
  }

  function resetForm(formName) {
    formName.resetFields()
  }

  function goHome() {
    router.push('/main')
  }
</script>

<style scoped>
  .signUp {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .register-form {
    margin: auto;
    width: 100%;
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    /* background-color: white; */
    padding: 10px;
  }

  .el-form-item__label {
    width: 150px;
  }

  /* #submit {
background-color: #f37762;
color: white;
border: none;
} */
</style>
