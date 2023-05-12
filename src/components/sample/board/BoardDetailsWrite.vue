<template>
  <el-container style="height: 100%">
    <el-header style="background-color: var(--el-color-primary-light-8)">
      <el-col :span="12" style="display: flex; justify-content: left">
        <label>상세정보</label>
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: right">
        <el-button type="primary" :icon="Files" @click="submitForm"> 저장</el-button>
        <el-button :icon="Close" @click="cancel"> 취소</el-button>
      </el-col>
    </el-header>

    <el-main style="flex: 1.5">
      <BoardFormWrite ref="boardFormWrite" />
    </el-main>

    <el-main style="flex: 1; padding-top: 0px; padding-bottom: 0px">
      <BoardFileWrite />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import BoardFormWrite from '@/components/sample/board/BoardFormWrite.vue'
  import BoardFileWrite from '@/components/sample/board/BoardFileWrite.vue'

  import { useSampleBoardStore } from '@/stores/sample/board/sample-board'
  import { useSampleBoardDetailsStore } from '@/stores/sample/board/sample-board-form'
  import { useSampleBoardSearchStore } from '@/stores/sample/board/sample-board-search'
  import { useSampleBoardFileStore } from '@/stores/sample/board/sample-board-file'
  import { FORM_MODE } from '@/js/keys'
  import { ref } from 'vue'
  import { Files, Close } from '@element-plus/icons-vue'
  import type { FormInstance } from 'element-plus'

  const boardStore = useSampleBoardStore()
  const boardDetailsStore = useSampleBoardDetailsStore()
  const boardSearchStore = useSampleBoardSearchStore()
  const boardFileStore = useSampleBoardFileStore()

  const boardFormWrite = ref<BoardFormWrite>(null)

  // onMounted(() => {
  if (boardStore.currentMode === FORM_MODE.NEW) {
    boardDetailsStore.$reset()
  } else if (boardStore.currentMode === FORM_MODE.EDIT) {
    boardDetailsStore.getDetails(boardStore.boardId!)
  }

  // })

  async function submitForm() {
    const formEl: FormInstance = boardFormWrite.value.ruleFormRef
    if (!formEl) return
    // await formEl.validate((valid, fields) => {
    await formEl.validate((valid) => {
      if (valid) {
        save()
      }
    })
  }

  async function save() {
    if (boardStore.currentMode === FORM_MODE.NEW) {
      const boardId = await boardDetailsStore.insert()
      _reLoad(boardId)
      await boardSearchStore.runPaging(1)
    } else if (boardStore.currentMode === FORM_MODE.EDIT) {
      const boardId = await boardDetailsStore.update()
      _reLoad(boardId)
      await boardSearchStore.runPaging(1)
    }
  }

  function cancel() {
    if (boardStore.currentMode === FORM_MODE.NEW) {
      boardStore.setCurrentMode(FORM_MODE.EMPTY)
    } else if (boardStore.currentMode === FORM_MODE.EDIT) {
      _reLoad(boardStore.boardId!)
    }
  }

  function _reLoad(id: number) {
    boardDetailsStore.getDetails(id)
    boardFileStore.runSearch({
      linkId: id,
    })
    boardStore.setBoardId(id)
    boardStore.setCurrentMode(FORM_MODE.VIEW)
  }
</script>

<style scoped></style>
