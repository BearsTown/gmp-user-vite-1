<template>
  <Map ref="mapRef" />
  <Details ref="detailsRef" />
</template>

<script setup>
  import { onMounted, ref } from 'vue'

  import Map from '@/components/work/operationGMPlan/mainContent/Map.vue'
  import Details from '@/components/work/operationGMPlan/mainContent/Details/index.vue'

  const mapRef = ref()
  const detailsRef = ref()

  onMounted(() => {})
</script>

<style scoped></style>
