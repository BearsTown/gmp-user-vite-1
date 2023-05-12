<template>
  <div id="map" class="main-map"></div>
  <div id="info"></div>
  <form style="position: absolute; top: 100px" action="">
    <label style="display: block" v-for="(obj, i) in Object.keys(keyLayers)" :key="i">
      <input :value="obj" type="checkbox" class="checkbox" :checked="checkedList[obj]" />
      {{ obj }}
    </label>
  </form>
  <div id="map-popup"></div>
  <div v-if="isLoading" class="loader-div">
    <span class="loader"></span>
  </div>
</template>

<script setup>
  /*
    map작업
    auth-ohg
*/
  import { Search, Select } from '@element-plus/icons-vue'
  import { onMounted, reactive } from 'vue'
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
  import { testApi } from '@/api/work/testService'

  const store = useTestStore()
  const { keyLayers, checkedList } = storeToRefs(store)
  keyLayers.value = testApi.getKeyLayers()
  const baseMap = new TileLayer({
    source: new OSM(),
  })

  const getWMS = (option) => {
    return new TileLayer({
      source: new TileWMS({
        url: 'http://211.171.200.56:9990/mapstudio/wms',
        params: {
          CRS: 'EPSG:3857',
          ...option,
        },
        serverType: 'geoserver',
        transition: 0,
      }),
    })
  }
  const featureRequest = (layer) =>
    new WFS().writeGetFeature({
      srsName: 'EPSG:3857',
      featureNS: 'http://www.opengis.net/wfs',
      featurePrefix: 'feature',
      featureTypes: [layer],
      outputFormat: 'application/json',
      gmlOptions: { multiSurface: !0 },
    })
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

  const hoverSelect = new SelectInteraction({
    condition: pointerMove,
    style: () => hoverStyle(),
  })
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
    getWMSTiles()
    Object.keys(keyLayers.value).forEach((item) => {
      if (checkedList.value[item] === false) return
      keyLayers.value[item].LAYERS.forEach((layer) => {
        getWFS(item, layer, keyLayers.value[item].KEY)
      })
    })
  })

  function getWMSTiles() {
    Object.keys(keyLayers.value).forEach((item) => {
      let temp = []
      if (checkedList.value[item] === false) {
        return
      }

      if (tiles[item] !== undefined) return
      temp.push(
        getWMS({
          KEY: keyLayers.value[item].KEY,
          LAYERS: keyLayers.value[item].LAYERS,
        }),
      )
      tiles[item] = temp
    })
  }

  async function getWFS(featureKey, layer, KEY) {
    setIsLoading(isLoading)
    const res = await fetch(`http://211.171.200.56:9990/mapstudio/wfs?KEY=${KEY}`, {
      method: 'POST',
      body: new XMLSerializer().serializeToString(featureRequest(layer)),
    })
    const json = await res.json()
    const features = new GeoJSON().readFeatures(json)
    if (!wfsFeatures[featureKey]) {
      wfsFeatures[featureKey] = [features]
    } else {
      wfsFeatures[featureKey] = [...wfsFeatures[featureKey], features]
    }
    vectorSource.addFeatures(features)
    setIsLoading(isLoading)
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
      layers: [baseMap, vector, ...Object.entries(tiles)[0][1], drawLayer],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([126.6388684, 37.6449168]),
        zoom: 13,
        maxZoom: 19,
      }),
      overlays: [popup],
    })

    map.value.on('singleclick', (e) => {
      if (map.value.hasFeatureAtPixel(e.pixel)) {
        document.getElementById('map-popup').innerHTML = ''
        map.value.forEachFeatureAtPixel(e.pixel, (feature) => {
          if (feature.getId()) {
            const geom = feature.getGeometry()
            if (geom) {
              const coordinate = e.coordinate
              flyTo(map.value.getView(), coordinate)
              if (feature.get('KIND') === undefined) {
                document.getElementById('map-popup').innerHTML += `<ul class="pop-up">
                                    <li>${feature.get('CDNM_ENG')}</li>
                                    <li>${feature.get('META_DATE')}</li>
                                </ul>`
              } else {
                const KIND =
                  feature.get('KIND') === undefined
                    ? ''
                    : feature.get('KIND').indexOf('PA') >= 0
                    ? '공원'
                    : feature.get('KIND').indexOf('PB') >= 0
                    ? '녹지'
                    : '기타'
                document.getElementById('map-popup').innerHTML += `<ul class="pop-up">
                                    <li>${KIND}</li>
                                    <li>${feature.get('NAME')}</li>
                                    <li>${feature.get('PARK_ID')}</li>
                                </ul>`
              }

              popup.setPosition(coordinate)
            }
          }
        })
      }
    })
    addEvent()
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
            getWMSTiles()
            Object.entries(tiles).forEach(([key, layer]) => {
              if (checkedList.value[key] === true && temp[key] === false)
                map.value.addLayer(...layer)
            })
            Object.keys(keyLayers.value).forEach((item) => {
              if (checkedList.value[item] === false) return
              keyLayers.value[item].LAYERS.forEach(async (layer) => {
                await getWFS(item, layer, keyLayers.value[item].KEY)
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
  function addPolygon({ map, drawend }) {
    if (map) {
      let drawLayer = map.getAllLayers().filter((layer) => layer.get('name') === 'draw')[0]

      // 드로우 벡터 레이어가 없을 경우
      if (!drawLayer) {
        const drawSource = new VectorSource()

        drawLayer = new VectorLayer({
          properties: { name: 'draw' },
          source: drawSource,
        })

        map.addLayer(drawLayer)
      }

      const drawInteraction = new Draw({
        source: drawLayer.getSource(),
        type: 'Polygon',
      })

      document.onkeyup = (e) => {
        // ESC를 눌렀을 경우
        if (e.key.toLowerCase() === 'escape') {
          map.removeInteraction(drawInteraction)
        }
      }

      document.oncontextmenu = () => {
        map.removeInteraction(drawInteraction)
      }

      const onClick = () => {
        drawInteraction.once('drawstart', () => {
          const source = drawLayer.getSource()
          source.clear()
        })

        // 드로우 종료 메서드가 있을 경우
        if (drawend) {
          drawInteraction.once('drawend', (e) => {
            map.removeInteraction(drawInteraction)
            drawend(e)
          })
        }

        map.addInteraction(drawInteraction)
      }
    }
  }
  function flyTo(view, location) {
    const duration = 2000
    const zoom = view.getZoom() || 15
    let parts = 2
    let called = false
    const callback = (complete) => {
      --parts

      // 동작이 끝났을 경우
      if (called) {
        return
      }

      // 동작한 경우
      if (parts === 0 || !complete) {
        called = true
      }
    }

    view.animate(
      {
        center: location,
        duration,
      },
      callback,
    )

    view.animate(
      {
        duration: duration / 2,
        zoom: zoom - 1,
      },
      {
        duration: duration / 2,
        zoom,
      },

      callback,
    )
  }
  async function removeFeature(value) {
    setIsLoading(isLoading)
    vectorSource.clear()

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
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }

  .el-tabs--right .el-tabs__content,
  .el-tabs--left .el-tabs__content {
    height: 100%;
  }

  .el-tabs {
    --el-tabs-header-height: 180px;
  }

  .el-tabs__item {
    padding: 10px 0px;
    writing-mode: vertical-lr;
    line-height: 40px;
    z-index: 2;
    color: white;
    border-radius: 10px 0px 0px 10px;
    margin-left: 15px;
    font-weight: bold;
    border-color: #0d6a9b;
    border-width: 0px 0px 7px 1px;
    border-style: solid;
    background: #0c92d7;
  }

  .el-tabs__active-bar {
    border-radius: 10px 0px 0px 10px;
  }

  .el-tabs__item.is-active {
    background: white;
    color: #0d6a9b;
  }

  .el-tabs--left .el-tabs__item.is-left {
    text-align: center;
  }

  .demo-tabs > .el-tabs__content {
    overflow-y: auto;
  }

  .demo-tabs > .el-tabs__content {
    background: white;
  }

  html {
    /* 드래그 방지 */
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }

  html,
  body {
    font-family: Avenir, SpoqaHanSans, 'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕',
      'Nanum Gothic', Dotum, '돋움', Helvetica, sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  .el-tabs--left .el-tabs__header.is-left {
    margin-right: 0px;
    background: #0c92d7;
  }

  .common-layout .el-aside {
    display: flex;
    flex-direction: column;
    background-color: #0c92d7 !important;
  }

  .el-tabs__item:hover {
    color: #0d6a9b;
  }

  .el-tabs--left .el-tabs__nav-wrap.is-left::after,
  .el-tabs--left .el-tabs__nav-wrap.is-right::after,
  .el-tabs--right .el-tabs__nav-wrap.is-left::after,
  .el-tabs--right .el-tabs__nav-wrap.is-right::after {
    width: 0px;
  }

  .el-checkbox-group {
    display: flex;
    flex-direction: column;
    padding: 3px 10px;
    border: 2px solid;
    border-radius: 5px;
    border-color: #0c92d7;
  }

  .el-collapse-item__header > label {
    padding-left: 7px;
  }

  .common-layout .el-main {
    padding: 0px;
  }

  .common-layout .el-main > div {
    width: inherit;
    height: inherit;
  }

  input::placeholder {
    font-size: 7pt;
  }

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
