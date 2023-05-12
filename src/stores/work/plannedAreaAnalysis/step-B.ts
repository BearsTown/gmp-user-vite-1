import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

export const useStepBStore = defineStore('useStepBStore', () => {
  const state_opts = reactive({
    isDetailsCollapse: true,
    selectedList1: [],
  })

  function setSelectedList1(list) {
    state_opts.selectedList1 = list
  }

  function setStep(step) {
    state_opts.currentStep = step
  }

  function setDetailsCollapse(collapse) {
    state_opts.isDetailsCollapse = collapse
  }

  return {
    ...toRefs(state_opts),
    setSelectedList1,
    setDetailsCollapse,
    setStep,
  }
})
