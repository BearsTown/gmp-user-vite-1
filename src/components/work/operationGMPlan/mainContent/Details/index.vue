<template>
  <DetailsAside ref="detailsAsideRef" :is-details-collapse="true">
    <template #content>
      <div style="display: flex; flex-direction: column; width: 100%; height: 100%">
        <div style="background-color: #0b92d9">
          <div style="display: flex; flex-direction: column">
            <div style="display: flex; flex-direction: row">
              <el-space
                direction="vertical"
                style="flex: 1; align-items: start; padding: 15px 5px 15px 15px"
              >
                <el-text tag="b" style="font-size: 20px">{{ info.title }}</el-text>
                <el-text tag="p">위치 : {{ info.location }}</el-text>
                <el-text tag="p">면적 : {{ info.area }}</el-text>
              </el-space>
              <div style="display: flex; flex-direction: column; padding: 15px 15px 15px 0px">
                <div style="display: flex; justify-content: space-between; flex: 1">
                  <el-tag effect="dark">{{ info.type1 }}</el-tag>
                  <el-tag effect="dark" :type="'warning'">{{ info.type2 }}</el-tag>
                </div>
                <div style="flex: 1">
                  <el-button size="small">구역현황 보기</el-button>
                  <el-button size="small" style="width: 0px; margin-left: 5px">
                    <el-icon>
                      <Printer />
                    </el-icon>
                  </el-button>
                </div>
              </div>
            </div>
            <div>
              <el-radio-group v-model="tab" @change="handleTabChange">
                <el-radio-button v-for="item in tabList" :key="item.key" :label="item.key">
                  {{ item.title }}
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div style="flex: 1; background-color: white; overflow-y: auto; overflow-x: hidden">
          <transition name="slide-fade" mode="out-in">
            <keep-alive>
              <component :is="tabComponent" :target-key="targetKey" ref="current" />
            </keep-alive>
          </transition>
        </div>
      </div>
    </template>
  </DetailsAside>
</template>

<script setup>
  import { computed, markRaw, onMounted, reactive, ref } from 'vue'
  import { storeToRefs } from 'pinia'

  import DetailsAside from '@/components/common/DetailsAside.vue'

  const radio = ref()
  const detailsAsideRef = ref(null)

  function handleSelectionChange(list) {
    const selectedList = JSON.parse(JSON.stringify(list))
    console.log(selectedList)
  }

  function exclusionVisibleChange(data) {
    detailsAsideRef.value.openCollapse(true)
  }

  import TabA from '@/components/work/operationGMPlan/mainContent/Details/TabA.vue'
  import TabB from '@/components/work/operationGMPlan/mainContent/Details/TabB.vue'
  import TabC from '@/components/work/operationGMPlan/mainContent/Details/TabC.vue'
  import TabD from '@/components/work/operationGMPlan/mainContent/Details/TabD.vue'

  const tab = ref()
  const current = ref()
  const targetKey = ref('key-1')
  const tabComponent = ref(null)

  const info = reactive({
    title: '교동 성장관리계힉 구역-1',
    location: '속초시 교통 803번지 일원',
    area: '213,450㎢',
    type1: '유도형',
    type2: '주거형',
  })

  const tabList = computed(() => {
    return [
      {
        key: 'tab-A',
        title: '기반시설 계획',
        content: TabA,
      },
      {
        key: 'tab-B',
        title: '건축물 용도계획',
        content: TabB,
      },
      {
        key: 'tab-C',
        title: '인센티브 계획',
        content: TabC,
      },
      {
        key: 'tab-D',
        title: '성장관리 계획',
        content: TabD,
      },
    ]
  })

  function handleTabChange(key) {
    console.log(key)
    const find = tabList.value.find((item) => key === item.key)
    tabComponent.value = markRaw(find.content)
  }

  onMounted(() => {
    tab.value = 'tab-C'
    handleTabChange('tab-C')

    // setTimeout(() => {
    //   console.log(11111)
    //   targetKey.value = 'key-2'
    //   // current.value.setData(123)
    // }, 2000)
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

  :deep(.el-text) {
    color: var(--el-color-white);
  }

  .el-radio-group {
    display: flex;

    :deep(.el-radio-button) {
      flex: 1;
      margin-right: 3px;

      &:first-child {
        margin-left: 3px;
      }

      .el-radio-button__inner {
        width: 100%;
        height: 30px;
        color: white;
        font-size: 12px;
        display: grid;
        align-items: center;
        padding: 5px;
        border-radius: 10px 10px 0px 0px;
        border: 1px solid #0c6c9f;
        background-color: #0c6c9f;
      }
    }

    :deep(.el-radio-button__original-radio:checked) + .el-radio-button__inner {
      color: black;
      background-color: white;
      border: 1px solid white;
      box-shadow: -1px 0 0 0 white;
    }
  }
</style>
