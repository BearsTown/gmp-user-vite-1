import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useChartStore = defineStore('chart', () => {
  const state = reactive({
    options: {
      //기본
      info: [],
      //상단 차트
      top: [],
      //우측 차트
      rightTab: [],
    },
  })

  return {
    ...toRefs(state),
  }
})
