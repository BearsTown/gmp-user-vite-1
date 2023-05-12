<template>
  <DetailsAside ref="test" :is-details-collapse="isDetailsCollapse">
    <template #content>
      <h1 @click="setDeatailsCollapse(!isDetailsCollapse)">H1</h1>

      <p>
        <AddIncentive />
      </p>
    </template>
  </DetailsAside>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'

  import DetailsAside from '@/components/common/DetailsAside.vue'

  import { useStepBStore } from '@/stores/work/plannedAreaAnalysis/step-B'
  import { storeToRefs } from 'pinia'
  import AddIncentive from '@/components/work/plannedAreaMonitoring/mainContent/AddIncentive.vue'

  const test = ref(null)

  const stepBStore = useStepBStore()

  const { selectedList1, isDetailsCollapse } = storeToRefs(stepBStore)

  onMounted(() => {})

  function setDeatailsCollapse(collapse) {
    stepBStore.setDetailsCollapse(collapse)
  }

  watch(
    () => selectedList1.value,
    () => {
      console.log(selectedList1.value)
    },
  )

  defineExpose({
    setDeatailsCollapse,
  })
</script>

<style scoped lang="scss"></style>
