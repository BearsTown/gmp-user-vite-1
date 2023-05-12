import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useLayerStore = defineStore('useLayerStore', () => {
  const state = reactive({
    layers: [],
  })
  const setLayers = (layer) => {
    state.layers = layer
  }

  return {
    ...toRefs(state),
    setLayers,
  }
})
