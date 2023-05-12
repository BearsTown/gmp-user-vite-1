// import { mapCenter } from '@/js/map/properties'
import { mapCenter } from '@/js/map/properties'

import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

/**
 * default mapInfoArr = {zoomLevel:13, position:[14097374.344924383, 4529385.194457353]}
 * currentIndex = mapInfoArr 의 현재 mapInfo
 */
export const moveType = {
  PREV: 'prev',
  NEXT: 'next',
  CURRENT: 'current',
}
export const useMapInfoStore = defineStore('mapInfo', () => {
  const mapInfoArr = ref([{ zoomLevel: 13, position: mapCenter }])

  const currentIndex = ref(0)
  //default값은 current
  const type = ref(moveType.CURRENT)

  const addMapInfo = ({ zoomLevel, position }) => {
    //이전페이지로 간 후에 이동 및 줌 레벨 변경 case
    if (mapInfoArr.value.length > currentIndex.value) {
      //이후 페이지 제거
      mapInfoArr.value = mapInfoArr.value.slice(0, currentIndex.value + 1)
    }
    mapInfoArr.value.push({ zoomLevel, position })
    currentIndex.value = mapInfoArr.value.length - 1
  }

  const getCurrentMapInfo = () => {
    return mapInfoArr.value[currentIndex.value]
  }

  return {
    addMapInfo,
    mapInfoArr,
    currentIndex,
    getCurrentMapInfo,
    type,
  }
})
