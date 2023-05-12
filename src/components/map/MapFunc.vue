<template>
  <div class="map-util">
    <div class="item" data-name="zoom">
      <el-button style="margin-right: 16px">
        <el-icon><FullScreen /></el-icon>
      </el-button>
    </div>
    <div class="item" data-name="zoom-in">
      <el-button style="margin-right: 16px">
        <el-icon><Plus /></el-icon>
      </el-button>
    </div>
    <div class="item" data-name="zoom-out">
      <el-button style="margin-right: 16px">
        <el-icon><Minus /></el-icon>
      </el-button>
    </div>
    <div class="item">
      <el-popover placement="left" :width="150" trigger="click">
        <template #reference>
          <el-button style="margin-right: 16px">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Edit / Edit_Pencil_Line_01">
                <path
                  id="Vector"
                  d="M4 20.0001H20M4 20.0001V16.0001L12 8.00012M4 20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </el-button>
        </template>
        <el-button @click="() => mapUtil.addInteraction(map, 'LineString')">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="3"
            stroke="#000000"
            fill="none"
          >
            <path
              d="M17.94,54.81a.1.1,0,0,1-.14,0c-1-1.11-11.69-13.23-11.69-21.26,0-9.94,6.5-12.24,11.76-12.24,4.84,0,11.06,2.6,11.06,12.24C28.93,41.84,18.87,53.72,17.94,54.81Z"
            />
            <circle cx="17.52" cy="31.38" r="4.75" />
            <path
              d="M49.58,34.77a.11.11,0,0,1-.15,0c-.87-1-9.19-10.45-9.19-16.74,0-7.84,5.12-9.65,9.27-9.65,3.81,0,8.71,2,8.71,9.65C58.22,24.52,50.4,33.81,49.58,34.77Z"
            />
            <circle cx="49.23" cy="17.32" r="3.75" />
            <path d="M17.87,54.89a28.73,28.73,0,0,0,3.9.89" />
            <path
              d="M24.68,56.07c2.79.12,5.85-.28,7.9-2.08,5.8-5.09,2.89-11.25,6.75-14.71a16.72,16.72,0,0,1,4.93-3"
              stroke-dasharray="7.8 2.92"
            />
            <path d="M45.63,35.8a23,23,0,0,1,3.88-.95" />
          </svg>
        </el-button>
        <el-button @click="() => mapUtil.addInteraction(map, 'Polygon')">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 17V7M5 17C3.89543 17 3 17.8954 3 19C3 20.1046 3.89543 21 5 21C6.10457 21 7 20.1046 7 19M5 17C6.10457 17 7 17.8954 7 19M5 7C6.10457 7 7 6.10457 7 5M5 7C3.89543 7 3 6.10457 3 5C3 3.89543 3.89543 3 5 3C6.10457 3 7 3.89543 7 5M7 5H17M17 5C17 6.10457 17.8954 7 19 7C20.1046 7 21 6.10457 21 5C21 3.89543 20.1046 3 19 3C17.8954 3 17 3.89543 17 5ZM7 19H17M17 19C17 20.1046 17.8954 21 19 21C20.1046 21 21 20.1046 21 19C21 17.8954 20.1046 17 19 17C17.8954 17 17 17.8954 17 19ZM17.9247 6.6737L15.1955 10.3776M15.1955 13.6223L17.9222 17.3223M16 12C16 13.1046 15.1046 14 14 14C12.8954 14 12 13.1046 12 12C12 10.8954 12.8954 10 14 10C15.1046 10 16 10.8954 16 12Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </el-button>
      </el-popover>
    </div>
    <div class="item" data-name="view-prev">
      <el-button style="margin-right: 16px">
        <el-icon><ArrowLeft /></el-icon>
      </el-button>
    </div>
    <div class="item" data-name="view-next">
      <el-button style="margin-right: 16px">
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </div>
    <div class="item" data-name="view-clean">
      <el-button @click="mapUtil.clear(map)" style="margin-right: 16px">
        <el-icon><Refresh /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup>
  import mapUtil from '@/js/map/map.js'
  import { Map } from 'ol'
  import { onUpdated, onMounted } from 'vue'
  import { moveType, useMapInfoStore } from '@/stores/mapInfo'
  const mapStore = useMapInfoStore()
  const props = defineProps({
    map: {
      type: Map,
    },
  })
  const minZoom = 5
  const zoom = (type) => {
    let currentZoom = props.map.getView().getZoom()
    if (type === 'min') {
      currentZoom = minZoom
      props.map.getView().setZoom(currentZoom)
    }
    if (type === 'in') {
      currentZoom++
      props.map.getView().setZoom(currentZoom)
    }
    if (type === 'out') {
      currentZoom--
      props.map.getView().setZoom(currentZoom)
    }
    mapUtil.setZoom(currentZoom)
  }

  const prevPos = () => {
    if (mapStore.currentIndex > 0) {
      mapStore.type = moveType.PREV
      mapStore.currentIndex = mapStore.currentIndex - 1
      const { zoomLevel, position } = mapStore.getCurrentMapInfo()
      props.map.getView().setZoom(zoomLevel)
      props.map.getView().setCenter(position)
    }
  }
  const nextPos = () => {
    if (mapStore.currentIndex < mapStore.mapInfoArr.length - 1) {
      mapStore.type = moveType.NEXT
      mapStore.currentIndex++
      const { zoomLevel, position } = mapStore.getCurrentMapInfo()
      props.map.getView().setZoom(zoomLevel)
      props.map.getView().setCenter(position)
    }
  }
  //거리 그리기

  onUpdated(() => {
    if (props.map) {
      document
        .querySelector('.map-util > [data-name=zoom]')
        .addEventListener('click', () => zoom('min'))
      document
        .querySelector('.map-util > [data-name=zoom-in]')
        .addEventListener('click', () => zoom('in'))
      document
        .querySelector('.map-util > [data-name=zoom-out]')
        .addEventListener('click', () => zoom('out'))
      document.querySelector('.map-util > [data-name=view-prev]').addEventListener('click', () => {
        prevPos()
      })
      document.querySelector('.map-util > [data-name=view-next]').addEventListener('click', () => {
        nextPos()
      })
    }
  })

  onMounted(() => {})
</script>

<style scoped lang="scss">
  .map-util {
    position: absolute;
    top: 220px;
    right: 25px;

    padding: 10px;

    display: flex;
    flex-direction: column;
    gap: 5px;

    border: 1px solid gainsboro;
    border-radius: 10px;

    box-shadow: 3px 3px 10px grey;
    box-sizing: border-box;

    width: 50px;
    height: 278px;

    overflow: hidden;

    transition: width 0.3s, height 0.3s;
    z-index: 30;

    .item {
      display: flex;
      flex-direction: column;
    }
  }
</style>
