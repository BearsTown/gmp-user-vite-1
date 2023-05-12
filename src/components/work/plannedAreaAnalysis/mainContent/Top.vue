<template>
  <div class="top">
    {{ infoData }}
    {{ layerSelectionData }}
    {{ type }}
    <!-- <el-carousel indicator-position="none" height="170px" interval="9000" >
      <el-carousel-item v-for="item in 4" :key="item" >
        <div style="display: flex; width:100%;height: 100%;flex: 1 1 0%;">
            <VueEchart :option='option'></VueEchart>
        </div>
      </el-carousel-item>
    </el-carousel> -->
    <div style="width: 100%; height: 170px; flex: 1; position: relative">
      <el-scrollbar style="width: 100%">
        <div style="display: -webkit-inline-box; width: 100%; height: 100%">
          <component :is="viewConponent" />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
  import { markRaw, onMounted, reactive, ref, watch } from 'vue'

  import { useStepAStore } from '@/stores/work/plannedAreaAnalysis/step-A'
  import { storeToRefs } from 'pinia'
  import VueEchart from '@/components/chart/VueEchart.vue'
  import chartUtil from '@/utils/chartUtil'
  import StepAChart from '@/components/work/plannedAreaAnalysis/topContent/Step-A-chart.vue'
  import StepBChart from '@/components/work/plannedAreaAnalysis/topContent/Step-B-chart.vue'
  import StepCChart from '@/components/work/plannedAreaAnalysis/topContent/Step-C-chart.vue'

  const stepAStore = useStepAStore()
  // const { exclusionDataList, isDetailsCollapse } = storeToRefs(stepAStore)

  const infoData = ref()
  const layerSelectionData = ref()
  const viewType = ref({
    type: 'StepC',
  })
  const viewConponent = ref()

  function exclusionVisibleChange(data) {
    infoData.value = data
  }

  function exclusionLayerSelectionChange(data) {
    layerSelectionData.value = data
  }

  function exclusionTypeChange(data) {
    console.log(data)
    viewType.value = data.type

    switch (viewType.value) {
      case 'StepA': {
        viewConponent.value = markRaw(StepAChart)
        break
      }
      case 'StepB': {
        viewConponent.value = markRaw(StepBChart)
        break
      }
      case 'StepC': {
        viewConponent.value = markRaw(StepCChart)
        break
      }
    }
  }

  onMounted(() => {})

  defineExpose({
    exclusionVisibleChange,
    exclusionLayerSelectionChange,
    exclusionTypeChange,
  })
</script>

<style scoped lang="scss">
  .top {
    width: auto;
    height: 170px;
    z-index: 1;
    left: 0px;
    right: 0px;
    opacity: 0.8;
    border-top: none;
    position: absolute;
    background-color: white;
    margin: auto 60px auto 45px;
    border-radius: 0px 0px 10px 10px;
    border: 1px solid var(--el-color-primary);
    box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.2);
  }
</style>
