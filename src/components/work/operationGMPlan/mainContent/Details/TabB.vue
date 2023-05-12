<template>
  <div>Tab B</div>
</template>

<script setup>
  import { onActivated, onMounted, ref, toRef } from 'vue'

  const props = defineProps(['targetKey'])

  const targetKey = toRef(props, 'targetKey')

  onMounted(() => {
    console.log('Tab B')
  })

  onActivated(() => {
    console.log('onActivated')
  })
</script>

<style scoped></style>
