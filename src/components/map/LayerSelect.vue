<template>
  <el-checkbox-group v-model="selectedList" @change="handleSelectionChange">
    <el-checkbox-button
      v-for="item in allList"
      :key="item[buldName]"
      :label="{ key: item[layerKey], layer: item[layerName] }"
      >{{ item[buldName] }}
    </el-checkbox-button>
  </el-checkbox-group>
</template>
<script setup>
  import { useSelectionBak } from '@/hooks/useSelectionBak'
  import { onMounted, toRefs, watch } from 'vue'

  const props = defineProps({
    requestApi: {
      type: Function,
      default: () => {},
    },
    layerKey: {
      type: String,
      default: '',
    },
    buldName: {
      type: String,
      default: '',
    },
    layerName: {
      type: String,
      default: '',
    },
  })
  const emits = defineEmits(['selection-change'])
  const { selectedList, selectionChange, allList, requestApi } = useSelectionBak(
    props.requestApi,
    props.layerName,
  )
  onMounted(() => {
    requestApi()
  })
  watch(
    () => selectedList.value,
    () => {
      emits('selection-change', selectedList.value)
    },
  )
  function handleSelectionChange(layers) {
    selectionChange(layers)
  }

  defineExpose({
    ...toRefs({}),
    allList,
    selectedList,
  })
  console.log(props)
</script>
