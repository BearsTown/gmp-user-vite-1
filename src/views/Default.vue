<template>
  <div></div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { onMounted } from 'vue'

  onMounted(() => {
    useAuthStore().checkToken()
    console.log('Default-check')
  })
</script>

<style></style>
