import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { merge } from 'lodash'

import { pageObject } from '@/js/common'
import { searchBoardList } from '@/api/sample/board/sampleBoard/index'
import SampleBoardDto from '@/api/sample/board/sampleBoard/model'

interface CurrentParams {
  keyword?: string
}

interface SearchState {
  pageInfo: PageInfo
  boardList: SampleBoardDto.Search.Row[]
  currentParams: CurrentParams
}

export const useSampleBoardSearchStore = defineStore('useSampleBoardSearch', () => {
  const pageObj = pageObject()

  const state = reactive<SearchState>({
    pageInfo: pageObj.pageInfo,
    boardList: [],
    currentParams: {
      keyword: '',
    },
  })

  function _responseBoardData(data: SampleBoardDto.Search.Result) {
    state.boardList = data.list
    pageObj.setPageData(data.page)
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

    const { data: result } = await searchBoardList(data)
    _responseBoardData(result)
  }

  function runSearch(params: CurrentParams) {
    _setParams(params)
    return search(1, state.pageInfo.currentPageSize)
  }

  function runPaging(pageNo: number) {
    return search(pageNo, state.pageInfo.currentPageSize)
  }

  return {
    ...toRefs(state),
    runSearch,
    runPaging,
  }
})
