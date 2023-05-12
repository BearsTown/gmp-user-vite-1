<template>
  <el-container>
    <el-main style="overflow: auto; padding: 0px">
      <el-scrollbar style="padding: 5px; box-sizing: border-box">
        <GroupCollapse :is-open="true" :use-left-margin="true" title="토지이용 특성">
          <template #content>
            <OutsideCollapse
              v-for="(item, index) in exclusionDataList"
              type="switch"
              :key="item.key"
              :title="item.title"
              :is-open="true"
              :is-active="false"
              @switch-change="handleSwitchChange(item.key, $event)"
            >
              <template #content>
                <el-table
                  :ref="setTableRef"
                  :show-header="false"
                  :data="item.dataList"
                  size="small"
                  style="width: 100%"
                  @selection-change="handleSelectionChange(index, item.key, $event)"
                >
                  <el-table-column type="selection" width="30" align="center" />
                  <el-table-column prop="planLayerName" />
                </el-table>
              </template>
            </OutsideCollapse>
          </template>
        </GroupCollapse>
      </el-scrollbar>
    </el-main>
    <!--    <el-footer> ff</el-footer>-->
  </el-container>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'

  import mittBus from '@/utils/mittBus'
  import { getLayers } from '@/api/gmp/plan/index'
  import { useStepAStore } from '@/stores/work/plannedAreaAnalysis/step-A'
  import { GroupCollapse, OutsideCollapse } from '@/components/common/collapse'

  const tableRefs = []
  const setTableRef = (el) => {
    if (el) {
      tableRefs.push(el)
    }
  }

  const stepAStore = useStepAStore()

  // const { getExclusionDataByKey } = storeToRefs(stepAStore)

  function handleSelectionChange(idx, key, list) {
    const selectedList = JSON.parse(JSON.stringify(list))

    mittBus.emit('exclusion-layer-selection-change', {
      key,
      selectedList,
    })
  }

  function handleSwitchChange(key, visible) {
    mittBus.emit('exclusion-visible-change', {
      key,
      visible,
    })
  }

  const exclusionDataList = ref([
    {
      key: 'key-exclusion-1',
      title: '시가화(주상공)지역 제척',
      dataList: [],
      params: {
        plan: 'p1',
        planGroup: 'b1',
      },
    },
    {
      key: 'key-exclusion-2',
      title: '공적규제지역 제척',
      dataList: [],
      params: {
        plan: 'p1',
        planGroup: 'b2',
      },
    },
    {
      key: 'key-exclusion-3',
      title: '기계획지역 제척',
      dataList: [],
      params: {
        plan: 'p1',
        planGroup: 'b3',
      },
    },
    {
      key: 'key-exclusion-4',
      title: '보전용도지역 제척',
      dataList: [],
      params: {
        plan: 'p1',
        planGroup: 'b4',
      },
    },
    {
      key: 'key-exclusion-5',
      title: '개발규제(경사도25도이상)지역 제척',
      dataList: [],
      params: {
        plan: 'p1',
        planGroup: 'b5',
      },
    },
  ])

  onMounted(() => {
    exclusionDataList.value.forEach((exData) => {
      ;(async () => {
        try {
          const { data } = await getLayers(exData.params)
          exData.dataList = data
        } catch (error) {
          console.log(error)
        }
      })()
    })
  })
</script>

<style scoped lang="scss">
  :deep(.el-table) {
    --el-table-border-color: none;
  }
</style>
