<template>
  <!-- 상단 기본정보 부분-->
  <div
    v-if="viewType == 'BASIC' && position == 'TOP'"
    @click="handleClick"
    :class="activeId == info.id ? 'basic-c border-box-round active' : 'basic-c border-box-round'"
  >
    <div class="item-c title-c" style="font-size: 17px">
      <el-icon v-if="activeId == info.id" style="color: rgb(245, 108, 108); font-size: 25px">
        <LocationFilled />
      </el-icon>
      {{ info.title.name }}
      <el-tooltip :content="info.title.desc" placement="right-start" effect="light">
        <el-icon>
          <InfoFilled />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="item-c" style="font-size: 32px; color: black; padding: 10px">
      {{ info.subTitle.name }}
      <img
        v-if="info.subTitle.isIcon && info.subTitle.isIconType == true"
        class="arrow-middle"
        src="@/assets/image/arrow-up.png"
      />
      <img
        v-if="info.subTitle.isIcon && info.subTitle.isIconType == false"
        class="arrow-middle"
        src="@/assets/image/arrow-down.png"
      />
    </div>
    <div class="item-c" style="font-size: 16px">
      {{ info.bottomTitle.name }}
      <img
        v-if="info.bottomTitle.isIcon && info.bottomTitle.isIconType == true"
        class="arrow-bottom"
        src="@/assets/image/arrow-up.png"
      />
      <img
        v-if="info.bottomTitle.isIcon && info.bottomTitle.isIconType == false"
        class="arrow-bottom"
        src="@/assets/image/arrow-down.png"
      />
    </div>
  </div>

  <!--지표추가 부분-->
  <div
    v-if="viewType == 'ADD' && position == 'TOP'"
    @click="handleClick"
    class="basic-c border-box-round"
  >
    <div class="item-c title-c" style="font-size: 17px">
      <el-icon size="20">
        <Plus />
      </el-icon>
    </div>
    <div class="item-c title-c" style="font-size: 10px">지표추가</div>
  </div>

  <!-- 상단 차트 부분-->
  <div v-if="viewType == 'CHART' && position == 'TOP'" class="top-c border-box-round">
    <div
      v-if="option.titleName != null"
      class="title-c"
      style="text-align: center; padding-bottom: 10px"
    >
      <img class="img-c" src="@/assets/image/bar-chart.png" />
      <span>{{ option.titleName }}</span>
      <span class="title-c-unit" v-if="option.unitName != null">({{ option.unitName }})</span>
    </div>
    <v-chart
      ref="barRef"
      :class="option.titleName != null ? 'chart' : 'no-title-chart'"
      :init-options="initOptions"
      :option="option"
      @click="handleClick"
      autoresize
    />
  </div>

  <!-- 우측 차트 부분-->
  <div v-if="position == 'RIGHT'" class="border-box-round">
    <div
      class="title-c"
      style="text-align: left; margin-top: 10px; margin-bottom: 10px; z-index: 2"
    >
      <span>{{ option.titleName }}</span
      ><span style="float: right; cursor: pointer" @click="show = !show"
        ><el-icon><CaretBottom /></el-icon
      ></span>
    </div>
    <el-collapse-transition v-show="show">
      <div class="tab-c">
        <v-chart
          ref="barRef"
          :class="option.titleName != null ? 'chart' : 'no-title-chart'"
          :init-options="initOptions"
          :option="option"
          @click="handleClick"
          autoresize
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script setup>
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { PieChart, BarChart } from 'echarts/charts'
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
  import VChart, { THEME_KEY } from 'vue-echarts'
  import { onMounted, provide, ref } from 'vue'

  const show = ref(true)

  const barRef = ref({})

  const props = defineProps({
    subTitle: {
      type: Object,
    },
    option: {
      type: Object,
    },
    viewType: {
      type: String,
      default: () => {
        /*
        BASIC - 기본, 통계데이터 표출
        ADD - 기본, 통계데이터 표출(추가화면)
        CHART - 차트 유형 표출
      */
        return 'BASIC'
      },
    },
    info: {
      type: Object,
    },
    position: {
      type: String,
      default: () => {
        /*
        TOP - 기본, 통계데이터 표출
        RIGHT - 차트 유형 표출
      */
        return 'TOP'
      },
    },
    activeId: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['handleClick'])

  const initOptions = {
    width: props.position == 'RIGHT' ? '450px' : '300px',
    // height:'100%'
  }

  // provide(THEME_KEY, 'dark');

  use([CanvasRenderer, PieChart, BarChart, TitleComponent, TooltipComponent, LegendComponent])

  function handleClick(...args) {
    if (props.viewType == 'BASIC') {
      emit('handleClick', { type: 'BASIC', id: props.info.id })
    }
    if (props.viewType == 'ADD') {
      emit('handleClick', { type: 'ADD' })
    } else {
      // emit('handleClick', ...args);
      emit('handleClick', barRef.value)
    }
  }

  onMounted(() => {
    // console.log(props.option.isViewTab);
  })
</script>
<style scoped>
  .basic-c {
    flex-basis: 220px;
    /* width:220px;  */
    height: 150px;
    margin: 10px;
    border: 0px !important;
    justify-content: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    flex-grow: 0;
    /* display: inline-flex; */
  }

  .top-c {
    width: 300px;
    height: 160px;
    border: 0px !important;
  }

  .active {
    border: 3px solid #f56c6c !important;
    border-radius: 20px !important;
  }

  .item-c {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .tab-c {
    width: 100%;
    height: 350px;
  }

  .title-c {
    position: relative;
    color: var(--ugis-color-temp-2);
    font-weight: bold;
  }

  .title-c-unit {
    font-size: 9pt;
    color: black;
    float: right;
    font-weight: 100;
  }

  .img-c {
    height: 15px;
    vertical-align: middle;
    padding-right: 5px;
  }

  .chart {
    height: 100%;
    /* width : 300px; */
    position: relative;
    top: -30px;
  }

  .no-title-chart {
    height: 100%;
    position: relative;
  }

  .arrow-middle {
    padding-left: 5px;
    width: 30px;
  }

  .arrow-bottom {
    padding-left: 5px;
    width: 15px;
  }
</style>
