import { Map } from 'ol'

class MapControl {
  init(option) {
    this.map = new Map({
      target: option.target,
      controls: option.controls,
      layers: option.layers,
      interactions: option.interactions,
      view: option.view,
    })
  }
  addLayer(layer) {
    this.map.addLayer(layer)
  }
  removeLayer(layer) {
    this.map.removeLayer(layer)
  }
  addOverLay(overlay) {
    this.map.addOverlay(overlay)
  }
}

export const mapControl = new MapControl()
