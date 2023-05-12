import { defineStore } from 'pinia'
import codeService from '@/api/codeService'

import { reactive, ref, toRefs } from 'vue'
import { cloneDeep, findIndex } from 'lodash'
import commonUtil from '@/utils/commonUtil'

export const useCodeStore = defineStore('code', () => {
  const state = reactive({
    selectedCode: {},
    codeTree: [],
    codeTreeRef: {},
  })

  function getCodeList(parentCode) {
    return new Promise((resolve, reject) => {
      codeService
        .getCodeList(parentCode)
        .then((res) => {
          const codeListResult = res.data
          const list = codeListResult.map((code) => {
            code.children = [{}]
            return code
          })
          resolve(list)
        })
        .catch(reject)
    })
  }

  function addCode(param) {
    return new Promise((resolve, reject) => {
      codeService
        .addNewCode(param)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }

  function modifyCode(param) {
    return new Promise((resolve, reject) => {
      codeService
        .modifyCode(param)
        .then((res) => {
          updateSelectedCodeInfo(res.data)
          resolve(res.data)
        })
        .catch(reject)
    })
  }

  /**
   * 코드 수정 후 tree 데이터 update
   * @param {*} modified
   */
  function updateSelectedCodeInfo(modified) {
    const code = state.selectedCode.code
    const codeObj = commonUtil.getObject(state.codeTree, 'code', code)

    if (codeObj) {
      Object.keys(modified).forEach((key) => {
        codeObj[key] = cloneDeep(modified[key])
      })
    }
    state.selectedCode = cloneDeep(codeObj)
  }

  function removeCode() {
    const code = state.selectedCode.code

    return new Promise((resolve, reject) => {
      codeService
        .removeCode(code)
        .then(() => {
          //코드트리에서 트리 삭제
          state.codeTreeRef.remove(state.selectedCode)
          resolve(code)
        })
        .catch(reject)
    })
  }

  function changeCodePriority() {
    const param = state.selectedCode.children.map((obj, idx) => {
      console.log(obj)
      return {
        code: obj.code,
        sortSn: idx + 1,
      }
    })

    return new Promise((resolve, reject) => {
      codeService.changeCodePriority(param).then(resolve).catch(reject)
    })
  }

  return {
    ...toRefs(state),
    getCodeList,
    addCode,
    modifyCode,
    removeCode,
    changeCodePriority,
  }
})
