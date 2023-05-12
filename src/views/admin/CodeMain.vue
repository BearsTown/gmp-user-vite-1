<template>
  <el-container style="height: 100%">
    <CodeTree />
    <el-container>
      <el-main>
        <CodeInfo />
        <el-divider />
        <CodeList />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
  import CodeTree from '@/components/admin/CodeTree.vue'
  import CodeInfo from '@/components/admin/CodeInfo.vue'
  import CodeList from '@/components/admin/CodeList.vue'
</script>
<style scoped></style>
