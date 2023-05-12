import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

import {
  insert as apiInsert,
  update as apiUpdate,
  remove as apiDelete,
  getBoardDeatails,
} from '@/api/sample/board/sampleBoard/index'
import { useSampleBoardFileStore } from './sample-board-file'
import SampleBoardDto from '@/api/sample/board/sampleBoard/model'

const boardFileStore = useSampleBoardFileStore()

interface FormDataState {
  id: Nullable<number>
  strInput: string
  boolRadio: boolean
  boolSwitch: boolean
  createUser: string
  strColor: string
  strCombo: string
  strTextarea: string
  numSpin: number
  numSlider: number
  datePicker: string
  createDate: string
  updateDate: string
}

export const useSampleBoardDetailsStore = defineStore('useSampleBoardDetails', () => {
  const state = reactive<FormDataState>({
    id: null,
    strInput: '',
    boolRadio: false,
    boolSwitch: false,
    createUser: '',
    strColor: '',
    strCombo: '',
    strTextarea: '',
    numSpin: 0.0,
    numSlider: 1,
    datePicker: '',
    createDate: '',
    updateDate: '',
  })

  function _responseBoardDetailsData(data: SampleBoardDto.Details.Result) {
    Object.assign(state, data)
  }

  async function getDetails(boardId: number) {
    const data = {
      boardId,
    }

    const { data: result } = await getBoardDeatails(data)
    _responseBoardDetailsData(result)
  }

  async function insert() {
    const data: SampleBoardDto.Insert = Object.assign(state, boardFileStore.fileList)
    const { data: boardId } = await apiInsert(data)
    return boardId
  }

  async function update() {
    const data: SampleBoardDto.Update = Object.assign(state, boardFileStore.fileList)
    const { data: boardId } = await apiUpdate(data)
    return boardId
  }

  async function remove(boardId: number) {
    const data: SampleBoardDto.Delete.Params = {
      boardIds: [boardId],
    }
    return await apiDelete(data)
  }

  return {
    ...toRefs(state),
    insert,
    update,
    remove,
    getDetails,
  }
})
