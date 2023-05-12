<template>
  <el-aside class="code-tree__con">
    <div class="sub-header">
      <div>
        <span>코드 목록</span>
      </div>
      <div>
        <el-button type="primary" size="small" @click="addCodeF">코드 추가 </el-button>
        <!-- <el-button
                type="primary" size="small"
                           v-if="!editTree"
                           @click="editTree=true">코드 트리 편집
                </el-button>
                <el-button
                type="primary" size="small"
                           v-if="editTree"
                           @click="editTree=false">편집 완료
                </el-button> -->
      </div>
    </div>
    <el-tree
      ref="codeTreeRef"
      :highlight-current="true"
      :data="codeTree"
      :props="defaultProps"
      :load="loadNode"
      node-key="code"
      lazy
      accordion
      @node-click="handleNodeClick"
    />
  </el-aside>

  <el-dialog
    v-model="addCodeDialog"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    width="30%"
    top="28vh"
    title="코드 추가"
  >
    <el-form ref="modifyRef" :model="newCodeForm" :rules="rules" label-width="100px">
      <el-form-item label="상위코드" prop="parentCodeType">
        <el-select v-model="newCodeForm.parentCodeType" placeholder="최상위 코드로 생성">
          <el-option label="최상위 코드로 생성" value="ROOT">최상위 코드로 생성</el-option>
          <el-option label="선택된 코드 하위에 생성" value="NODE"
            >선택된 코드 하위에 생성</el-option
          >
        </el-select>
        <span style="padding-left: 10px" v-if="newCodeForm.parentCodeType === 'NODE'">
          선택된 코드: {{ selectedCodeId }}
        </span>
      </el-form-item>
      <el-form-item label="코드" prop="code">
        <el-input v-model="newCodeForm.code" autocomplete="off" placeholder="코드" />
      </el-form-item>
      <el-form-item label="코드명" prop="codeName">
        <el-input v-model="newCodeForm.codeName" autocomplete="off" placeholder="코드명" />
      </el-form-item>
      <el-form-item label="코드설명" prop="codeDesc">
        <el-input v-model="newCodeForm.codeDesc" autocomplete="off" placeholder="코드설명" />
      </el-form-item>
      <el-form-item label="코드값" prop="codeVal">
        <el-input v-model="newCodeForm.codeVal" autocomplete="off" placeholder="코드값" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addCodeDialog = false">취소</el-button>
        <el-button type="primary" @click="addCode()">추가</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
  import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
  import { useCodeStore } from '@/stores/admin/code'
  import { storeToRefs } from 'pinia'
  const editTree = ref(false)
  const selectedCodeId = ref('')

  const codeStore = useCodeStore()
  const { selectedCode, codeTree, codeTreeRef } = storeToRefs(codeStore)
  const { proxy } = getCurrentInstance()
  const newCodeForm = reactive({
    parentCodeType: 'ROOT',
    parentCode: '',
    code: '',
    codeName: '',
    codeDesc: '',
    codeVal: '',
    useYn: 'Y',
  })
  const addCodeDialog = ref(false)
  const modifyRef = ref({})
  // const codeTreeRef = ref({});

  const rules = {
    code: [{ required: true, message: '코드를 입력하세요', trigger: 'blur' }],
    codeName: [{ required: true, message: '코드명을 입력하세요', trigger: 'blur' }],
  }

  function addCodeF() {
    newCodeForm.parentCodeType = 'ROOT'
    newCodeForm.parentCode = ''
    newCodeForm.code = ''
    newCodeForm.codeName = ''
    newCodeForm.codeDesc = ''
    newCodeForm.codeVal = ''
    addCodeDialog.value = true
  }

  function addCode() {
    modifyRef.value.validate((valid, fields) => {
      if (valid) {
        if (newCodeForm.parentCodeType === 'ROOT') {
          newCodeForm.parentCode = null
        } else {
          newCodeForm.parentCode = selectedCodeId.value
        }

        codeStore
          .addCode(newCodeForm)
          .then((res) => {
            proxy.$successMessage('저장되었습니다.')
            addCodeDialog.value = false
            addNewCodeOnTree(res)
          })
          .catch((err) => {
            console.log(err)
            if (err.response.status === 409) {
              proxy.$errorMessage('중복된 코드값이 존재합니다.')
            } else {
              proxy.$errorMessage('처리 중 에러가 발생했습니다.')
            }
          })
      } else {
        return false
      }
    })
  }

  function addNewCodeOnTree(code) {
    if (code.parentCode === null) {
      codeTree.value.push(code)
    } else {
      const node = codeTreeRef.value.getCurrentNode()
      if (!node.children) {
        node.children = []
      } else {
        node.children.push(code)
      }
      codeTreeRef.value.append(code, node)
    }
  }

  function handleNodeClick(data) {
    selectedCode.value = data
  }

  function loadNode(node, resolve) {
    if (node.id !== 0 && node.data) {
      selectedCodeId.value = node.data.code
      const isLoaded = node.data.isLoaded
      const children = node.data.children

      if (isLoaded) {
        if (children && children.length > 0) {
          resolve(children)
        } else {
          resolve([])
        }
      } else {
        const codeId = node.data.code
        codeStore.getCodeList(codeId).then((res) => {
          node.data.isLoaded = true
          node.data.children = res

          resolve(res)
        })
      }
    }
  }

  const defaultProps = {
    label: 'codeName',
    children: 'children',
  }

  onMounted(() => {
    codeStore
      .getCodeList(0)
      .then((res) => {
        console.log('codeTree Mount')
        const firstCode = res[0]
        selectedCodeId.value = firstCode.code
        selectedCode.value = firstCode
        codeTree.value = res

        return codeStore.getCodeList(firstCode.code)
      })
      .then((res) => {
        selectedCode.value.children = res

        codeTreeRef.value.setCurrentKey(selectedCodeId.value)
      })
      .catch((err) => {
        console.log(err)
        proxy.$errorMessage('코드 정보 중에 오류가 발생했습니다. ')
      })
  })
</script>
<style scoped>
  .sub-header {
    padding: 6px 15px;
    background-color: #eeeeee;
    display: flex;
    justify-content: space-between;
  }

  .sub-header > div > span {
    display: block;
    float: left;
    font-size: 13px;
    line-height: 27px;
  }

  .search-input {
    display: flex;
    padding: 6px 5px 7px 5px;
    border-top: 1px solid #e0e0e0;
  }

  .code-tree__con {
    display: flex;
    flex-direction: column;
    width: 330px !important;
    border-right: 1px solid #e0e0e0;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
  }
  :deep .el-tree-node__content {
    padding-top: 3px !important;
    padding-bottom: 3px !important;
  }

  :deep .el-tree {
    overflow-x: auto;
    height: 100%;
  }

  :deep .el-tree-node > .el-tree-node__children {
    overflow: inherit;
  }

  .node {
    font-size: 13px;
    color: #303133;
    margin: 10px;
  }
</style>
