import { GeoJSON, WFS } from 'ol/format'
import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS.js'

/**
 *
 * @param {Layer} layer
 * @returns
 */
const featureRequest = (layer) =>
  new WFS().writeGetFeature({
    srsName: 'EPSG:3857',
    featureNS: 'http://www.opengis.net/wfs',
    featurePrefix: 'feature',
    featureTypes: [layer],
    outputFormat: 'application/json',
    gmlOptions: { multiSurface: !0 },
  })

const testApi = {
  /**
   *
   * @param {Layer} layer
   * @param {Key} KEY
   * @returns {Promise<features>}
   */
  getWFS: async (layer, KEY) => {
    const res = await fetch(`http://211.171.200.56:9990/mapstudio/wfs?KEY=${KEY}`, {
      method: 'POST',
      body: new XMLSerializer().serializeToString(featureRequest(layer)),
    })
    const json = await res.json()
    const features = new GeoJSON().readFeatures(json)
    return features
  },
  /**
   *
   * @param {{LAYERS,KEY}} option
   * @returns {TileLayer}
   */
  getWMS: (option) => {
    const tileLayer = new TileLayer({
      properties: { name: 'wms' },
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
    return tileLayer
  },
  getKeyLayers: () => {
    return new Promise((resolve) => {
      resolve({
        data: [
          {
            mapA: {
              KEY: 'D4A8C9B0-E42E-555B-F06F-840E6D558B8D',
              LAYERS: ['TEST_DEVELOP_AREA'],
            },
          },
          {
            mapB: {
              KEY: '5B1AC435-395B-E831-19E6-A7CE51787C45',
              LAYERS: ['TEST_SCCO_EMD', 'PGMS_PARK_PO'],
            },
          },
          {
            mapC: {
              KEY: 'D96BA1C4-390D-BBA6-668C-9E1B52C4CEDB',
              LAYERS: ['LP_PA_CBND'],
            },
          },
          {
            mapD: {
              KEY: '0B5C3A5A-8285-B6DC-ADAE-21E3FBFB1965',
              LAYERS: ['GMP_P1_S1_DSTPLAN_2303'],
            },
          },
        ],
      })
    })
  },
  getChartTestData: () => {
    return new Promise((resolve) => {
      resolve({
        total: 13,
        list: [
          {
            mntmp: 12.1,
            mnmntmp: 6.4,
            byyear: '2009',
            mnwns: 1,
            lwrlhd: 64,
            sunshn: 1881.7,
            mxdsn: 64.4,
            grwns: 0,
            mnrlhd: 74.2,
            ltmp: 0.7,
            prcpt: 1072.1,
            id: 1,
            fswns: 13.7,
            mnsea: 0,
            mnamtcld: 0,
            htmp: 25.4,
            dptmp: 0,
            mnmxtmp: 18.8,
          },
          {
            mntmp: 12,
            mnmntmp: 6.8,
            byyear: '2010',
            mnwns: 2.8,
            lwrlhd: 62,
            sunshn: 1795.3,
            mxdsn: 29.3,
            grwns: 0,
            mnrlhd: 75.7,
            ltmp: -0.55,
            prcpt: 1514.4,
            id: 2,
            fswns: 11.5,
            mnsea: 0,
            mnamtcld: 0,
            htmp: 25.1,
            dptmp: 0,
            mnmxtmp: 18,
          },
          {
            mntmp: 11.4,
            mnmntmp: 6.65,
            byyear: '2011',
            mnwns: 2.9,
            lwrlhd: 55,
            sunshn: 1886.4,
            mxdsn: 10.7,
            grwns: 0,
            mnrlhd: 78.6,
            ltmp: 0.5,
            prcpt: 1629,
            id: 3,
            fswns: 11.2,
            mnsea: 0,
            mnamtcld: 0,
            htmp: 22.5,
            dptmp: 0,
            mnmxtmp: 17,
          },
          {
            mntmp: 11.5,
            mnmntmp: 6.9,
            byyear: '2012',
            mnwns: 2.5,
            lwrlhd: 12,
            sunshn: 2299.2,
            mxdsn: 5.9,
            grwns: 26.3,
            mnrlhd: 75.7,
            ltmp: -15.1,
            prcpt: 1642.6,
            id: 4,
            fswns: 16.2,
            mnsea: 1016.6,
            mnamtcld: 5.3,
            htmp: 36,
            dptmp: 6.8,
            mnmxtmp: 16.6,
          },
          {
            mntmp: 11.8,
            mnmntmp: 7,
            byyear: '2013',
            mnwns: 2.1,
            lwrlhd: 15,
            sunshn: 2382.7,
            mxdsn: 7.8,
            grwns: 15.6,
            mnrlhd: 80.8,
            ltmp: -16.6,
            prcpt: 1018.7,
            id: 5,
            fswns: 10,
            mnsea: 1016.7,
            mnamtcld: 5,
            htmp: 33.4,
            dptmp: 8.1,
            mnmxtmp: 17,
          },
          {
            mntmp: 12.3,
            mnmntmp: 7.5,
            byyear: '2014',
            mnwns: 1.9,
            lwrlhd: 12,
            sunshn: 2334,
            mxdsn: 23.3,
            grwns: 17,
            mnrlhd: 78.2,
            ltmp: -11.1,
            prcpt: 1000.1,
            id: 6,
            fswns: 10.4,
            mnsea: 1017.2,
            mnamtcld: 5,
            htmp: 33.7,
            dptmp: 8.1,
            mnmxtmp: 17.8,
          },
          {
            mntmp: 12.7,
            mnmntmp: 7.9,
            byyear: '2015',
            mnwns: 2,
            lwrlhd: 9,
            sunshn: 2384.4,
            mxdsn: 21,
            grwns: 21.7,
            mnrlhd: 78,
            ltmp: -10.5,
            prcpt: 815.9,
            id: 7,
            fswns: 12.3,
            mnsea: 1017.1,
            mnamtcld: 5.1,
            htmp: 33.7,
            dptmp: 8.4,
            mnmxtmp: 18.1,
          },
          {
            mntmp: 12.9,
            mnmntmp: 8.225,
            byyear: '2016',
            mnwns: 2,
            lwrlhd: 12,
            sunshn: 2382.9,
            mxdsn: 40,
            grwns: 19.5,
            mnrlhd: 69.6,
            ltmp: -12.7,
            prcpt: 979.6,
            id: 8,
            fswns: 12.7,
            mnsea: 1016.5,
            mnamtcld: 5.1,
            htmp: 34.6,
            dptmp: 9.4,
            mnmxtmp: 18.2,
          },
          {
            mntmp: 12.6,
            mnmntmp: 7.3,
            byyear: '2017',
            mnwns: 1.6,
            lwrlhd: 1,
            sunshn: 2531.2,
            mxdsn: 36.9,
            grwns: 16.2,
            mnrlhd: 75.3,
            ltmp: -14.2,
            prcpt: 1009.5,
            id: 9,
            fswns: 9.5,
            mnsea: 1016.3,
            mnamtcld: 4.7,
            htmp: 35.2,
            dptmp: 7.5,
            mnmxtmp: 18.1,
          },
          {
            mntmp: 12.4,
            mnmntmp: 7.275,
            byyear: '2018',
            mnwns: 1.5,
            lwrlhd: 1,
            sunshn: 2556.2,
            mxdsn: 18.8,
            grwns: 16.9,
            mnrlhd: 78.3,
            ltmp: -16.6,
            prcpt: 1299,
            id: 10,
            fswns: 8.4,
            mnsea: 1016.9,
            mnamtcld: 5.1,
            htmp: 37,
            dptmp: 8,
            mnmxtmp: 17.75,
          },
          {
            mntmp: 12.7,
            mnmntmp: 7.525,
            byyear: '2019',
            mnwns: 1.4,
            lwrlhd: 12,
            sunshn: 2436.5,
            mxdsn: 9.8,
            grwns: 21,
            mnrlhd: 74,
            ltmp: -10.9,
            prcpt: 922.3,
            id: 11,
            fswns: 11.3,
            mnsea: 1016.4,
            mnamtcld: 5.3,
            htmp: 34.7,
            dptmp: 7.1,
            mnmxtmp: 18.3,
          },
          {
            mntmp: 12.8,
            mnmntmp: 8,
            byyear: '2020',
            mnwns: 1.6,
            lwrlhd: 13,
            sunshn: 1964.083333,
            mxdsn: 6.2,
            grwns: 21.3,
            mnrlhd: 73.8,
            ltmp: -12.6,
            prcpt: 1639.7,
            id: 12,
            fswns: 12.1,
            mnsea: 1017.1,
            mnamtcld: 5.6,
            htmp: 34.7,
            dptmp: 7.6,
            mnmxtmp: 18,
          },
          {
            mntmp: 13.2,
            mnmntmp: 9.2,
            byyear: '2021',
            mnwns: 2.0,
            lwrlhd: 8.0,
            sunshn: 2478.1,
            mxdsn: 0.0,
            grwns: 22.8,
            mnrlhd: 64.0,
            ltmp: -16.1,
            prcpt: 1199.7,
            id: 13,
            fswns: 10.0,
            mnsea: 1015.5,
            mnamtcld: 4.9,
            htmp: 33.8,
            dptmp: 5.7,
            mnmxtmp: 17.4,
          },
        ],
      })
    })
  },
  getCheckedList: () => {
    return new Promise((resolve) => {
      resolve({
        mapA: true,
        mapB: false,
        mapC: false,
      })
    })
  },
}

export { testApi }
