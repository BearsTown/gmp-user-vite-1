<template>
  <el-container style="height: 100%">
    <el-header style="background-color: var(--el-color-primary-light-8)">
      <el-col :span="12" style="display: flex; justify-content: left">
        <label>첨부파일</label>
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: right" />
    </el-header>

    <el-main style="flex-direction: column; padding: 0px">
      <el-row style="width: 100%; padding-bottom: 5px">
        <el-col :span="4">
          <el-select
            v-model="pageInfo.currentPageSize"
            :disabled="boardStore.currentMode === FORM_MODE.EMPTY"
            placeholder="검색 건수"
            style="width: 100%"
          >
            <el-option
              v-for="item in pageSizeList"
              :key="item"
              :label="`${item}건`"
              :value="item"
            />
          </el-select>
        </el-col>

        <!--        <el-col :span="4">-->
        <!--          <el-select placeholder="타입" style="width: 100%;">-->
        <!--            <el-option label="strCombo" value="strCombo"/>-->
        <!--          </el-select>-->
        <!--        </el-col>-->
        <!--        -->

        <el-col :span="20">
          <el-input
            v-model="keyword"
            :disabled="boardStore.currentMode === FORM_MODE.EMPTY"
            :clearable="true"
            placeholder="검색어"
            class="input-with-select"
          >
            <template #append>
              <el-button
                :icon="Search"
                :disabled="boardStore.currentMode === FORM_MODE.EMPTY"
                @click="fileSearch"
              />
            </template>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="viewFiles" style="flex: 1">
        <el-table-column prop="num" align="center" label="번호" width="60" />
        <el-table-column prop="orgName" align="left" label="제목" />
        <el-table-column prop="typeCode" align="center" label="구분" width="200" />
        <el-table-column prop="ext" align="center" label="확장자" width="80" />
        <el-table-column prop="size" align="center" label="크기" width="100">
          <template #default="scope">
            {{ Util.formatBytes(scope.row.size) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="다운" width="60">
          <template #default="scope">
            <el-button link type="primary" @click.prevent="handleDownLoad(scope.$index, scope.row)">
              <el-icon style="vertical-align: middle">
                <Download />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
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
  import { onUnmounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { Search, Download } from '@element-plus/icons-vue'

  import { useSampleBoardStore } from '@/stores/sample/board/sample-board'
  import { useSampleBoardFileStore } from '@/stores/sample/board/sample-board-file'
  import { FORM_MODE } from '@/js/keys'
  import Util from '@/js/util'
  import SampleBoardDto from '@/api/sample/board/sampleBoard/model'

  const boardStore = useSampleBoardStore()
  const boardFileStore = useSampleBoardFileStore()

  const keyword = ref<string>('')

  /**
   * - ToDo : properies
   */
  const pageSizeList = [3, 5, 10, 15, 20]

  const { viewFiles, pageInfo } = storeToRefs(boardFileStore)

  onUnmounted(() => {
    boardFileStore.$reset()
  })

  function handleDownLoad(idx: number, row: SampleBoardDto.Search.Row) {
    boardFileStore.downLoad(row)
  }

  function handleCurrentChange(pageNo: number) {
    boardFileStore.runPaging(pageNo)
  }

  function _getFileSearchParams() {
    return {
      keyword: keyword.value,
      linkId: boardStore.boardId,
    }
  }

  function fileSearch() {
    boardFileStore.runSearch(_getFileSearchParams())
  }
</script>

<style scoped></style>
