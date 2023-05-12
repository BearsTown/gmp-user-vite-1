import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import Draw from 'ol/interaction/Draw'
import { Map, Overlay } from 'ol'
import { testApi } from '@/api/work/testService'

import { styleFunction } from './mapStyle'

let draw
const mapUtil = {
  /**
   *
   * @param {Map} map
   * @param {HTMLElementId} id
   * @param {Overlay} popup
   */
  clickOverlay: (map, id, popup) => {
    map.on('singleclick', (e) => {
      const coordinate = e.coordinate
      mapUtil.flyTo(map.getView(), coordinate)
      document.getElementById('popup-content').innerHTML = `<ul class="pop-up">
                                      <li>1</li>
                                      <li>2</li>
                                  </ul>`
      popup.setPosition(coordinate)
      document.getElementById(`${id}-closer`).onclick = function () {
        popup.setPosition(undefined)
        document.getElementById(`${id}-closer`).blur()
        return false
      }
      // if (map.hasFeatureAtPixel(e.pixel)) {
      //   document.getElementById(id).innerHTML = ''
      //   map.forEachFeatureAtPixel(e.pixel, (feature) => {
      //     if (feature.getId()) {
      //       const geom = feature.getGeometry()
      //       if (geom) {
      //         if (feature.get('KIND') === undefined) {
      //           document.getElementById(id).innerHTML += `<ul class="pop-up">
      //                                 <li>${feature.get('CDNM_ENG')}</li>
      //                                 <li>${feature.get('META_DATE')}</li>
      //                             </ul>`
      //         } else {
      //           const KIND =
      //             feature.get('KIND') === undefined
      //               ? ''
      //               : feature.get('KIND').indexOf('PA') >= 0
      //               ? '공원'
      //               : feature.get('KIND').indexOf('PB') >= 0
      //               ? '녹지'
      //               : '기타'
      //           document.getElementById(id).innerHTML += `<ul class="pop-up">
      //                                 <li>${KIND}</li>
      //                                 <li>${feature.get('NAME')}</li>
      //                                 <li>${feature.get('PARK_ID')}</li>
      //                             </ul>`
      //         }
      //       }
      //     }
      //   })
      // }
    })
  },
  addInteraction: (map, type) => {
    if (draw) {
      map.removeInteraction(draw)
    }
    const drawType = type
    const activeTip =
      'Click to continue drawing the ' + (drawType === 'Polygon' ? 'polygon' : 'line')
    const idleTip = 'Click to start measuring'
    const source = new VectorSource()
    let tip = idleTip
    let drawLayer = map.getAllLayers().filter((layer) => layer.get('name') === 'draw')[0]
    // 드로우 벡터 레이어가 없을 경우
    if (!drawLayer) {
      drawLayer = new VectorLayer({
        properties: { name: 'draw' },
        source: source,
        zIndex: 999,
        style: function (feature) {
          return styleFunction(feature)
        },
      })
      map.addLayer(drawLayer)
    }

    draw = new Draw({
      source: drawLayer.getSource(),
      type: drawType,
      style: function (feature) {
        return styleFunction(feature, drawType, tip)
      },
    })
    draw.on('drawstart', function () {
      tip = activeTip
    })
    draw.on('drawend', function () {
      tip = idleTip
    })
    map.addInteraction(draw)
  },
  removeInteraction: (map) => {
    map.removeInteraction(draw)
  },

  clear: (map) => {
    let drawLayer = map.getAllLayers().filter((layer) => layer.get('name') === 'draw')[0]
    if (drawLayer) {
      drawLayer.getSource().clear()
    }
  },

  getWMSTiles: (keyLayers, checkedList, tiles) => {
    return new Promise((resolve) => {
      Object.keys(keyLayers.value).forEach((item) => {
        let temp = []
        if (checkedList.value[item] === false) {
          return
        }

        if (tiles[item] !== undefined) return
        temp.push(
          testApi.getWMS({
            KEY: keyLayers.value[item].KEY,
            LAYERS: keyLayers.value[item].LAYERS,
          }),
        )
        tiles[item] = temp
      })
    })
  },
  setZoom: (level) => {
    const meta = document.querySelector('.map-board > [data-name=meta]')

    if (meta) {
      const tag = meta.querySelector('input[name=zoom]')
      tag.value = level.toFixed(2)
    }
  },

  setPosition: (pos) => {
    const position = document.querySelector('.map-board > [data-name=position]')

    // 위치 보드 태그가 유효할 경우
    if (position) {
      const tag1 = position.querySelector('input[name=x]')
      const tag2 = position.querySelector('input[name=y]')

      const [x, y] = pos

      tag1.value = x.toString()
      tag2.value = y.toString()
    }
  },

  /**
   *
   * @param {Map.getView()} view
   * @param {coordinate} location
   */
  flyTo: (view, location) => {
    const duration = 500
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
        zoom: zoom,
      },
      {
        duration: duration / 2,
        zoom,
      },

      callback,
    )
  },
}
export default mapUtil
