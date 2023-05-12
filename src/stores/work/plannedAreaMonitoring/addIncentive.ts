import codeService from '@/api/codeService.js'
import { defineStore } from 'pinia'
import { reactive, ref, toRef } from 'vue'

export const useAddIncentiveDialogStore = defineStore('useIncentiveStore', () => {
  const state = reactive({
    // codeList: []
  })

  async function getCodeList(parentCode) {
    try {
      const { data } = await codeService.getCodeList(parentCode)
      return data
    } catch (error) {
      return error
    }
  }

  return {
    // ...toRef(state),
    getCodeList,
  }
})
