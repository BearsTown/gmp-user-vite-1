<template>
  <el-container style="height: 100%">
    <el-header style="background-color: var(--el-color-primary-light-8)">
      <el-col :span="12" style="display: flex; justify-content: left">
        <label>첨부파일</label>
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: right">
        <input
          ref="file"
          type="file"
          multiple
          style="visibility: hidden"
          @change="handleFileInputChange"
        />
        <el-button circle type="primary" @click="handleSelectFile">
          <el-icon style="vertical-align: middle">
            <Plus />
          </el-icon>
        </el-button>
        <el-button
          circle
          type="danger"
          :disabled="multipleSelection.length < 1"
          @click="handleDeleteFile"
        >
          <el-icon style="vertical-align: middle">
            <DeleteFilled />
          </el-icon>
        </el-button>
      </el-col>
    </el-header>

    <el-table
      ref="fileTableRef"
      :data="viewFiles"
      style="flex: 1"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40" />
      <!--      <el-table-column prop="num" align="center" label="번호" width="60"/>-->
      <el-table-column prop="orgName" align="left" label="제목" />
      <el-table-column prop="orgName" align="center" label="구분" width="200">
        <template #default="scope">
          <el-select
            v-model="scope.row.typeCode"
            placeholder="구분"
            @change="handleFileType(scope.$index, scope.row)"
          >
            <el-option label="파일" value="file" />
            <el-option label="기타" value="etc" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="ext" align="center" label="확장자" width="80" />
      <el-table-column prop="size" align="center" label="크기" width="100">
        <template #default="scope">
          {{ Util.formatBytes(scope.row.size) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="삭제" width="60">
        <template #default="scope">
          <el-button link type="danger" @click.prevent="deleteRow(scope.$index, scope.row)">
            <el-icon style="vertical-align: middle">
              <DeleteFilled />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    <el-footer>-->
    <!--      <el-pagination-->
    <!--          :small="true"-->
    <!--          :total="pageInfo.totalCount"-->
    <!--          :page-size="pageInfo.pageSize"-->
    <!--          :current-page="pageInfo.pageNo"-->
    <!--          @current-change="handleCurrentChange"-->
    <!--          @selection-change="handleSelectionChange"-->
    <!--          layout="prev, pager, next">-->
    <!--      </el-pagination>-->
    <!--    </el-footer>-->
    <!--    -->
  </el-container>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'
  import { Plus, DeleteFilled } from '@element-plus/icons-vue'
  import { storeToRefs } from 'pinia'
  import { ElTable } from 'element-plus'

  import { useSampleBoardStore } from '@/stores/sample/board/sample-board'
  import { useSampleBoardFileStore } from '@/stores/sample/board/sample-board-file'
  import { FORM_MODE } from '@/js/keys'
  import Util from '@/js/util'
  import SampleUploadFileDto from '@/api/sample/board/sampleBoardFile/model'

  const boardStore = useSampleBoardStore()
  const boardFileStore = useSampleBoardFileStore()

  const { viewFiles } = storeToRefs(boardFileStore)

  const file = ref<HTMLInputElement>()
  const fileTableRef = ref<InstanceType<typeof ElTable>>()
  const multipleSelection = ref<SampleUploadFileDto.Search.Row[]>([])

  onMounted(() => {
    if (boardStore.currentMode === FORM_MODE.NEW) {
      boardFileStore.$reset()
    } else if (boardStore.currentMode === FORM_MODE.EDIT) {
      /**
       * - ToDo :
       */
      boardFileStore.pageInfo.currentPageSize = 999
      boardFileStore.runSearch({
        linkId: boardStore.boardId,
      })
    }
  })

  onUnmounted(() => {
    boardFileStore.$reset()
  })

  function handleFileType(idx: number, row: SampleUploadFileDto.Search.Row) {
    console.log(row)
    boardFileStore.updateFile(row)
  }

  function handleDeleteFile() {
    const delList = fileTableRef.value!.getSelectionRows()
    deleteFile(delList)
  }

  function handleSelectionChange(val) {
    multipleSelection.value = val
    console.log(multipleSelection.value)
  }

  function handleSelectFile() {
    file.value!.click()
  }

  function handleFileInputChange(e) {
    let files = e.target.files
    console.log(files)
    boardFileStore.uploadFile(files)
  }

  function deleteRow(idx, row) {
    deleteFile([row])
  }

  function deleteFile(delList) {
    boardFileStore.deleteFile(delList)
    fileTableRef.value!.clearSelection()
    fileTableRef.value!.setScrollTop(0)
  }
</script>

<style scoped></style>
