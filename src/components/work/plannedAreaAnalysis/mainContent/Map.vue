<template>
  <div
    style="
      flex: 1;
      padding: 5px;
      border-radius: 5px;
      position: relative;
      box-sizing: border-box;
      background-color: var(--el-fill-color-blank);
    "
  >
    <slot name="top"></slot>
    <div id="map" class="main-map"></div>
    <div id="info"></div>
    <form style="position: absolute; top: 100px" action="">
      <label style="display: block" v-for="(obj, i) in Object.keys(keyLayers)" :key="i">
        <input :value="obj" type="checkbox" class="checkbox" :checked="checkedList[obj]" />
        {{ obj }}
      </label>
    </form>
    <div id="map-popup"></div>
    <slot name="top"></slot>
    <div v-if="isLoading" class="loader-div">
      <span class="loader"></span>
    </div>
  </div>
</template>

<script setup>
  /*
    map작업
    auth-ohg
*/
  import { Search, Select } from '@element-plus/icons-vue'
  import { onMounted, onUpdated, reactive } from 'vue'
  import Map from 'ol/Map.js'
  import OSM from 'ol/source/OSM.js'
  import TileLayer from 'ol/layer/Tile.js'
  import View from 'ol/View.js'
  import { defaults } from 'ol/control.js'
  import { fromLonLat, toLonLat } from 'ol/proj'
  import TileWMS from 'ol/source/TileWMS.js'
  import { Vector as VectorSource } from 'ol/source'
  import { GeoJSON, WFS } from 'ol/format'
  import { Vector as VectorLayer } from 'ol/layer'
  import { click, pointerMove } from 'ol/events/condition'
  import Stroke from 'ol/style/Stroke'
  import Style from 'ol/style/Style'
  import { Overlay } from 'ol'
  import { Select as SelectInteraction, defaults as interactionDefalut } from 'ol/interaction'
  import Draw from 'ol/interaction/Draw'
  import { onBeforeMount, ref, watchEffect } from 'vue'
  import Fill from 'ol/style/Fill'
  import { useTestStore } from '@/stores/work/test'
  import { storeToRefs } from 'pinia'
  import mapUtil from '@/js/map/map.js'
  import { testApi } from '@/api/work/testService'
  import { appendToMemberExpression } from '@babel/types'

  const store = useTestStore()
  const { keyLayers, checkedList, wfsVectors } = storeToRefs(store)

  // const getKeyLayers = () => {
  //   testApi.getKeyLayers().then((res) => {
  //     keyLayers.value = res.data
  //   })
  // }
  // getKeyLayers()
  console.log(keyLayers.value)
  const baseMap = new TileLayer({
    source: new OSM(),
  })
  console.log(Object.keys(keyLayers))
  const featureRequest = (layer) =>
    new WFS().writeGetFeature({
      srsName: 'EPSG:3857',
      featureNS: 'http://www.opengis.net/wfs',
      featurePrefix: 'feature',
      featureTypes: [layer],
      outputFormat: 'application/json',
      gmlOptions: { multiSurface: !0 },
    })
  const createWFS = async (layer, KEY) => {
    const vectorSource = new VectorSource()
    const vector = new VectorLayer({
      source: vectorSource,
      style: () =>
        new Style({
          stroke: new Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
            width: 2,
          }),
          fill: new Fill({
            color: 'rgba(100,149,237,0.7)',
          }),
        }),
    })
    const features = await testApi.getWFS(layer, KEY)
    vectorSource.addFeatures(features)
    return vector
  }
  const vectorSource = new VectorSource()
  const vector = new VectorLayer({
    source: vectorSource,
    style: () =>
      new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(100,149,237,0.7)',
        }),
      }),
  })
  const wfsFeatures = {}

  /*
    overlay
*/
  const popup = new Overlay({ element: document.getElementById('map-popup') })

  const hoverStyle = () => {
    return new Style({
      fill: new Fill({ color: 'rgba(100, 149, 237, 0.6)' }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 1)',
        width: 2,
      }),
    })
  }
  const drawSource = new VectorSource()
  const drawLayer = new VectorLayer({
    source: drawSource,
    properties: { name: 'draw' },
  })
  const drawInteraction = new Draw({
    source: drawLayer.getSource(),
    type: 'Polygon',
  })
  const isLoading = ref(false)
  const map = ref(null)

  const tiles = reactive({})

  onBeforeMount(() => {
    mapUtil.getWMSTiles(keyLayers, checkedList, tiles)
    console.log(tiles)
    Object.keys(keyLayers.value).forEach((item) => {
      if (checkedList.value[item] === false) return
      keyLayers.value[item].LAYERS.forEach(async (layer) => {
        store.setWfsVectors(await getWFS(item, layer, keyLayers.value[item].KEY))
      })
    })
  })

  async function getWFS(featureKey, layer, KEY) {
    setIsLoading(isLoading)
    // const features = await testApi.getWFS(layer, KEY)
    // if (!wfsFeatures[featureKey]) {
    //   wfsFeatures[featureKey] = [features]
    // } else {
    //   wfsFeatures[featureKey] = [...wfsFeatures[featureKey], features]
    // }
    // vectorSource.addFeatures(features)
    setIsLoading(isLoading)

    return await createWFS(layer, KEY)
  }
  watchEffect(() => {
    isLoading
  })
  onMounted(() => {
    map.value = new Map({
      target: 'map',
      controls: defaults({
        attribution: false,
        zoom: false,
        rotate: false,
      }),
      layers: [baseMap, ...Object.entries(tiles)[0][1], drawLayer],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([126.6388684, 37.6449168]),
        zoom: 13,
        maxZoom: 19,
      }),
      overlays: [popup],
    })

    mapUtil.clickOverlay(map.value, 'map-popup', popup)
    addEvent()
  })
  onUpdated(() => {
    map.value.addLayer(wfsVectors)
  })
  document.onkeyup = (e) => {
    if (e.key.toLowerCase() === 'escape') {
      map.value.removeInteraction(drawInteraction)
    }
  }
  document.oncontextmenu = () => {
    map.value.removeInteraction(drawInteraction)
  }

  function addEvent() {
    var checkboxes = document.querySelectorAll('.checkbox')
    for (var checkbox of checkboxes) {
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          if (!checkedList.value[e.target.value]) {
            let temp = { ...checkedList.value }
            let _checkedList = { ...checkedList.value, [e.target.value]: true }
            checkedList.value = { ..._checkedList }
            mapUtil.getWMSTiles(keyLayers, checkedList, tiles)
            Object.entries(tiles).forEach(([key, layer]) => {
              if (checkedList.value[key] === true && temp[key] === false)
                map.value.addLayer(...layer)
            })
            Object.keys(keyLayers.value).forEach((item) => {
              if (checkedList.value[item] === false) return
              keyLayers.value[item].LAYERS.forEach(async (layer) => {
                store.setWfsVectors(await getWFS(item, layer, keyLayers.value[item].KEY))
              })
            })
          } else {
            return
          }
        } else {
          if (checkedList.value[e.target.value]) {
            checkedList.value = { ...checkedList.value, [e.target.value]: false }
            removeFeature(e.target.value)

            Object.entries(tiles).forEach((item) => {
              if (checkedList.value[item[0]] === false) {
                map.value.removeLayer(...item[1])
                delete tiles[item[0]]
              }
            })
            wfsFeatures[e.target.value] = []
          } else {
            return
          }
        }
      })
    }
  }

  async function removeFeature(value) {
    setIsLoading(isLoading)
    const wait = (timeToDelay) =>
      new Promise((resolve) => {
        for (let i = 0; i < wfsFeatures[value].length; i++) {
          for (let j = 0; j < wfsFeatures[value][i].length; j++) {
            vectorSource.removeFeature(wfsFeatures[value][i][j])
          }
        }
        setTimeout(resolve, timeToDelay)
      })
    wait(100).then(() => {
      setIsLoading(isLoading)
    })
  }
  function setIsLoading(isLoading) {
    isLoading.value = !isLoading
  }

  /*
    map 작업 끝 -ohg
*/
</script>
<style>
  /*
    ohg
*/

  .main-map {
    width: 100%;
    height: 100%;
  }
  .loader-div {
    opacity: 0.4;
    position: fixed;
    width: 2000px;
    height: 100vh;
    background-color: black;
    justify-content: center;
    line-height: 100vh;
    z-index: 999;
    text-align: center;
  }
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: #ff3d00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .pop-up {
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid orange;
  }
  .pop-up li {
    list-style-type: none;
    list-style: none;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
