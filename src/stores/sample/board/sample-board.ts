import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

import { FORM_MODE } from '@/js/keys'

interface BoardState {
  boardId: Nullable<number>
  currentMode: Symbol
}

export const useSampleBoardStore = defineStore('useSampleBoard', () => {
  const state = reactive<BoardState>({
    boardId: null,
    currentMode: FORM_MODE.EMPTY,
  })

  function setBoardId(id: number) {
    state.boardId = id
  }

  function setCurrentMode(mode: Symbol) {
    state.currentMode = mode
  }

  function isWrite() {
    return state.currentMode === FORM_MODE.NEW || state.currentMode === FORM_MODE.EDIT
  }

  return {
    ...toRefs(state),
    isWrite,
    setBoardId,
    setCurrentMode,
  }
})
