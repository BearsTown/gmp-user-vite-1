import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style.js'
import { Draw, Modify } from 'ol/interaction.js'
import { LineString, Point } from 'ol/geom.js'
import { OSM, Vector as VectorSource } from 'ol/source.js'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { getArea, getLength } from 'ol/sphere.js'

const showSegments = true

const style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.2)',
  }),
  stroke: new Stroke({
    color: 'rgba(0, 0, 0, 0.5)',
    lineDash: [10, 10],
    width: 2,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
  }),
})

const labelStyle = new Style({
  text: new Text({
    font: '14px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    padding: [3, 3, 3, 3],
    textBaseline: 'bottom',
    offsetY: -15,
  }),
  image: new RegularShape({
    radius: 8,
    points: 3,
    angle: Math.PI,
    displacement: [0, 10],
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
  }),
})

const tipStyle = new Style({
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
    padding: [2, 2, 2, 2],
    textAlign: 'left',
    offsetX: 15,
  }),
})

const segmentStyle = new Style({
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
    padding: [2, 2, 2, 2],
    textBaseline: 'bottom',
    offsetY: -12,
  }),
  image: new RegularShape({
    radius: 6,
    points: 3,
    angle: Math.PI,
    displacement: [0, 8],
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
  }),
})

const formatLength = function (line) {
  const length = getLength(line)
  let output
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + ' km'
  } else {
    output = Math.round(length * 100) / 100 + ' m'
  }
  return output
}

const formatArea = function (polygon) {
  const area = getArea(polygon)
  let output
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2'
  } else {
    output = Math.round(area * 100) / 100 + ' m\xB2'
  }
  return output
}

const raster = new TileLayer({
  source: new OSM(),
})

const source = new VectorSource()

let tipPoint

function styleFunction(feature, drawType, tip) {
  const styles = [style]
  const geometry = feature.getGeometry()
  const segmentStyles = [segmentStyle]
  const type = geometry.getType()
  let point, label, line
  if (!drawType || drawType === type) {
    if (type === 'Polygon') {
      point = geometry.getInteriorPoint()
      label = 'poly' + formatArea(geometry)
      line = new LineString(geometry.getCoordinates()[0])
    } else if (type === 'LineString') {
      point = new Point(geometry.getLastCoordinate())
      label = 'line' + formatLength(geometry)
      line = geometry
    }
  }
  if (line) {
    let count = 0
    line.forEachSegment(function (a, b) {
      const segment = new LineString([a, b])
      const label = formatLength(segment)
      if (segmentStyles.length - 1 < count) {
        segmentStyles.push(segmentStyle.clone())
      }
      const segmentPoint = new Point(segment.getCoordinateAt(0.5))
      segmentStyles[count].setGeometry(segmentPoint)
      segmentStyles[count].getText().setText(label)
      styles.push(segmentStyles[count])
      count++
    })
  }
  if (label) {
    labelStyle.setGeometry(point)

    labelStyle.getText().setText(`${label}`)
    styles.push(labelStyle)
  }
  return styles
}

const vector = new VectorLayer({
  source: source,
  style: function (feature) {
    return styleFunction(feature, showSegments)
  },
})

let draw // global so we can remove it later

function addInteraction(map, type) {
  const drawType = type
  const activeTip = 'Click to continue drawing the ' + (drawType === 'Polygon' ? 'polygon' : 'line')
  const idleTip = 'Click to start measuring'
  let tip = idleTip
  let drawLayer = map.getAllLayers().filter((layer) => layer.get('name') === 'draw')[0]
  // 드로우 벡터 레이어가 없을 경우
  if (!drawLayer) {
    drawLayer = new VectorLayer({
      properties: { name: 'draw' },
      source: source,
      zIndex: 999,
      style: function (feature) {
        return styleFunction(feature, showSegments)
      },
    })
    map.addLayer(drawLayer)
  }

  draw = new Draw({
    source: drawLayer.getSource(),
    type: drawType,
    style: function (feature) {
      return styleFunction(feature, showSegments, drawType, tip)
    },
  })
  draw.on('drawstart', function () {
    tip = activeTip
  })
  draw.on('drawend', function () {
    tip = idleTip
    map.on('singleclick', (e) => {
      if (map.hasFeatureAtPixel(e.pixel)) {
        map.forEachFeatureAtPixel(e.pixel, (feature) => {
          // 해당 객체의 아이디가 buld_test으로 시작할 경우
          console.log(feature)
          if (feature.getId()?.toString().startsWith('buld_test')) {
            const geom = feature.getGeometry()

            // 공간정보가 유효할 경우
            if (geom) {
              const [minX, minY, maxX, maxY] = geom.getExtent()
            }
          }
        })
      }
    })
  })
  map.addInteraction(draw)
}

export { styleFunction, addInteraction, labelStyle }
