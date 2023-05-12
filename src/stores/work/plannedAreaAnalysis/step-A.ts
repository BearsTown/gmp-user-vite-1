import { computed, reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

export const useStepAStore = defineStore('useStepAStore', () => {
  const state = reactive({
    isDetailsCollapse: true,
    exclusionDataList: [{}],
  })

  function setGroupVisible(key, visible) {
    const data = getExclusionDataByKey(key)
    if (data) {
      data.isVisible = visible
    }
  }

  function getExclusionDataByKey(fKey) {
    return state.exclusionDataList.find((data) => data.key === fKey)
  }

  function setExclusionDataList(list) {
    state.exclusionDataList = list
  }

  function setDetailsCollapse(collapse) {
    state.isDetailsCollapse = collapse
  }

  return {
    ...toRefs(state),
    setGroupVisible,
    setDetailsCollapse,
    setExclusionDataList,
    getExclusionDataByKey,
  }
})
