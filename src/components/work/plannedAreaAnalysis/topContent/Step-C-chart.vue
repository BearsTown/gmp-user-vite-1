<template>
  <div class="header">
    <div style="font-size: 16px">필지 수</div>
    <div style="font-size: 25px; padding-bottom: 10px">
      <span style="color: var(--ugis-color-temp-2)">{{ data.count }}개</span>
    </div>
    <div style="font-size: 16px">면적</div>
    <div style="font-size: 25px; color: var(--ugis-color-temp-2)">{{ data.changeRate }}㎢</div>
  </div>
  <VueEchart
    v-for="option in options"
    :key="option.id"
    :option="option"
    view-type="CHART"
    @handle-click="handleClick"
  />
</template>

<script setup>
  import VueEchart from '@/components/chart/VueEchart.vue'
  import chartUtil from '@/utils/chartUtil'
  import { ref } from 'vue'

  const data = ref({
    count: '3,364',
    changeRate: 23.1,
    desc: '증감율 설명',
  })

  const options = [
    chartUtil.initBar({ isHorizontal: true, titleName: '목적별 현황', unitName: '건' }),
    chartUtil.initPie(),
    chartUtil.initBar({ isHorizontal: false, titleName: '용도지역별 현황', unitName: '건' }),
    chartUtil.initBar({ isHorizontal: false, titleName: '경사도', unitName: '건' }),
  ]

  function handleClick(args) {
    console.log(args)
  }
</script>

<style></style>
