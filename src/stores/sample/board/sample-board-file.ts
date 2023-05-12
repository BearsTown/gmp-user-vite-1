import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { merge } from 'lodash'

import {
  searchFileList,
  downLoadFile,
  uploadTempFile,
} from '@/api/sample/board/sampleBoardFile/index'
import { pageObject } from '@/js/common'
import SampleUploadFileDto, { SampleUploadFile } from '@/api/sample/board/sampleBoardFile/model'

interface CurrentParams {
  linkId: Nullable<number>
  keyword?: string
}

interface BoardFileState {
  pageInfo: PageInfo
  viewFiles: SampleUploadFileDto.Search.Row[]
  currentParams: CurrentParams
  fileList: {
    uploadFiles: SampleUploadFileDto.TempFile[]
    updateFiles: SampleUploadFile[]
    deleteFiles: SampleUploadFile[]
  }
}

export const useSampleBoardFileStore = defineStore('useSampleBoardFile', () => {
  const pageObj = pageObject()

  const state = reactive<BoardFileState>({
    pageInfo: pageObj.pageInfo,
    viewFiles: [],
    currentParams: {
      linkId: null,
      keyword: '',
    },
    fileList: {
      uploadFiles: [],
      updateFiles: [],
      deleteFiles: [],
    },
  })

  state.pageInfo.currentPageSize = 3

  function _responseFileData(data: SampleUploadFileDto.Search.Result) {
    state.viewFiles = data.list
    pageObj.setPageData(data.page)
  }

  function _responseAddFiles(data: SampleUploadFileDto.TempFile[]) {
    data.forEach((tFile: SampleUploadFileDto.TempFile) => {
      const vFile: SampleUploadFileDto.Search.Row = {
        id: null,
        ...tFile,
      }
      state.viewFiles.unshift(vFile)
      state.fileList.uploadFiles.push(tFile)
    })
  }

  function _setParams(params: CurrentParams) {
    state.currentParams = params
  }

  async function search(pageNo: number, size: number) {
    const data = merge(
      {
        size,
        pageNo,
      },
      state.currentParams,
    )

    const { data: result } = await searchFileList(data)
    _responseFileData(result)
  }

  function runSearch(params: CurrentParams) {
    _setParams(params)
    return search(1, state.pageInfo.currentPageSize)
  }

  function runPaging(pageNo: number) {
    return search(pageNo, state.pageInfo.currentPageSize)
  }

  async function uploadFile(files: FileList) {
    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append('files', file))
    const { data } = await uploadTempFile(formData)

    _responseAddFiles(data)
  }

  function updateFile(uFile) {
    if (uFile.id) {
      const target = state.fileList.updateFiles.find((file) => file.id === uFile.id)
      if (target) {
        target.typeCode = uFile.typeCode
      } else {
        state.fileList.updateFiles.push(uFile)
      }
    } else {
      const target = state.fileList.uploadFiles.find((file) => file.newName === uFile.newName)
      if (target) {
        target.typeCode = uFile.typeCode
      } else {
        state.fileList.uploadFiles.push(uFile)
      }
    }
  }

  function deleteFile(files) {
    files.forEach((file) => {
      if (file.id) {
        state.fileList.deleteFiles.push(file)
        state.fileList.updateFiles.splice(file, 1)
      } else {
        state.fileList.uploadFiles.splice(file, 1)
      }
      state.viewFiles.splice(file, 1)
    })
  }

  async function downLoad(file) {
    const { data } = await downLoadFile(file.id)
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', file.orgName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    ...toRefs(state),
    uploadFile,
    updateFile,
    deleteFile,
    runSearch,
    runPaging,
    downLoad,
  }
})
