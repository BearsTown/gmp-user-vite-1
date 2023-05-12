import { ref, computed, toRefs, reactive } from 'vue'

export const useSelectionBak = (api = (params) => Promise, keyName = '') => {
  const state = reactive({
    allList: [],
    selectedList: [],
    isSelectedAll: false,
  })

  const selectedListIds = computed(() => {
    let ids = []
    // state.selectedList.forEach((item) => ids.push(item[keyName]))
    return ids
  })

  async function requestApi() {
    try {
      const { data } = await api({})
      state.allList = data
    } catch (error) {
      console.log(error)
    }
  }

  function selectAll() {
    if (state.allList.length !== state.selectedList.length) {
      state.selectedList = [...state.allList]
    }

    checkSelectedAll()
    // state.selectedList.forEach((item) => {
    //   item['isSelected'] = state
    // })
  }

  function selectReverse(use) {
    checkSelectedAll()
  }

  function checkSelectedAll() {
    if (state.selectedList.length === 0) {
      state.isSelectedAll = false
      return
    }
    state.isSelectedAll = state.allList.length === state.selectedList.length
  }

  function selectionChange(list) {
    state.selectedList = list

    list.forEach((item) => {
      // item['isSelected'] = state
      // console.log(item)
    })

    checkSelectedAll()
  }

  function clearSelection() {
    if (state.selectedList.length > 0) {
      state.selectedList = []
    }

    // states.isAllSelected = false;
    // const oldSelection = states.selection;
    // if (oldSelection.length) {
    //   states.selection = [];
    //   this.table.$emit('selection-change', []);
    // }
  }

  // function selectionChange(list) {
  //   state.selectedList = []
  //   debugger
  //   const newList = []
  //   list.forEach((item) => {
  //     const find = state.allList.find((n) => n[valueName] === item)
  //     if (find) {
  //       newList.push(find)
  //     }
  //   })
  //   state.selectedList = newList
  //   checkSelectedAll()
  // }

  return {
    ...toRefs(state),
    requestApi,
    selectAll,
    selectReverse,
    clearSelection,
    selectedListIds,
    selectionChange,
  }
}
