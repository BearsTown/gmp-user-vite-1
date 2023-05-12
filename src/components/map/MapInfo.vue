<template>
  <div class="map-board" :class="{ closed: show }">
    <div class="item" data-name="header">
      <button @click="setShow">-</button>
    </div>
    <div class="item" data-name="layer">
      <div>
        <small>layer</small>

        <select :value="layerState" @change="setLayerState">
          <option value="base-osm">OSM</option>
          <option value="base-vworld-base">VWorld 기본</option>
          <option value="base-vworld-gray">VWorld 흑백</option>
          <option value="base-vworld-midnight">VWorld 야간</option>
          <option value="base-vworld-satellite">VWorld 위성</option>
          <option value="base-google-road">Google 로드맵</option>
          <option value="base-google-terrain">Google 지형도</option>
          <option value="base-google-alter">Google 변경된 로드맵</option>
          <option value="base-google-satellite">Google 위성</option>
          <option value="base-google-only-terrain">Google 지형 전용도</option>
          <option value="base-google-hybrid">Google 하이브리드</option>
        </select>
      </div>
    </div>

    <div class="item" data-name="meta">
      <div>
        <small>proj</small>
        <input name="proj" v-model="epsg" readOnly />
      </div>

      <div>
        <small>zoom</small>
        <input name="zoom" readOnly />
      </div>
    </div>

    <div class="item" data-name="position">
      <div>
        <small>x</small>
        <input name="x" value="0" readOnly />
      </div>

      <div>
        <small>y</small>
        <input name="y" value="0" readOnly />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onUpdated, ref } from 'vue'
  import { useMapInfoStore, moveType } from '@/stores/mapInfo'
  import {
    osmLayer,
    vworldBaseLayer,
    vworldGrayLayer,
    vworldMidnightLayer,
    vworldSatelliteLayer,
    googleRoadLayer,
    googleTerrainLayer,
    googleAlterLayer,
    googleSatelliteLayer,
    googleOnlyTerrainLayer,
    googleHybridyLayer,
  } from '@/js/layers'
  import { Map } from 'ol'
  import mapUtil from '@/js/map/map.js'
  const mapStore = useMapInfoStore()
  //layer 내부기능
  const layerState = ref(null)
  const show = ref(false)
  const epsg = ref('')
  const setLayerState = (e) => {
    layerState.value = e.target.value
    if (props.map !== null) {
      props.map
        .getAllLayers()
        .filter((layer) => layer.get('name') && layer.get('name').startsWith('base'))
        .forEach((layer) => props.map.removeLayer(layer))
      switch (layerState.value) {
        case 'base-vworld-base':
          props.map.addLayer(vworldBaseLayer)
          break

        case 'base-vworld-gray':
          props.map.addLayer(vworldGrayLayer)
          break

        case 'base-vworld-midnight':
          props.map.addLayer(vworldMidnightLayer)
          break

        case 'base-vworld-satellite':
          props.map.addLayer(vworldSatelliteLayer)
          break

        case 'base-google-road':
          props.map.addLayer(googleRoadLayer)
          break

        case 'base-google-terrain':
          props.map.addLayer(googleTerrainLayer)
          break

        case 'base-google-alter':
          props.map.addLayer(googleAlterLayer)
          break

        case 'base-google-satellite':
          props.map.addLayer(googleSatelliteLayer)
          break

        case 'base-google-only-terrain':
          props.map.addLayer(googleOnlyTerrainLayer)
          break

        case 'base-google-hybrid':
          props.map.addLayer(googleHybridyLayer)
          break

        default:
          props.map.addLayer(osmLayer)
          break
      }
    }
  }
  const setShow = () => {
    show.value = !show.value
  }

  const props = defineProps({
    map: {
      type: Map,
    },
  })
  //moveEnd시의 event
  const setMoveEnd = () => {
    const zoom = props.map.getView().getZoom() || 0
    //prev로 이동, next로 이동시 제한
    if (mapStore.type === moveType.CURRENT) {
      mapStore.addMapInfo({ zoomLevel: zoom, position: props.map.getView().getCenter() })
    }
    mapUtil.setZoom(zoom)
    mapStore.type = moveType.CURRENT
  }

  const setPosition = (e) => mapUtil.setPosition(e.coordinate)
  onUpdated(() => {
    if (props.map) {
      props.map.once('postrender', () => {
        const zoom = props.map.getView().getZoom() || 0
        const [minX, minY, maxX, maxY] = props.map.getView().calculateExtent()
        const [x, y] = [(minX + maxX) / 2, (minY + maxY) / 2]

        mapUtil.setZoom(zoom)
        epsg.value = props.map.getView().getProjection().getCode()
        mapUtil.setPosition([x, y])
      })
      props.map.un('moveend', setMoveEnd)
      props.map.on('moveend', setMoveEnd)
      props.map.un('pointermove', setPosition)
      props.map.on('pointermove', setPosition)
    }
  })
</script>

<style scoped lang="scss">
  .map-board {
    position: absolute;
    bottom: 75px;
    right: 25px;

    padding: 10px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    background-color: white;
    border: 1px solid gainsboro;
    border-radius: 10px;

    box-shadow: 3px 3px 10px grey;
    box-sizing: border-box;

    width: 220px;
    height: 250px;

    overflow: hidden;

    transition: width 0.3s, height 0.3s;

    .item {
      display: flex;
      flex-direction: column;
      gap: 5px;

      & > div {
        display: flex;
        align-items: center;

        background-color: var(--el-color-primary);

        border: 1px solid gainsboro;
        border-radius: 5px;

        font-size: 14px;

        small {
          display: inline-block;
          width: 40px;
          color: white;
          text-align: center;
        }

        input:not([type='checkbox']),
        select {
          width: 130px;
          height: 100%;

          padding: 5px;

          border: transparent;
          box-sizing: border-box;

          font-size: 12px;

          &:focus {
            outline-color: dodgerblue;
            outline-width: 0.1px;
            outline-style: inset;
          }
        }

        input[type='checkbox'] {
          margin: 5px;
        }

        button {
          background: transparent;
          border: transparent;

          padding: 5px;

          font-size: 12px;

          cursor: pointer;

          &:active {
            opacity: 0.5;
          }
        }
      }

      &[data-name='header'] {
        display: block;

        button {
          padding: 5px;
          box-sizing: border-box;

          border: transparent;
          background-color: transparent;

          cursor: pointer;
        }
      }
    }

    &.closed {
      width: 30px;
      height: 30px;

      padding: 2px;

      border-radius: 4px;

      transition: width 0.3s, height 0.3s;
    }
  }
</style>
