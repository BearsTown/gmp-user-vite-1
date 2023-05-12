<template>
  <el-container>
    <el-main style="overflow: auto; padding: 0px">
      <el-scrollbar style="padding: 5px; box-sizing: border-box">
        <OutsideCollapse
          type="switch"
          title="분석지역 선택"
          :is-open="true"
          :is-active="true"
          @switch-change="handleSwitchChange"
        >
          <template #content>
            <SelectButton
              ref="selectCheckList1"
              type="radio"
              key-name="key"
              value-name="value"
              title-name="title"
              :request-api="requestApi1"
              @selection-change="handleSelectionChange1"
            />

            <el-divider border-style="dashed" style="margin: 10px 0px" />

            <SelectButton
              type="multi"
              ref="selectCheckList2"
              key-name="key"
              value-name="value"
              title-name="title"
              :request-api="requestApi2"
              @selection-change="handleSelectionChange2"
            />
          </template>
        </OutsideCollapse>

        <OutsideCollapse
          type="info"
          title="기준시점 선택"
          :is-open="false"
          :is-active="true"
          @info-click="handleInfoClick"
        >
          <template #content></template>
        </OutsideCollapse>
      </el-scrollbar>
    </el-main>
    <!--    <el-footer> ff</el-footer>-->
  </el-container>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'

  import SelectButton from '@/components/common/SelectButton.vue'
  import { useStepAStore } from '@/stores/work/plannedAreaAnalysis/step-A'
  import stepAService from '@/api/work/plannedAreaAnalysis/stepAService'
  import { OutsideCollapse } from '@/components/common/collapse'

  const stepAStore = useStepAStore()

  const selectCheckList1 = ref()
  const selectCheckList2 = ref()

  function handleSelectionChange1(a) {
    stepAStore.setSelectedList1(a)
  }

  function handleSelectionChange2(a) {
    stepAStore.setSelectedList2(a)
  }

  function handleSwitchChange(val) {
    alert(val)
  }

  function handleInfoClick() {
    alert('Info')
  }

  function test(a) {
    console.log(selectCheckList1.value.selectedList)
  }

  onMounted(() => {})

  const requestApi1 = (params) => {
    return stepAService.getList1(params)
  }

  const requestApi2 = (params) => {
    return stepAService.getList2(params)
  }
</script>

<style scoped></style>
