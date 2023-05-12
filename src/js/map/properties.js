import { defaults as control, OverviewMap } from 'ol/control.js'
import { OSM, XYZ } from 'ol/source'
import { osmLayer } from '@/js/layers'
// import { osmLayer } from './src/js/layers'
import VectorLayer from 'ol/layer/Vector'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'
import Style from 'ol/style/Style'
import View from 'ol/View'
import { gmpVectorSource } from './mapSource'
import { MouseWheelZoom, defaults as defaultInteraction } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
const overViewSource = new OSM()
const overViewMapCtrl = new OverviewMap({
  layers: [
    new TileLayer({
      source: overViewSource,
      zIndex: 999,
    }),
  ],
  collapsed: true,
})

//overViewMap
const vector = new VectorLayer({
  source: gmpVectorSource,
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
export const mapCenter = [14389851, 4279652.465548385]
const defaultMapOption = {
  target: 'base-map',
  controls: control({
    attribution: false,
    zoom: false,
    rotate: false,
  }).extend([overViewMapCtrl]),
  layers: [vector, osmLayer],
  interactions: defaultInteraction().extend([new MouseWheelZoom({ constrainResolution: true })]),
  view: new View({
    projection: 'EPSG:3857',
    center: mapCenter,
    zoom: 13,
    maxZoom: 19,
  }),
}

export { defaultMapOption }
