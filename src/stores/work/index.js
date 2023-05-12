import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useGmpStore = defineStore('useGmpStore', () => {
  const state_opts = reactive({
    isLeftCollapse: true,
  })

  function setLeftCollapse(collapse) {
    state_opts.isLeftCollapse = collapse
  }

  return {
    ...toRefs(state_opts),
    setLeftCollapse,
  }
})
