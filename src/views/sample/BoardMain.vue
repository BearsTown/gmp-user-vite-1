<template>
  <div class="common-layout">
    <el-container>
      <el-header style="justify-content: left">
        샘플 - FORM TEST {{ boardStore.boardId }}
      </el-header>

      <el-main style="padding: 0px">
        <el-container style="width: 400px; height: 100%; flex-grow: unset">
          <BoardSearch />
        </el-container>

        <el-container style="height: 100%">
          <BoardDetails />
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import { onUnmounted } from 'vue'

  import BoardSearch from '@/components/sample/board/BoardSearch.vue'
  import BoardDetails from '@/components/sample/board/BoardDetails.vue'
  import { useSampleBoardStore } from '@/stores/sample/board/sample-board'

  const boardStore = useSampleBoardStore()

  onUnmounted(() => {
    boardStore.$reset()
  })
</script>

<style scoped></style>
