<template>
  <el-card>
    <el-row :gutter="20" style="padding-top: 10px">
      <el-col :span="12" style="font-weight: bold">하위코드 목록</el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" size="small" v-if="!editList" @click="editList = true"
          >코드 순서 편집
        </el-button>
        <el-button type="primary" size="small" v-if="editList" @click="changeCodePriority"
          >편집 완료
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="padding-top: 10px">
      <div class="node-row header-c">
        <div style="text-align: left; flex-grow: 1">
          <span style="padding-left: 30px">코드</span>
        </div>
        <div style="text-align: left; flex-grow: 2">
          <span style="padding-left: 30px">코드명</span>
        </div>
        <div style="text-align: left; flex-grow: 3">
          <span style="padding-left: 30px">코드 설명</span>
        </div>
        <div style="text-align: left; flex-grow: 1">
          <span style="padding-left: 30px">코드 값</span>
        </div>
        <div style="text-align: center; flex-grow: 1">
          <span>사용여부</span>
        </div>
        <div style="text-align: right; flex-grow: 1">
          <span style="padding-right: 20px"> </span>
        </div>
      </div>
    </el-row>
    <!-- <div class="code-list" > -->
    <el-row :gutter="20" style="padding-top: 10px">
      <draggable
        v-model="selectedCode.children"
        handle=".handle"
        item-key="code"
        style="width: 100%"
      >
        <template #item="{ element }">
          <div class="node-row">
            <div style="flex-grow: 1; text-align: left">
              <span style="padding-left: 30px">{{ element.code }}</span>
            </div>
            <div style="flex-grow: 2; text-align: left">
              <span style="padding-left: 30px">{{ element.codeName }}</span>
            </div>
            <div style="flex-grow: 3; text-align: left">
              <span style="padding-left: 30px">{{ element.codeDesc }}</span>
            </div>
            <div style="flex-grow: 1; text-align: left">
              <span style="padding-left: 30px">{{ element.codeVal }}</span>
            </div>
            <div style="flex-grow: 1; text-align: center">
              <!-- <el-form-item style="text-align: center;"> -->
              <el-tag class="ml-2" v-if="element.useYn == 'N'" size="small" type="danger">
                미사용
              </el-tag>
              <el-tag class="ml-2" v-else-if="element.useYn === 'Y'" size="small"> 사용 </el-tag>
              <!-- </el-form-item> -->
            </div>
            <div style="flex-grow: 1; text-align: right">
              <span v-if="editList" style="padding-right: 20px" class="handle">
                <el-icon><DCaret /></el-icon>
              </span>
            </div>
          </div>
        </template>
      </draggable>
    </el-row>
    <div class="node-row" v-if="!selectedCode.children || selectedCode.children.length === 0">
      <div style="flex: 1; text-align: center">
        <span>하위 코드 정보가 없습니다. </span>
      </div>
    </div>
    <!-- </div> -->
  </el-card>
</template>
<script setup>
  import { useCodeStore } from '@/stores/admin/code'
  import { storeToRefs } from 'pinia'
  import { getCurrentInstance, ref } from 'vue'
  import draggable from 'vuedraggable'
  const { proxy } = getCurrentInstance()

  const codeStore = useCodeStore()
  const editList = ref(false)
  const drag = ref(false)
  const editSortCode = ref([])

  const { selectedCode } = storeToRefs(codeStore)

  function handleChange(obj) {
    editSortCode.value = editSortCode.value.filter((a) => a.code != obj.code)
    editSortCode.value.push(obj)
  }

  function changeCodePriority() {
    editList.value = false
    codeStore
      .changeCodePriority()
      .then(() => {
        proxy.$successMessage('코드 순서를 수정했습니다.')
      })
      .catch((err) => {
        console.log(err)
        proxy.$errorMessage('코드 정보 수정 중에 오류가 발생했습니다.')
      })
  }
</script>

<style scoped>
  .header-c {
    color: #909399 !important;
    font-weight: bold;
  }
  .code-list {
    width: 100%;
    background-color: #ffffff;
    overflow: auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px !important;
    margin-top: 15px;
  }

  .node-row {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid rgba(220, 223, 230, 0.6);
  }

  .node-row > div {
    flex: 1;
    text-align: center;
    padding: 12px 0;
    font-size: 14px;
  }

  .node-row:hover {
    background-color: #eef2fa !important;
    cursor: pointer;
  }

  .node-row > div > span {
    line-height: 30px;
    padding: 0px 10px;
    word-break: break-all;
  }
</style>
