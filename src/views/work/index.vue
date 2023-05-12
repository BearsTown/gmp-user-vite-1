<template>
  <div class="gmp-main">
    <el-container>
      <button
        type="button"
        @click="handleLeftCollapseClick"
        class="btn_hide_widget"
        :class="[{ 'is-left-collapse': isLeftCollapse }]"
      >
        <el-icon>
          <ArrowRight />
        </el-icon>
      </button>
      <el-aside :class="[{ 'is-left-collapse': isLeftCollapse }]">
        <div class="search">
          <h1>성장관리계획 관리 시스템</h1>
          <el-row style="padding-bottom: 5px">
            <el-col :span="24">
              <el-input
                :clearable="true"
                :prefix-icon="Location"
                class="input-with-select"
                placeholder="검색어(지역명, 지번, 도로명주소)를 입력해 주세요."
              >
                <template #append>
                  <el-button :icon="Search" />
                </template>
              </el-input>
            </el-col>
          </el-row>
        </div>

        <div class="tabMenu">
          <el-scrollbar>
            <el-radio-group v-model="tab" @change="onChange">
              <el-radio-button v-for="item in tabs" :key="item.key" :label="item.key">
                {{ item.title }}
              </el-radio-button>
            </el-radio-group>
          </el-scrollbar>

          <div class="menuContent">
            <router-view name="menuContent" v-slot="{ Component }">
              <transition name="slide-fade" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </div>
      </el-aside>

      <el-main>
        <router-view name="mainContent" v-slot="{ Component }">
          <!--          <transition name="slide-fade" mode="out-in">-->
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
          <!--          </transition>-->
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Search, Location } from '@element-plus/icons-vue'
  import { storeToRefs } from 'pinia'

  import { useGmpStore } from '@/stores/work/index'

  const gmpStore = useGmpStore()
  const { isLeftCollapse } = storeToRefs(gmpStore)

  onMounted(() => {
    console.log('onMounted')
    console.log(`current route name on component setup init: ${route.name}`)
  })

  const router = useRouter()
  const route = useRoute()

  const tab = ref('')

  const tabs = ref([
    {
      key: 'plannedAreaAnalysis',
      title: '계획구역 분석',
    },
    {
      key: 'plannedAreaMonitoring',
      title: '계획구역 모니터링',
    },
    {
      key: 'operationGMPlan',
      title: '성장관리계획 운영',
    },
  ])

  function onChange(key) {
    console.log(key)

    router.push({
      name: key,
    })
  }

  onMounted(() => {
    loadTab()
  })

  watch(
    () => route.name,
    () => {
      loadTab()
    },
  )

  function loadTab() {
    tab.value = route.name
  }

  function handleLeftCollapseClick() {
    gmpStore.setLeftCollapse(!isLeftCollapse.value)
  }
</script>

<style scoped lang="scss">
  .gmp-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    > .el-container {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 5px;
      box-sizing: border-box;
      background-color: #f0f2f5;

      .el-aside {
        width: 400px;
        display: flex;
        margin-left: -405px;
        margin-right: 5px;
        flex-direction: column;
        transition: all var(--el-transition-duration);

        &.is-left-collapse {
          margin-left: 0px;
        }
      }

      .el-main {
        padding: 0px;
        display: flex;
        overflow: hidden;
        //padding: 5px;
        //border-radius: 5px;
        //box-sizing: border-box;
        //background-color: var(--el-fill-color-blank);
      }

      .el-radio-group {
        flex-direction: column;

        :deep(.el-radio-button) {
          .el-radio-button__inner {
            width: 35px;
            height: 160px;
            color: white;
            margin-bottom: 5px;
            writing-mode: vertical-lr;
            padding: 5px 0px 5px 10px;
            border-radius: 10px 0px 0px 10px;
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
    }
  }

  .search {
    width: 100%;
    padding: 5px;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
    background-color: var(--el-fill-color-blank);
  }

  .tabMenu {
    display: flex;
    flex: 1;
    overflow: auto;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .menuContent {
    flex: 1;
    padding: 5px;
    display: flex; //
    overflow: hidden;
    box-sizing: border-box;
    background-color: var(--el-fill-color-blank);
  }

  .btn_hide_widget {
    left: 10px;
    z-index: 10000;
    position: absolute;
    cursor: pointer;
    transform: translateY(-50%);
    top: 50%;
    width: 20px;
    height: 50px;
    padding: 0px;
    left: 5px;
    border: 1px solid #cbcbcb;
    border-left: none;
    background-color: #ffffff;
    border-radius: 0 8px 8px 0;
    transition: all var(--el-transition-duration);

    &.is-left-collapse {
      left: 405px;

      > .el-icon {
        transform: rotate(180deg);
      }
    }

    &:hover {
      border-color: var(--el-color-primary-light-7);
      background-color: var(--el-color-primary-light-9);

      > .el-icon {
        color: var(--el-color-primary);
      }
    }
  }
</style>
