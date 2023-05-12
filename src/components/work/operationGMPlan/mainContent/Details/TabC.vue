<template>
  <div style="display: flex; flex-direction: column; overflow-y: auto; height: 100%">
    <div style="text-align: center; padding: 5px">
      <el-select v-model="selected" size="small" style="width: 80%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-scrollbar style="padding: 5px">
      <GroupCollapse v-for="group in incentiveGroupList" :key="group.title" :title="group.title">
        <template #sub>
          <div>
            <el-button :type="'primary'" size="small">추가</el-button>
            <el-button :type="'primary'" size="small" style="margin-left: 0px">삭제</el-button>
          </div>
        </template>
        <template #content>
          <InsideCollapse
            v-for="area in group.data"
            :key="area.title"
            :title="area.title"
            :is-open="area.open"
          >
            <template #sub>
              <div style="display: flex">
                <div style="width: 50px">
                  <span
                    class="incentive-sum"
                    :class="{ 'is-exists': isExistsIncentive(area.data) }"
                    >{{ `${calculatePercentage(area.total)}%` }}</span
                  >
                </div>
                <div>
                  <span
                    class="incentive-calculate"
                    v-if="area.isExistsIncentive"
                    style="width: 40px"
                  >
                    {{ `+${calculatePercentage(area.sum)}%` }}
                  </span>
                </div>
              </div>
            </template>
            <template #content>
              <IncentiveItem
                v-for="item in area.data"
                :key="item.title"
                :data="item"
                @item-remove="removeIncentiveItem(group.type, $event)"
              />
            </template>
          </InsideCollapse>
        </template>
      </GroupCollapse>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import { computed, onActivated, onMounted, ref, toRef } from 'vue'
  import { InsideCollapse } from '@/components/common/collapse'
  import IncentiveItem from '@/components/work/operationGMPlan/mainContent/Details/IncentiveItem.vue'
  import GroupCollapse from '@/components/common/collapse/GroupCollapse.vue'
  import { useIncentiveStore } from '@/stores/work/operationGMPlan/incentive'
  import { storeToRefs } from 'pinia'

  const incentiveStore = useIncentiveStore()

  const { farIncentiveListRef, bcrIncentiveListRef } = storeToRefs(incentiveStore)

  const props = defineProps(['targetKey'])

  const targetKey = toRef(props, 'targetKey')

  const selected = ref('Option1')
  const options = [
    {
      value: 'Option1',
      label: '[부분 수정] 2022/01/23',
    },
  ]

  function isExistsIncentive(item) {
    return item && Array.isArray(item) && 0 < item.length
  }

  function calculatePercentage(val) {
    return Number((val * 100).toFixed(3))
  }

  function removeIncentiveItem(type, key) {
    console.log(type)
    console.log(key)
    incentiveStore.itemRemove(type, key)
  }

  incentiveStore.getIncentiveList()

  const incentiveGroupList = ref([
    {
      title: '건폐율 인센티브',
      type: 'bcr',
      data: bcrIncentiveListRef,
    },
    {
      title: '용적률 인센티브',
      type: 'far',
      data: farIncentiveListRef,
    },
  ])

  function setData(data) {
    console.log(data)
  }

  onMounted(() => {
    console.log('Tab C')
  })

  onActivated(() => {
    console.log('onActivated')
  })

  defineExpose({
    setData,
  })
</script>

<style scoped lang="scss">
  .incentive-sum {
    font-weight: bold;
    color: var(--ugis-color-gray);

    &.is-exists {
      color: var(--ugis-color-orange);
    }
  }

  .incentive-calculate {
    height: 24px;
    font-size: 12px;
    padding: 0px 10px;
    margin-left: 10px;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    color: var(--ugis-color-white);
    background-color: var(--ugis-color-orange);
    border-radius: var(--el-border-radius-round);
  }
</style>
