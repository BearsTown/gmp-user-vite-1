<template>
  <el-dialog
    :title="'패스워드 변경'"
    width="500px"
    :lock-scroll="false"
    v-model="visible"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form
      :model="pwdForm"
      status-icon
      :rules="rules"
      ref="pwdChgFormRef"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-form-item label="현재 패스워드 " prop="currentPwd">
        <el-input type="password" ref="curPwd" v-model="pwdForm.currentPwd" autocomplete="off" />
      </el-form-item>
      <el-form-item label="새 패스워드 " prop="pass">
        <el-input type="password" v-model="pwdForm.pass" autocomplete="off" />
      </el-form-item>
      <el-form-item label="새 패스워드 확인" prop="checkPass">
        <el-input type="password" v-model="pwdForm.checkPass" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="setChangePwdVisible(false)">취소</el-button>
        <el-button type="primary" @click="submitForm(pwdChgFormRef)">적용</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { toRefs, ref, reactive, getCurrentInstance } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { FormInstance, FormRules } from 'element-plus'

  interface ChangePwd {
    currentPwd: string
    pass: string
    checkPass: string
  }

  const { proxy } = getCurrentInstance() as CurrentInstance

  // const props = defineProps<{
  //   isVisible: boolean
  // }>()

  const props = withDefaults(
    defineProps<{
      isVisible: boolean
    }>(),
    {
      isVisible: false,
    },
  )

  const emits = defineEmits<{
    (e: 'close-dialog', type: boolean): void
  }>()

  const visible = toRefs(props).isVisible

  const pwdForm = reactive<ChangePwd>({
    currentPwd: '',
    pass: '',
    checkPass: '',
  })

  const rules = reactive<FormRules>({
    currentPwd: [{ required: true, message: '현재 패스워드를 입력해 주세요.', trigger: 'blur' }],
    pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
    checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
  })

  function validatePass(rule, value, callback) {
    if (value === '') {
      callback(new Error('새 패스워드를 입력해주세요.'))
    } else {
      if (pwdForm.checkPass !== '') {
        if (!pwdChgFormRef.value) return
        pwdChgFormRef.value.validateField('checkPass')
      }
      callback()
    }
  }

  function validatePass2(rule, value, callback) {
    if (value === '') {
      callback(new Error('새 패스워드 확인을 입력해주세요.'))
    } else if (value !== pwdForm.pass) {
      callback(new Error('새 패스워드와 일치하지 않습니다.'))
    } else {
      callback()
    }
  }

  const store = useUserStore()
  const pwdChgFormRef = ref<FormInstance>()

  function submitForm(formName) {
    formName.validate(async (valid, fields) => {
      if (valid) {
        const obj = {
          curPassword: pwdForm.currentPwd,
          newPassword: pwdForm.pass,
        }

        store
          .changePassword(obj)
          .then(() => {
            proxy.$successMessage('패스워드가 변경되었습니다.')
            emits('close-dialog', false)
          })
          .catch((err) => {
            if (err.response.status === 401) {
              proxy.$errorMessage('현재 패스워드가 불일치 합니다.')
            } else {
              proxy.$errorMessage('회원가입 처리 중 에러가 발생했습니다.')
            }
          })
      } else {
        return false
      }
    })
  }

  function reset() {
    pwdChgFormRef.value!.resetFields()
  }

  function setChangePwdVisible(isVisible: boolean) {
    reset()
    emits('close-dialog', isVisible)
  }
</script>
