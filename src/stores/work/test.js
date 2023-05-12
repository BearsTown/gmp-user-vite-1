import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTestStore = defineStore('useTestStore', () => {
  const keyLayers = reactive({
    mapA: {
      KEY: 'D4A8C9B0-E42E-555B-F06F-840E6D558B8D',
      LAYERS: ['TEST_DEVELOP_AREA'],
    },
    mapB: {
      KEY: '5B1AC435-395B-E831-19E6-A7CE51787C45',
      LAYERS: ['TEST_SCCO_EMD', 'PGMS_PARK_PO'],
    },
    mapC: {
      KEY: 'D96BA1C4-390D-BBA6-668C-9E1B52C4CEDB',
      LAYERS: ['LP_PA_CBND'],
    },
    mapD: {
      KEY: '0B5C3A5A-8285-B6DC-ADAE-21E3FBFB1965',
      LAYERS: ['GMP_P1_S1_DSTPLAN_2303'],
    },
  })
  const checkedList = reactive({
    mapA: true,
    mapB: false,
    mapC: false,
  })
  const wfsVectors = reactive([])
  const setWfsVectors = (newVector) => {
    if (!wfsVectors.includes(newVector)) {
      wfsVectors.push(newVector)
    }
  }
  const vectorLayers = reactive({})

  return { keyLayers, checkedList, wfsVectors, setWfsVectors }
})
