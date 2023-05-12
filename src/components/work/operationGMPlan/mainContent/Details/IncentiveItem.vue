<template>
  <div :class="['area-box-gray', 'incentive-item']">
    <div>
      <span class="title">
        {{ data.title }}
      </span>
      <el-button size="small" class="item-remove" @click="handleItemRemove(data.key)">x</el-button>
    </div>
    <div class="types">
      <span class="span" style="background-color: #0c8d67; width: 25%">
        <span>{{ data.type }}</span>
      </span>
      <span class="span" style="background-color: #7264c9; width: 20%">
        <span>{{ data.mitigation.category }}</span>
      </span>
      <span class="span" style="background-color: #a6a7a7; width: 55%">
        <span>{{ formulaRef }}</span>
      </span>
    </div>
    <div style="display: flex">
      <span
        style="
          align-content: center;
          display: grid;
          font-weight: bold;
          color: var(--ugis-color-temp-3);
        "
      >
        ㄴ
      </span>
      <div class="border-box-round" style="flex: 1; height: 30px">
        <el-row style="font-size: 12px">
          <el-col :span="3" style="color: var(--ugis-color-orange); font-weight: bold">
            {{ `${calculateRef * 100}%` }}
          </el-col>
          <el-col :span="6">기반시설면적</el-col>
          <el-col
            :span="5"
            style="
              font-weight: bold;
              color: var(--ugis-color-temp-3);
              border-bottom: 1px solid var(--ugis-color-temp-3);
            "
          >
            {{ 50 }}㎡
          </el-col>
          <el-col :span="5">대지면적</el-col>
          <el-col
            :span="5"
            style="
              font-weight: bold;
              color: var(--ugis-color-temp-3);
              border-bottom: 1px solid var(--ugis-color-temp-3);
            "
          >
            1,000㎡
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useIncentive } from '@/hooks/useIncentive'

  type DataType = {
    type: object
    mitigation: any
  }

  interface Props {
    data: DataType
  }

  const props = defineProps<Props>()

  const emits = defineEmits(['item-remove'])

  function handleItemRemove(val) {
    emits('item-remove', val)
  }

  const { formulaRef, calculateRef } = useIncentive(props.data.mitigation)

  onMounted(() => {
    console.log(props.data)
  })
</script>

<style scoped lang="scss">
  .incentive-item {
    padding: 5px;
    display: flex;
    flex-direction: column;

    & > div {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      justify-content: space-between;

      .title {
        font-size: 12px;
        font-weight: bold;
        color: var(--ugis-color-gray);
      }
    }

    .types {
      height: 30px;

      :not(:last-child) {
        margin-right: 3px;
      }

      > span {
        border-radius: var(--el-border-radius-base);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        //padding: 0 5px;

        > span {
          color: white;
          font-size: 10px;
        }
      }
    }

    .item-remove {
      border: none;
      padding: 0px;
      font-weight: bold;
      align-items: start;
      color: var(--ugis-color-gray);

      &:hover,
      &:focus {
        background-color: white;
      }
    }
  }
</style>
