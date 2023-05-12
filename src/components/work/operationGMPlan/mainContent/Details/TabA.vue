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
      <InsideCollapse
        v-for="item in testList"
        :key="item.title"
        :title="item.title"
        :is-open="item.open"
      >
        <template #content>
          <div style="font-size: 13px">
            {{ item.data }}
          </div>
        </template>
      </InsideCollapse>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import { onActivated, onMounted, ref, toRef } from 'vue'
  import { InsideCollapse } from '@/components/common/collapse'

  const props = defineProps(['targetKey'])

  const targetKey = toRef(props, 'targetKey')

  const selected = ref('Option1')
  const options = [
    {
      value: 'Option1',
      label: '[부분 수정] 2022/01/23',
    },
  ]

  const text =
    '도시계획시설 결정을 통한 도로개설 방안은 공공제원 마련의 어려움에 따른 장기미집행시설 우려등을 해소하여아 하므로, 미래 도시계획시설 결정 가능성을 고려한 도로계획 수립 성장관리방안 수립 이후 개발진행에 따라 도시지역 편입을 고려하여, 차량교행이 가능한 폭 6m 이상의 도로가 확보되도록 계획 시 소유의 부지를 대상으로 기초생활인프라시설을 계획하여 주변지역 토지등 소유자의 계획적 개발 유도'
  const testList = [
    {
      open: true,
      data: text,
      title: '계획기준 설정',
    },
    {
      open: true,
      data: text,
      title: '도로계획',
    },
    {
      open: false,
      data: text,
      title: '기초생활인프라 시설 계획',
    },
    {
      open: false,
      data: text,
      title: '상하수도 계획',
    },
  ]

  function setData(data) {
    console.log(data)
  }

  onMounted(() => {
    console.log('Tab A')
  })

  onActivated(() => {
    console.log('onActivated')
  })

  defineExpose({
    setData,
  })
</script>

<style scoped></style>
