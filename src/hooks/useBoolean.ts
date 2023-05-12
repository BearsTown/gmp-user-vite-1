import { ref, computed } from 'vue'

export const useBoolean = (defaultValue = true) => {
  const bool = ref(defaultValue)

  const isBoolRef = computed({
    get: () => {
      return bool.value
    },
    set: (state: boolean) => {
      bool.value = state
    },
  })

  return {
    isBoolRef,
    on: () => (bool.value = true),
    off: () => (bool.value = false),
    toggle: () => (bool.value = !bool.value),
  }
}
