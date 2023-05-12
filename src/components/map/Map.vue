<template>
  <div v-show="map" class="map-div">
    <!-- <Layers
      ref="layers"
      layer-key="layerKey"
      buld-name="buldName"
      layer-name="layer"
      :request-api="requestApi"
      @change="setLayer"
    ></Layers> -->
    <slot name="top"></slot>
    <div id="base-map" class="main-map"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
    <MapFunc :map="map" />
    <MapInfo :map="map" />
  </div>
</template>
<script setup>
  import { onMounted, reactive, ref, onUpdated, watch } from 'vue'
  import Layers from './LayerSelect.vue'
  import { layerAPI } from '@/api/work/map/layerService'
  import MapFunc from './MapFunc.vue'
  import MapInfo from './MapInfo.vue'
  import { testApi } from '@/api/work/testService'
  import { gmpVectorSource } from '@/js/map/mapSource'
  import {
    and as andFilter,
    equalTo as equalToFilter,
    like as likeFilter,
  } from 'ol/format/filter.js'
  import { GeoJSON, WFS } from 'ol/format'
  import { mapControl } from '@/js/map/mapControl'
  import { defaultMapOption } from '@/js/map/properties'
  import { Overlay } from 'ol'
  import mapUtil from '@/js/map/map'

  const layerSelectionData = ref()
  const layerVisibleData = ref()
  function exclusionLayerSelectionChange(data) {
    layerSelectionData.value = data
    setLayer(transferLayerData(data.selectedList))
  }
  function exclusionVisibleChange(data) {
    layerVisibleData.value = data
  }

  function transferLayerData(layers) {
    return layers.map((item) => {
      return { key: selectedLayers[item['planGroup']].key, layer: item['planLayerCode'] }
    })
  }
  //mapController 생성
  //map 생성
  const map = ref(null)
  //layers {key,layers}
  const layers = ref()
  //store

  const requestApi = () => {
    return layerAPI.getAll()
  }

  const selectedLayers = {
    b1: {
      key: '0B0B7059-E6F9-534A-C2A5-A7A96A54BD0B',
      layer: 'GMP_P1_B1_BULDUP',
    },
    b2: {
      key: 'E9CACF3D-FC89-E568-6C8F-CAE41644A83A',
      layer:
        'GMP_P1_A1_SGG,GMP_P1_B2_LT_C_14,GMP_P1_B2_LT_C_04,GMP_P1_B2_LT_C_05,GMP_P1_B2_LT_C_07,GMP_P1_B2_LT_C_08,GMP_P1_B2_LT_C_09,GMP_P1_B2_LT_C_10,GMP_P1_B2_LT_C_11,GMP_P1_B2_LT_C_12,GMP_P1_B2_LT_C_13',
    },
    b3: {
      key: 'B1003289-17EB-03E8-C717-187CCDDAE373',
      layer:
        'GMP_P1_B3_DSTPLAN_01,GMP_P1_B3_DSTPLAN_02,GMP_P1_B3_DSTPLAN_03,GMP_P1_B3_DSTPLAN_04,GMP_P1_B3_DSTPLAN_05,GMP_P1_B3_DSTPLAN_06,GMP_P1_B3_DSTPLAN_07,GMP_P1_B3_DSTPLAN_08,GMP_P1_B3_DSTPLAN_09,GMP_P1_B3_DSTPLAN_10,GMP_P1_B3_DSTPLAN_11,GMP_P1_B3_DSTPLAN_12,GMP_P1_B3_DSTPLAN_13,GMP_P1_B3_DSTPLAN_14,GMP_P1_B3_DSTPLAN_15,GMP_P1_B3_DSTPLAN_16,GMP_P1_B3_DSTPLAN_17,GMP_P1_B3_DSTPLAN_18,GMP_P1_B3_DSTPLAN_19,GMP_P1_B3_DSTPLAN_20,GMP_P1_B3_DSTPLAN_21,GMP_P1_B3_DSTPLAN_22,GMP_P1_B3_DSTPLAN_23,GMP_P1_B3_DSTPLAN_24,GMP_P1_B3_DSTPLAN_25,GMP_P1_B3_DSTPLAN_26,GMP_P1_B3_DSTPLAN_27',
    },
    b4: {
      key: '93AA112F-BC95-8747-0DD3-D94FE9D24EA4',
      layer:
        'GMP_P1_B4_SPFC_01,GMP_P1_B4_SPFC_02,GMP_P1_B4_SPFC_03,GMP_P1_B4_SPFC_04,GMP_P1_B4_SPFC_05',
    },
    s1: {
      key: '0B5C3A5A-8285-B6DC-ADAE-21E3FBFB1965',
      layer: 'GMP_P1_S1_DSTPLAN_2303',
    },
  }

  //layer 선택시 layer 전부 전부
  /**
   *
   * @param {{layer,key}} layer
   */
  function setLayer(layer) {
    console.log(layer)
    //layer 선택 시 layer 중 기존 tiles에 존재하고있으면 getWMS 호출x
    const allTiles = Object.keys(tiles)
    const layerTiles = new Set()
    layer.forEach((layer) => {
      layerTiles.add(layer.key + layer.layer)
      //기존에 존재하면 getWMS 호출 x
      if (allTiles.includes(layer.key + layer.layer)) {
        return
      }
      tiles[layer.key + layer.layer] = testApi.getWMS({ LAYERS: layer.layer, KEY: layer.key })
    })
    //선택해제하고나면, allTiles > layerTiles가 된다.
    //선택 해제된 경우
    allTiles.forEach((tile) => {
      if (!layerTiles.has(tile)) {
        mapControl.removeLayer(tiles[tile])
        delete tiles[tile]
      }
    })
    Object.entries(tiles).forEach(([key, layer]) => {
      if (allTiles.includes(key)) return
      mapControl.addLayer(layer)
    })
  }
  const featureRequest = (layer) => {
    new WFS().writeGetFeature({
      srsName: 'EPSG:3857',
      featureNS: 'http://www.opengis.net/wfs',
      featurePrefix: 'feature',
      featureTypes: [layer],
      outputFormat: 'application/json',
      filter: andFilter(),
    })
  }
  const getWFS = async (layer, KEY) => {
    const res = await fetch(`http://211.171.200.56:9990/mapstudio/wfs?KEY=${KEY}`, {
      method: 'POST',
      body: new XMLSerializer().serializeToString(featureRequest(layer)),
    })
    const json = await res.json()
    const features = new GeoJSON().readFeatures(json)
    gmpVectorSource.addFeatures(features)
    return features
  }
  //WMS 모음
  const tiles = reactive({})

  function QueryStringToJSON(str) {
    var pairs = str.split('&')
    var result = {}
    pairs.forEach(function (pair) {
      pair = pair.split('=')
      var name = pair[0]
      var value = pair[1]
      if (name.length)
        if (result[name] !== undefined) {
          if (!result[name].push) {
            result[name] = [result[name]]
          }
          result[name].push(value || '')
        } else {
          result[name] = value || ''
        }
    })
    return result
  }
  const popup = document.getElementById('popup')
  const overlay = new Overlay({ element: popup })
  onMounted(() => {
    setTimeout(() => {
      mapControl.init(defaultMapOption)
      map.value = mapControl.map
      // map.value.addOverlay(overlay)
      // mapUtil.clickOverlay(map.value, 'popup', overlay)
    }, 50)
  })
  defineExpose({
    exclusionLayerSelectionChange,
    exclusionVisibleChange,
  })
</script>

<style scoped lang="scss">
  .map-div {
    flex: 1;
    padding: 5px;
    border-radius: 5px;
    position: relative;
    box-sizing: border-box;
    background-color: var(--el-fill-color-blank);
  }
  .main-map {
    width: 100%;
    height: 100%;
  }
  /* .ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: '✖';
} */
</style>
