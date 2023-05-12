import { computed, reactive, ref, toRefs } from 'vue'
import { defineStore } from 'pinia'

import { useIncentive } from '@/hooks/useIncentive'
import incentiveService from '@/api/work/operationGMPlan/incentiveService'

export const useIncentiveStore = defineStore('useIncentiveStore', () => {
  const bcrIncentiveList = ref([])
  const farIncentiveList = ref([])

  async function getIncentiveList() {
    const { data } = await incentiveService.getIncentiveList()
    bcrIncentiveList.value = data[0]
    farIncentiveList.value = data[1]

    runCalculate(bcrIncentiveList.value)
    runCalculate(farIncentiveList.value)
  }

  const bcrIncentiveListRef = computed(() => {
    return bcrIncentiveList.value
  })

  const farIncentiveListRef = computed(() => {
    return farIncentiveList.value
  })

  function runCalculate(incentiveList) {
    incentiveList.forEach((incentive) => {
      incentive.isExistsIncentive = isExistsIncentive(incentive['data'])
      incentive.sum = 0.0
      if (incentive.isExistsIncentive) {
        incentive.data.forEach((item) => {
          const { formulaRef, calculateRef } = useIncentive(item.mitigation)
          item.formula = formulaRef.value
          item.calculate = calculateRef.value
          incentive.sum += item.calculate
        })
      }
      incentive.total = Number((incentive['baseRatio'] + incentive.sum).toFixed(3))
    })
  }

  function isExistsIncentive(data) {
    return data && Array.isArray(data) && 0 < data.length
  }

  function itemRemove(type, key) {
    let list = []
    if (type === 'bcr') {
      list = bcrIncentiveList.value
    } else if (type === 'far') {
      list = farIncentiveList.value
    }

    list.forEach((incentive) => {
      if (isExistsIncentive(incentive['data'])) {
        incentive.data = incentive.data.filter((item) => item.key !== key)
      }
    })
    runCalculate(list)
  }

  return {
    bcrIncentiveList,
    bcrIncentiveListRef,
    farIncentiveListRef,
    getIncentiveList,
    itemRemove,
  }
})
