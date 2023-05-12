<template>
  <div
    id="map"
    style="
      flex: 1;
      padding: 5px;
      border-radius: 5px;
      box-sizing: border-box;
      background-color: var(--el-fill-color-blank);
    "
  ></div>
</template>

<script setup>
  import 'ol/ol.css'
  import Map from 'ol/Map.js'
  import OSM from 'ol/source/OSM.js'
  import TileLayer from 'ol/layer/Tile.js'
  import View from 'ol/View.js'
  import { onMounted, ref, watch } from 'vue'

  import { useStepAStore } from '@/stores/work/plannedAreaAnalysis/step-A'
  import { storeToRefs } from 'pinia'

  const map = ref(null)

  onMounted(() => {
    map.value = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })
  })

  defineExpose({})
</script>

<style scoped lang="scss"></style>
