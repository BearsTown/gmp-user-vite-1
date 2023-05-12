<template>
  <DetailsAside ref="detailsAsideRef" :is-details-collapse="true">
    <template #content>
      <el-scrollbar style="padding: 5px">
        <GroupCollapse title="분석결과 표시" :is-open="true" :use-left-margin="true">
          <template #content>
            <div class="border-box-round">
              <div style="margin-bottom: 10px; text-align: center">
                <el-radio-group v-model="radio">
                  <el-radio-button label="overlap">지도 중첩</el-radio-button>
                  <el-radio-button label="division">화면 분할</el-radio-button>
                </el-radio-group>
              </div>
              <div style="margin-bottom: 10px">
                <el-table
                  :ref="setTableRef"
                  :show-header="false"
                  :data="analysisResultList"
                  size="small"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="30" align="center" />
                  <el-table-column prop="title" />
                </el-table>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center">
                <el-radio-group v-model="radio2" size="small">
                  <el-radio-button label="L" />
                  <el-radio-button label="R" />
                </el-radio-group>
                <div style="color: var(--el-color-primary); font-size: 15px">
                  <el-icon>
                    <Plus />
                  </el-icon>
                  레이어 추가
                </div>
              </div>
            </div>
          </template>
        </GroupCollapse>

        <GroupCollapse title="구역계 작성" :is-open="true" :use-left-margin="true">
          <template #content>
            <div class="border-box-round">
              <div style="margin-bottom: 10px; text-align: center">
                <el-radio-group v-model="radio3">
                  <el-radio-button label="draw">
                    <el-icon>
                      <Edit />
                    </el-icon>
                    그리기
                  </el-radio-button>
                  <el-radio-button label="select">
                    <el-icon>
                      <Plus />
                    </el-icon>
                    필지 선택
                  </el-radio-button>
                </el-radio-group>
              </div>
              <div>
                <el-form
                  label-position="left"
                  style="width: 100%; height: 100%; display: flex; flex-direction: column"
                  label-width="120px"
                >
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="그리기 유형" prop="drawType">
                        <el-radio-group v-model="radio4" style="display: flex; flex: 1">
                          <el-radio label="1" border style="flex: 1; margin-right: 5px"
                            >다각형
                          </el-radio>
                          <el-radio label="2" border style="flex: 1">반경</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="파일 선택" prop="selectFile">
                        <el-button style="flex: 1">파일 찾기</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="공유">
                        <div
                          style="
                            display: flex;
                            flex: 1;
                            justify-content: space-between;
                            align-items: center;
                            color: var(--el-text-color-regular);
                          "
                        >
                          <el-switch v-model="share" />
                          면적 : 0.0㎢
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row style="display: flex">
                    <el-col :span="24">
                      <el-input
                        placeholder="구역계 명칭을 입력하세요."
                        style="margin-bottom: 5px"
                      />
                    </el-col>
                  </el-row>

                  <el-row style="display: flex; justify-content: flex-end">
                    <el-button type="primary">저장</el-button>
                  </el-row>
                </el-form>
              </div>
            </div>
          </template>
        </GroupCollapse>

        <GroupCollapse title="구역계 목록" :is-open="true" :use-left-margin="true">
          <template #content>
            <div class="border-box-round">
              <div
                class="area-box"
                v-for="(item, index) in areaList"
                :key="item"
                style="display: flex; justify-content: space-between"
              >
                <div style="color: var(--el-text-color-regular); font-size: 12px">
                  <el-badge :value="index + 1" class="item" type="primary" />
                  {{ item.title }}
                </div>
                <el-tag effect="dark" :type="getTypeName(item.type)">{{ item.type }}</el-tag>
              </div>
            </div>
          </template>
        </GroupCollapse>

        <!-- <Chart>
          <template #chart></template>
        </Chart> -->

        <div style="display: flex; height: 100%; flex-direction: column; margin: 5px 5px 15px">
          <VueEchart
            v-for="option in options"
            position="RIGHT"
            view-type="CHART"
            :key="option.id"
            :option="option"
            @handle-click="handleClick"
          />
        </div>
      </el-scrollbar>
    </template>
  </DetailsAside>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'

  import DetailsAside from '@/components/common/DetailsAside.vue'
  import Chart from '@/components/chart/Chart.vue'
  import { useStepAStore } from '@/stores/work/plannedAreaAnalysis/step-A'
  import { storeToRefs } from 'pinia'

  import { GroupCollapse } from '@/components/common/collapse'
  import mittBus from '@/utils/mittBus'
  import { Edit, Plus } from '@element-plus/icons-vue'
  import stepAService from '@/api/work/plannedAreaAnalysis/stepAService'
  import chartUtil from '@/utils/chartUtil'
  import VueEchart from '@/components/chart/VueEchart.vue'

  const radio = ref()
  const radio2 = ref()
  const radio3 = ref()
  const radio4 = ref()
  const share = ref()
  const detailsAsideRef = ref(null)

  const drawMode = ref('polygon')

  const tableRefs = []
  const setTableRef = (el) => {
    if (el) {
      tableRefs.push(el)
    }
  }

  const options = [
    chartUtil.initBar({
      isHorizontal: true,
      isViewTab: true,
      titleName: '개발행위허가 지목별 현황',
    }),
    chartUtil.initPie({ isViewTab: true, titleName: '개발행위허가 지목별 현황' }),
    chartUtil.initBar({
      isHorizontal: false,
      isViewTab: true,
      titleName: '개발행위허가 지목별 현황',
    }),
    chartUtil.initLine({
      isHorizontal: false,
      isViewTab: true,
      titleName: '개발행위허가 지목별 현황',
    }),
  ]

  const analysisResultList = ref([
    {
      key: 'key-result-1',
      title: '개발행위허가 분포(1㎦격자)',
    },
    {
      key: 'key-result-2',
      title: '개발가능지',
    },
    {
      key: 'key-result-3',
      title: '연속지적도',
    },
    {
      key: 'key-result-4',
      title: '행정구역경계(행정동)',
    },
  ])

  const areaList = ref([])

  function handleSelectionChange(list) {
    const selectedList = JSON.parse(JSON.stringify(list))
    console.log(selectedList)
  }

  function buttonCLick(a) {
    console.log(a.key)
  }

  function exclusionVisibleChange(data) {
    detailsAsideRef.value.openCollapse(true)
  }

  function getTypeName(type) {
    if (type === '개인') {
      return 'danger'
    } else {
      return ''
    }
  }

  function handleClick(chart) {
    console.log(chart)
    chart.resize()
  }

  onMounted(() => {
    ;(async () => {
      try {
        const { data } = await stepAService.getList3({})
        areaList.value = data
      } catch (error) {
        console.log(error)
      }
    })()
  })

  defineExpose({
    exclusionVisibleChange,
  })
</script>

<style scoped lang="scss">
  :deep(.el-form-item) {
    margin-bottom: 5px;
  }

  :deep(.el-badge__content.is-fixed) {
    right: 0px;
    transform: none;
  }

  .area-box {
    width: 100%;
    color: var(--el-text-color-regular);
    padding: 3px;
    text-align: center;
    box-sizing: border-box;
    background-color: var(--el-color-white);
    border: 1px solid lightgray;
    border-radius: var(--el-border-radius-base);

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
</style>
