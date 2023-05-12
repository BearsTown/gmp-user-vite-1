import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const state = reactive({
    isLoginDialog: false,
  })

  function setIsLoginDialog(isVisible) {
    state.isLoginDialog = isVisible
  }

  return {
    ...toRefs(state),
    setIsLoginDialog,
  }
})
