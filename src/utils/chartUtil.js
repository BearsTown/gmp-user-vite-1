import { defaults, map, merge } from 'lodash/fp'
import { v4 as uuidV4 } from 'uuid'

const chartUtil = {
  /**
   *
   * @param {*} _options
   * @param opt_options.isHorizontal {Boolean} 축 변경 여부 true - 가로, false - 세로,
   * @param opt_options.titleName {String} 타이틀명
   * @param opt_options.unitName {String} 단위명
   * @returns
   */
  initBar: function (_options) {
    var options = _options || {}

    const data = [
      { label: '없음', value: 5, color: '#F5A9F2' },
      { label: '1층입니다.!!!!!!!!!!!!', value: 20, color: '#61380B' },
      { label: '3층입니다.', value: 25, color: '#61380B' },
      { label: '4층입니다.', value: 30, color: '#61380B' },
      { label: '5층입니다.', value: 40, color: '#fdf6ec' },
      { label: '6층입니다.', value: 42, color: '#faecd8' },
      { label: '7층', value: 33, color: '#f8e3c5' },
      { label: '8층', value: 21, color: '#f3d19e' },
      { label: '9층', value: 15, color: '#eebe77' },
    ]

    //init
    var chartOption = {}
    chartOption.id = uuidV4().split('-').join('')
    chartOption.titleName = options.titleName
    chartOption.unitName = options.unitName
    chartOption.isViewTab = options.isViewTab

    //차트 라벨
    var labelShow = false

    var title = {
      text: '목적별 현황',
      left: 'center',
      // top: 'center',
      textStyle: {
        fontSize: 15,
        color: 'rgba(33, 142, 150, 1)',
      },
    }

    var grid = {
      top: '10%',
      // containLabel: true,
      // width: '250px',
      // height: '60%',
      // left: '20%',bottom : '20%'
    }

    var xAxis = {
      type: 'category',
      // axisPointer: {
      //   type: 'shadow',
      //   show: true
      // },
      data: map((config) => {
        return {
          value: config.label || config.start,
          textStyle: {},
        }
      })(data),
      axisLabel: {
        interval: 0,
        rotate: options.isHorizontal ? 0 : -45, //기울기
        show: true, //보여줌
        fontSize: options.isHorizontal ? 11 : 10, //라벨크기
        overflow: 'truncate',
        ellipsis: '...',
        color: 'black',
      },
    }

    var yAxis = {
      type: 'value',
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      //줄나뉨
      splitLine: {
        show: false,
      },
    }

    var series_x = {
      type: 'bar',
      stack: 'total',
      data: map((config) => {
        return {
          itemStyle: {
            color: config.color,
            opacity: 1,
          },
          value: config.value,
        }
      })(data),
      label: {
        show: labelShow,
        position: options.isHorizontal ? 'right' : 'top',
        formatter: ({ value, dataIndex }) => {
          if (this._isFilteredLabelIndex(dataIndex, 'formatter')) {
            return '-'
          }
          return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
      },
    }

    const series_y = {
      type: 'bar',
      stack: 'total',
      data: [],
    }

    var series = [this.isHorizontal ? series_y : series_x, this.isHorizontal ? series_x : series_y]

    var textStyle = {
      fontFamily: 'sans-serif',
    }

    // chartOption.title = this.title;
    chartOption.grid = grid
    chartOption.tooltip = {}
    chartOption.xAxis = xAxis
    chartOption.yAxis = yAxis
    chartOption.series = series
    chartOption.textStyle = textStyle
    chartOption.animationDurationUpdate = 250

    // 사용 축 설정에 따라 축 변경.
    chartOption = merge(chartOption, {
      xAxis: options.isHorizontal ? yAxis : xAxis,
      yAxis: options.isHorizontal ? xAxis : yAxis,
    })

    chartOption.grid = merge(chartOption.grid, {
      top: options.isHorizontal ? '20%' : '20%',
      left: options.isHorizontal ? '20%' : '10%',
      bottom: options.isHorizontal ? '5%' : '25%',
      right: options.isHorizontal ? '15%' : '15%',
    })

    return chartOption
  },

  /**
   *
   * @param {*} _options
   * @param {*} _options.isViewTab {Boolean} true - TOP차트 , false - 우측 TAB차트
   * @returns
   */
  initPie: function (_options) {
    var options = _options || {}

    var data = [
      { label: '없음', value: 5, color: '#F5A9F2' },
      { label: '1층입니다.!!!!!!!!!!!!', value: 20, color: '#61380B' },
      { label: '3층입니다.', value: 25, color: '#61380B' },
      { label: '4층입니다.', value: 30, color: '#61380B' },
      { label: '5층입니다.', value: 40, color: '#fdf6ec' },
      { label: '6층입니다.', value: 42, color: '#faecd8' },
      { label: '7층', value: 33, color: '#f8e3c5' },
      { label: '8층', value: 21, color: '#f3d19e' },
      { label: '9층', value: 15, color: '#eebe77' },
    ]

    //init
    var chartOption = {}
    chartOption.isViewTab = options.isViewTab

    var tooltip = {
      trigger: 'item',
    }

    var grid = {
      // top: '10%',
      // right:'30%'
      // containLabel: true,
      // width: '250px',
      // height: '100px',
      // left: '20%',bottom : '20%'
    }

    var legend = {
      top: '20%',
      left: '50%',
      orient: 'vertical',
      itemGap: 2,
      textStyle: {
        fontSize: 11,
      },
      type: 'scroll',
    }

    var series = {
      type: 'pie',
      radius: ['40%', '70%'],
      right: '45%',
      top: '10%',
      // bottom:'0%',
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        formatter: ({ value, dataIndex }) => {
          let ret = data.map((item) => item.value).reduce((prev, curr) => prev + curr, 0)
          return ret
        },
      },
      emphasis: {
        label: {
          show: false,
          fontSize: 11,
          fontWeight: 'bold',
          formatter: ({ value, dataIndex }) => {
            return value
          },
        },
      },
      labelLine: {
        show: false,
      },
      data: map((config) => {
        return {
          itemStyle: {
            color: config.color,
            opacity: 1,
          },
          value: config.value,
          name: config.label,
        }
      })(data),
    }

    var textStyle = {
      fontFamily: 'sans-serif',
    }

    chartOption.grid = grid
    chartOption.tooltip = tooltip
    chartOption.legend = legend
    chartOption.series = series
    chartOption.textStyle = textStyle
    chartOption.animationDurationUpdate = 250

    return chartOption
  },

  /**
   *
   * @param {*} _options
   * @param opt_options.isHorizontal {Boolean} 축 변경 여부 true - 가로, false - 세로,
   * @param opt_options.titleName {String} 타이틀명
   * @param opt_options.isViewTab {Boolean} true - TOP차트 , false - 우측 TAB차트
   * @returns
   */
  initLine: function (_options) {
    var options = _options || {}

    const data = [
      { label: '없음', value: 5, color: '#F5A9F2' },
      { label: '1층입니다.!!!!!!!!!!!!', value: 20, color: '#61380B' },
      { label: '3층입니다.', value: 25, color: '#61380B' },
      { label: '4층입니다.', value: 30, color: '#61380B' },
      { label: '5층입니다.', value: 40, color: '#fdf6ec' },
      { label: '6층입니다.', value: 42, color: '#faecd8' },
      { label: '7층', value: 33, color: '#f8e3c5' },
      { label: '8층', value: 21, color: '#f3d19e' },
      { label: '9층', value: 15, color: '#eebe77' },
    ]

    //init
    var chartOption = {}
    chartOption.id = uuidV4().split('-').join('')
    chartOption.titleName = options.titleName

    //차트 라벨
    var labelShow = false

    var title = {
      text: '목적별 현황',
      left: 'center',
      // top: 'center',
      textStyle: {
        fontSize: 15,
        color: 'rgba(33, 142, 150, 1)',
      },
    }

    var grid = {
      top: '10%',
      // containLabel: true,
      // width: '250px',
      // height: '60%',
      // left: '20%',bottom : '20%'
    }

    var xAxis = {
      type: 'category',
      data: map((config) => {
        return {
          value: config.label || config.start,
          textStyle: {},
        }
      })(data),
      axisLabel: {
        interval: 0,
        rotate: options.isHorizontal ? 0 : -45, //기울기
        show: true, //보여줌
        fontSize: options.isHorizontal ? 11 : 10, //라벨크기
        overflow: 'truncate',
        ellipsis: '...',
        color: 'black',
      },
    }

    var yAxis = {
      type: 'value',
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      //줄나뉨
      splitLine: {
        show: false,
      },
    }

    var series_x = {
      type: 'line',
      stack: 'total',
      data: map((config) => {
        return {
          // itemStyle: {
          //   color: config.color,
          //   opacity: 1
          // },
          value: config.value,
        }
      })(data),
      label: {
        show: labelShow,
        position: options.isHorizontal ? 'right' : 'top',
        formatter: ({ value, dataIndex }) => {
          if (this._isFilteredLabelIndex(dataIndex, 'formatter')) {
            return '-'
          }
          return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
      },
      lineStyle: {
        normal: {
          color: '#409eff',
        },
      },
    }

    const series_y = {
      type: 'line',
      stack: 'total',
      data: [],
      lineStyle: {
        normal: {
          color: '#409eff',
        },
      },
    }

    var series = [this.isHorizontal ? series_y : series_x, this.isHorizontal ? series_x : series_y]

    var textStyle = {
      fontFamily: 'sans-serif',
    }

    // chartOption.title = this.title;
    chartOption.grid = grid
    chartOption.tooltip = {}
    chartOption.xAxis = xAxis
    chartOption.yAxis = yAxis
    chartOption.series = series
    chartOption.textStyle = textStyle
    chartOption.animationDurationUpdate = 250

    // 사용 축 설정에 따라 축 변경.
    chartOption = merge(chartOption, {
      xAxis: options.isHorizontal ? yAxis : xAxis,
      yAxis: options.isHorizontal ? xAxis : yAxis,
    })

    chartOption.grid = merge(chartOption.grid, {
      top: options.isHorizontal ? '20%' : '20%',
      left: options.isHorizontal ? '20%' : '10%',
      bottom: options.isHorizontal ? '5%' : '25%',
      right: options.isHorizontal ? '15%' : '15%',
    })

    return chartOption
  },

  initInfo: function () {
    return {
      id: '',
      title: {
        name: '',
        desc: '',
      },
      subTitle: {
        name: '',
        isIcon: false,
        iconType: 'up',
      },
      bottomTitle: {
        name: '',
        isIcon: false,
        iconType: 'up',
      },
    }
  },
}
export default chartUtil
