<template>
  <el-container style="height: 100%">
    <el-header style="background-color: var(--el-color-primary-light-8)">
      <el-col :span="12" style="display: flex; justify-content: left">
        <label>상세정보</label>
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: right">
        <el-button :icon="DocumentAdd" @click="add"> 등록</el-button>
        <el-button v-if="boardStore.currentMode === FORM_MODE.VIEW" :icon="EditPen" @click="modify">
          수정
        </el-button>
        <el-button v-if="boardStore.currentMode === FORM_MODE.VIEW" :icon="Delete" @click="remove">
          삭제
        </el-button>
      </el-col>
    </el-header>

    <el-main style="flex: 1.5">
      <BoardFormView />
    </el-main>

    <el-main style="flex: 1; padding-top: 0px; padding-bottom: 0px">
      <BoardFileView />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { FORM_MODE } from '@/js/keys'

  import BoardFormView from '@/components/sample/board/BoardFormView.vue'
  import BoardFileView from '@/components/sample/board/BoardFileView.vue'
  import { EditPen, Delete, DocumentAdd } from '@element-plus/icons-vue'

  import { useSampleBoardStore } from '@/stores/sample/board/sample-board'
  import { useSampleBoardFileStore } from '@/stores/sample/board/sample-board-file'
  import { useSampleBoardDetailsStore } from '@/stores/sample/board/sample-board-form'
  import { useSampleBoardSearchStore } from '@/stores/sample/board/sample-board-search'

  const boardStore = useSampleBoardStore()
  const boardFileStore = useSampleBoardFileStore()
  const boardDetailsStore = useSampleBoardDetailsStore()
  const boardSearchStore = useSampleBoardSearchStore()

  onMounted(() => {
    /**
     * - ToDo :
     */
    boardFileStore.pageInfo.currentPageSize = 3

    if (boardStore.currentMode === FORM_MODE.VIEW) {
      boardFileStore.runSearch({
        linkId: boardStore.boardId,
      })
    }
  })

  function add() {
    boardStore.$reset()
    boardStore.setCurrentMode(FORM_MODE.NEW)
  }

  function modify() {
    boardStore.setCurrentMode(FORM_MODE.EDIT)
  }

  async function remove() {
    try {
      const boardId = boardStore.boardId!
      await boardDetailsStore.remove(boardId)

      boardStore.$reset()
      boardStore.setCurrentMode(FORM_MODE.EMPTY)
      boardFileStore.$reset()
      boardDetailsStore.$reset()

      await boardSearchStore.runPaging(1)
    } catch (e) {
      console.log(e)
    }
  }
</script>

<style scoped></style>
