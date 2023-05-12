<template>
  <div style="width: 100%; height: 100%">
    <GroupCollapse title="성장관리계획 구역 지정 현황" :is-open="true" :use-left-margin="false">
      <template #content>
        <div class="border-box-round"></div>
      </template>
    </GroupCollapse>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { GroupCollapse } from '@/components/common/collapse'
</script>

<style scoped></style>
