<template>
  <el-dialog
    width="500px"
    :lock-scroll="false"
    v-model="isLoginDialog"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="로그인" name="login">
        <LogIn @close-handler="closeHandler" />
      </el-tab-pane>
      <el-tab-pane label="회원가입" name="signUp">
        <Signup @close-handler="closeHandler" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { toRefs, ref, reactive, getCurrentInstance } from 'vue'

  import LogIn from '@/components/login/LogIn.vue'
  import Signup from '@/components/login/Signup.vue'

  import { useLoginStore } from '@/stores/login'

  const loginStore = useLoginStore()
  const { isLoginDialog } = storeToRefs(loginStore)

  const activeName = ref<string>('login')

  function closeHandler(type) {
    if (type == 'signUp') {
      activeName.value = 'login'
    } else {
      loginStore.setIsLoginDialog(false)
    }
  }
</script>
