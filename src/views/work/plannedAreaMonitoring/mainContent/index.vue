<template>
  <Map ref="map" />
  <Details ref="details" />
</template>

<script setup>
  import { onMounted, ref } from 'vue'

  const count = ref(0)

  const map = ref(null)

  import Map from '@/components/work/plannedAreaMonitoring/mainContent/Map.vue'
  import Details from '@/components/work/plannedAreaMonitoring/mainContent/Details.vue'

  import { useStepBStore } from '@/stores/work/plannedAreaAnalysis/step-B'
  import { storeToRefs } from 'pinia'

  const stepBStore = useStepBStore()

  const { selectedList1 } = storeToRefs(stepBStore)

  onMounted(() => {})
</script>

<style scoped></style>
