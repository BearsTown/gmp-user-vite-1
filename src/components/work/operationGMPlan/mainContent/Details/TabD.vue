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
      <InsideCollapse :title="item1.title">
        <template #content>
          <div style="font-size: 13px"></div>
        </template>
      </InsideCollapse>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import { onActivated, onMounted, ref, toRef, h } from 'vue'
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

  const item1 = {
    title: '계획기준 설정',
    data: '',
  }

  onMounted(() => {
    console.log('Tab D')
  })

  onActivated(() => {
    console.log('onActivated')
  })
</script>

<style scoped></style>
