<template>
  <div style="flex: 1; display: flex; flex-direction: column; padding: 0px">
    <div style="height: auto; padding: 10px">
      <el-row :gutter="20" style="text-align: center; align-items: center">
        <el-col :span="7">
          <div
            class="grid-content ep-bg-purple circle"
            :class="{ active: storeCurrentStep == 'StepA' }"
            @click="change('StepA')"
          >
            분석대상<br />설정
          </div>
        </el-col>
        <el-col :span="1" style="padding: 0px !important">
          <div class="grid-content ep-bg-purple icon-c">
            <el-icon>
              <ArrowRightBold />
            </el-icon>
          </div>
        </el-col>
        <el-col :span="7">
          <div
            class="grid-content ep-bg-purple circle"
            :class="{ active: storeCurrentStep == 'StepB' }"
            @click="change('StepB')"
          >
            개발행위<br />현황분석
          </div>
        </el-col>
        <el-col :span="1" style="padding: 0px !important">
          <div class="grid-content ep-bg-purple icon-c">
            <el-icon>
              <ArrowRightBold />
            </el-icon>
          </div>
        </el-col>
        <el-col :span="7">
          <div
            class="grid-content ep-bg-purple circle"
            :class="{ active: storeCurrentStep == 'StepC' }"
            @click="change('StepC')"
          >
            개발가능지<br />분석
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="flex: 1; display: flex; overflow: auto">
      <component :is="cntComponent" />
    </div>
  </div>
</template>

<script setup>
  import { markRaw, onMounted, ref } from 'vue'
  import StepA from '@/components/work/plannedAreaAnalysis/menuContent/Step-A.vue'
  import StepB from '@/components/work/plannedAreaAnalysis/menuContent/Step-B.vue'
  import StepC from '@/components/work/plannedAreaAnalysis/menuContent/Step-C.vue'
  import mittBus from '@/utils/mittBus'

  const cntComponent = ref(null)
  const storeCurrentStep = ref('')

  function change(type) {
    storeCurrentStep.value = type

    switch (storeCurrentStep.value) {
      case 'StepA': {
        cntComponent.value = markRaw(StepA)
        break
      }
      case 'StepB': {
        cntComponent.value = markRaw(StepB)
        break
      }
      case 'StepC': {
        cntComponent.value = markRaw(StepC)
        break
      }
    }

    mittBus.emit('exclusion-type-change', {
      type,
    })
  }

  onMounted(() => {
    change('StepC')
  })
</script>
<style scoped>
  .circle {
    margin: 0 auto;
    width: 90px;
    height: 80px;
    border: 2px solid #29b0f8;
    border-radius: 50%;
    background-color: #29b0f81a;
    color: #29b0f8;
    vertical-align: middle;
    display: table-cell;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }

  .circle:hover,
  .active {
    margin: 0 auto;
    width: 90px;
    height: 80px;
    border: 2px solid #29b0f8;
    border-radius: 50%;
    background-color: #29b0f8;
    color: white;
    vertical-align: middle;
    display: table-cell;
    font-weight: bold;
    font-size: 14px;
  }

  .icon-c {
    color: #29b0f8;
    font-size: 25px;
    position: relative;
    left: -5px;
  }
</style>
