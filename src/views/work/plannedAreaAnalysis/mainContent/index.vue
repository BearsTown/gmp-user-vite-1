<template>
  <Map ref="mapRef">
    <template #top>
      <Top ref="topRef" />
    </template>
  </Map>
  <Details ref="detailsRef" />
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'

  import Top from '@/components/work/plannedAreaAnalysis/mainContent/Top.vue'
  // import Map from '@/components/work/plannedAreaAnalysis/mainContent/Map.vue'
  import Map from '@/components/map/Map.vue'
  import Details from '@/components/work/plannedAreaAnalysis/mainContent/Details.vue'

  import mittBus from '@/utils/mittBus'
  import { useStepAStore } from '@/stores/work/plannedAreaAnalysis/step-A'

  const stepAStore = useStepAStore()
  // const { selectedList1 } = storeToRefs(stepAStore)

  const mapRef = ref()
  const topRef = ref()
  const detailsRef = ref()

  function exclusionVisibleChange(data) {
    console.log(data)
    mapRef.value.exclusionVisibleChange(data)
    topRef.value.exclusionVisibleChange(data)
    detailsRef.value.exclusionVisibleChange(data)
  }

  function exclusionLayerSelectionChange(data) {
    console.log(data)
    mapRef.value.exclusionLayerSelectionChange(data)
    topRef.value.exclusionLayerSelectionChange(data)
  }

  function exclusionTypeChange(data) {
    console.log(data)
    topRef.value.exclusionTypeChange(data)
  }

  mittBus.on('exclusion-visible-change', exclusionVisibleChange)
  mittBus.on('exclusion-layer-selection-change', exclusionLayerSelectionChange)
  mittBus.on('exclusion-type-change', exclusionTypeChange)

  onMounted(() => {})
</script>

<style scoped></style>
