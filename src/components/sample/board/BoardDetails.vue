<template>
  <BoardDetailsView v-if="!boardStore.isWrite()" />
  <BoardDetailsWrite v-else />
</template>

<script setup lang="ts">
  import BoardDetailsView from '@/components/sample/board/BoardDetailsView.vue'
  import BoardDetailsWrite from '@/components/sample/board/BoardDetailsWrite.vue'

  import { useSampleBoardStore } from '@/stores/sample/board/sample-board'

  const boardStore = useSampleBoardStore()
</script>

<style scoped></style>
