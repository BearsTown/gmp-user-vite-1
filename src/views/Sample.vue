<template>
  <div style="width: 100%; height: 100%; overflow-y: scroll">
    <el-table :data="user" table-layout="fixed">
      <el-table-column prop="loginId" label="loginId" />
      <el-table-column prop="userName" label="userName" />
      <el-table-column prop="email" label="email" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'

  import { useSampleStore } from '@/stores/sample'

  const store = useSampleStore()
  const { user } = storeToRefs(store)

  onMounted(() => {
    store.getSampleList()
  })
</script>

<style></style>
