<template>
  <el-container style="height: 100%">
    <el-header style="justify-content: left; background-color: var(--el-color-primary-light-8)">
      <label>목록</label>
    </el-header>

    <el-main style="flex-direction: column; padding: 5px">
      <el-row style="padding-bottom: 5px">
        <el-col :span="6">
          <el-select v-model="pageInfo.currentPageSize" placeholder="검색 건수">
            <el-option
              v-for="item in pageSizeList"
              :key="item"
              :label="`${item}건`"
              :value="item"
            />
          </el-select>
        </el-col>

        <el-col :span="18">
          <el-input
            v-model="keyword"
            :clearable="true"
            placeholder="검색어"
            class="input-with-select"
          >
            <template #append>
              <el-button :icon="Search" @click="boardSearch" />
            </template>
          </el-input>
        </el-col>
      </el-row>

      <el-table
        :data="boardList"
        highlight-current-row
        style="height: 100%"
        @current-change="handleTableCurrentChange"
      >
        <el-table-column prop="num" align="center" label="번호" width="60" />
        <el-table-column prop="strInput" align="left" label="제목" />
      </el-table>
    </el-main>

    <el-footer style="background-color: var(--el-color-white)">
      <el-pagination
        :small="true"
        :total="pageInfo.totalCount"
        :page-size="pageInfo.pageSize"
        :current-page="pageInfo.pageNo"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
  import { ref, onUnmounted } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import { storeToRefs } from 'pinia'

  import { useSampleBoardStore } from '@/stores/sample/board/sample-board'
  import { useSampleBoardSearchStore } from '@/stores/sample/board/sample-board-search'
  import { useSampleBoardDetailsStore } from '@/stores/sample/board/sample-board-form'
  import { useSampleBoardFileStore } from '@/stores/sample/board/sample-board-file'

  import { FORM_MODE } from '@/js/keys'

  const boardStore = useSampleBoardStore()
  const boardSearchStore = useSampleBoardSearchStore()
  const boardDetailsStore = useSampleBoardDetailsStore()
  const boardFileStore = useSampleBoardFileStore()

  /**
   * - ToDo : properies
   */
  const pageSizeList = [5, 10, 15, 20, 25, 30, 50]

  const { boardList, pageInfo } = storeToRefs(boardSearchStore)

  onUnmounted(() => {
    boardSearchStore.$reset()
  })

  function _getBoardSearchParams() {
    return {
      keyword: keyword.value,
    }
  }

  function boardSearch() {
    boardSearchStore.runSearch(_getBoardSearchParams())
  }

  function handleCurrentChange(pageNo: number) {
    boardSearchStore.runPaging(pageNo)
  }

  const keyword = ref<string>('')

  function handleTableCurrentChange(row) {
    if (!row) return false

    // if (boardStore.isWrite()) {
    //
    // }

    boardStore.setBoardId(row.id)
    boardStore.setCurrentMode(FORM_MODE.VIEW)
    boardDetailsStore.getDetails(row.id)
    boardFileStore.runSearch({
      linkId: row.id,
    })
  }

  defineExpose({
    boardSearch,
  })
</script>

<style scoped></style>
