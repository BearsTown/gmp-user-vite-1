<template>
  <el-card>
    <el-form
      label-position="top"
      label-width="100px"
      :model="selectedCode"
      style="min-width: 460px"
    >
      <el-row :gutter="20" style="padding-bottom: 5px">
        <el-col :span="12">
          <el-space fill>
            <el-alert :type="selectedCode.useYn == 'Y' ? 'success' : 'error'" :closable="false">
              <p style="font-size: 15px; font-weight: bold">{{ selectedCode.codeName }}</p>
            </el-alert>
          </el-space>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-button
            v-if="selectedCode != null"
            type="primary"
            size="small"
            @click="modifyCodeView"
          >
            수정
          </el-button>
          <el-button
            v-if="selectedCode != null"
            type="warning"
            size="small"
            @click="removeSelectedCode"
          >
            <el-icon><Delete /></el-icon>삭제
          </el-button>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        style="padding-top: 10px; border-top: 1px solid rgba(220, 223, 230, 0.6)"
      >
        <el-col :span="5">
          <el-form-item label="부모 코드">
            {{ selectedCode.parentCode == null ? '-' : selectedCode.parentCode }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="코드">
            {{ selectedCode.code }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="코드 설명">
            {{ selectedCode.codeDesc }}
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="코드 값">
            {{ selectedCode.codeVal }}
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="사용여부">
            <el-tag v-if="selectedCode.useYn == 'N'" size="small" type="danger"> 미사용 </el-tag>
            <el-tag v-else-if="selectedCode.useYn === 'Y'" size="small"> 사용 </el-tag>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>

  <el-dialog
    v-model="modifyCodeDialog"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    width="30%"
    top="28vh"
    title="코드 수정"
  >
    <el-form ref="modifyFormRef" :model="modifyCodeForm" :rules="rules" label-width="100px">
      <el-form-item label="코드명" prop="codeName">
        <el-input v-model="modifyCodeForm.codeName" autocomplete="off" placeholder="코드명" />
      </el-form-item>
      <el-form-item label="코드설명" prop="codeDesc">
        <el-input v-model="modifyCodeForm.codeDesc" autocomplete="off" placeholder="코드설명" />
      </el-form-item>
      <el-form-item label="코드값" prop="codeVal">
        <el-input v-model="modifyCodeForm.codeVal" autocomplete="off" placeholder="코드값" />
      </el-form-item>
      <el-form-item label="사용여부" prop="useYn">
        <el-switch v-model="modifyCodeForm.useYn" active-value="Y" inactive-value="N" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modifyCodeDialog = false">취소</el-button>
        <el-button type="primary" @click="modifyCode">수정</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { useCodeStore } from '@/stores/admin/code'
  import { storeToRefs } from 'pinia'
  import { getCurrentInstance, ref } from 'vue'
  import { cloneDeep } from 'lodash'
  const { proxy } = getCurrentInstance()

  const codeStore = useCodeStore()

  const { selectedCode, codeTree, codeTreeRef } = storeToRefs(codeStore)
  const modifyCodeDialog = ref(false)
  const modifyCodeForm = ref({
    code: '',
    codeName: '',
    codeDesc: '',
    codeVal: '',
    useYn: '',
  })
  const modifyFormRef = ref({})

  const rules = {
    codeName: [{ required: true, message: '코드명을 입력하세요', trigger: 'blur' }],
  }

  function modifyCodeView() {
    modifyCodeForm.value = cloneDeep(selectedCode.value)
    modifyCodeDialog.value = true
  }

  function modifyCode() {
    modifyFormRef.value.validate((valid, fields) => {
      if (valid) {
        const _children = selectedCode.value.children
        codeStore
          .modifyCode(modifyCodeForm.value)
          .then((res) => {
            proxy.$successMessage('수정되었습니다.')
            modifyCodeDialog.value = false

            //결과 세팅
            selectedCode.value = res
            selectedCode.value.children = _children
          })
          .catch((err) => {
            console.log(err)
            proxy.$errorMessage('처리 중 에러가 발생했습니다.')
          })
      } else {
        return false
      }
    })
  }

  function removeSelectedCode() {
    proxy
      .$confirm('삭제 하시겠습니까?', '', {
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      })
      .then(() => {
        // console.log(codeTreeRef.value)
        codeStore
          .removeCode()
          .then(() => {
            proxy.$successMessage('선택한 코드를 삭제했습니다.')
          })
          .catch((err) => {
            console.log(err)
            if (err.response.status === 409) {
              proxy.$errorMessage('하위 코드가 존재해서 삭제 할 수 없습니다.')
            } else {
              proxy.$errorMessage('삭제 처리 도중 에러가 발생했습니다.')
            }
          })
      })
  }
</script>

<style scoped>
  :deep .el-form-item__label {
    color: #909399 !important;
    font-weight: bold;
  }
</style>
