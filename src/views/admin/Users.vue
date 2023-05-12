<template>
  <div class="colFlex">
    <div class="subHeader">
      <div style="line-height: 50px">
        <el-input
          v-model="searchValue"
          placeholder="검색어를 입력하세요"
          class="input-with-select"
          @keyup.enter="searchUser"
          @clear="searchUser"
          clearable
        >
          <template #prepend>
            <el-select
              v-model="state"
              @change="alignState"
              collapse-tagsplaceholder="Select"
              style="width: 115px"
            >
              <el-option
                v-for="item in stateOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <template #append>
            <el-button @click="searchUser"
              ><el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>
      </div>

      <div style="line-height: 50px">
        <span v-if="isTableBtnView">
          <el-button @click="tableDownloadVisible = true" size="small">
            <el-icon><Download /></el-icon>템플릿 다운로드
          </el-button>
          <el-button @click="tableUploadVisible = true" size="small">
            <el-icon><Upload /></el-icon>일괄 업로드
          </el-button>
        </span>
        <el-button type="success" size="small" @click="changeState('approve')">
          <el-icon><User /></el-icon>승인처리
        </el-button>
        <el-button type="danger" size="small" @click="changeState('lock')">
          <el-icon><Lock /></el-icon>잠금
        </el-button>
        <el-button type="primary" size="small" @click="changeState('unlock')">
          <el-icon><Unlock /></el-icon>잠금해제
        </el-button>
        <el-button type="warning" size="small" @click="changeState('delete')">
          <el-icon><Delete /></el-icon>사용자삭제
        </el-button>
      </div>
    </div>

    <user-table
      style="flex: 1"
      :user-list="userList"
      @handle-selection-change="handleSelectionChange"
      @init-pass="initPass"
      @open-modify-dialog="openModifyDialog"
    />

    <div class="page">
      <span class="totalLabel"> 총 {{ pageInfo.totalCount }}건 </span>
      <el-pagination
        @current-change="getActivePage"
        style="padding: 0"
        layout="prev, pager, next"
        :total="pageInfo.totalCount"
        :page-size="pageInfo.pageSize"
      />
    </div>

    <el-dialog
      v-model="modifyUserDialog"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="30%"
      top="28vh"
      title="사용자 정보수정"
    >
      <el-form ref="modifyRef" :model="modifyUser" :rules="rules" label-width="100px">
        <el-form-item label="이름" prop="userName">
          <el-input v-model="modifyUser.userName" autocomplete="off" placeholder="사용자 이름" />
        </el-form-item>
        <el-form-item label="이메일" prop="email">
          <el-input v-model="modifyUser.email" autocomplete="off" placeholder="이메일" />
        </el-form-item>
        <el-form-item label="권한" prop="userRole">
          <el-select v-model="modifyUser.userRole" placeholder="사용자 권한">
            <el-option
              v-for="item in roleOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modifyUserDialog = false">취소</el-button>
          <el-button type="primary" @click="modifySave(modifyRef)">수정</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
  import { ref, onMounted, getCurrentInstance, reactive } from 'vue'
  import { cloneDeep } from 'lodash'
  import userTable from '@/components/admin/UserTable.vue'
  import { useUsersStore } from '@/stores/admin/users'
  import { storeToRefs } from 'pinia'
  const { proxy } = getCurrentInstance()

  const store = useUsersStore()
  const { userList, pageInfo } = storeToRefs(store)

  let stateOption = [
    {
      value: 3,
      label: '전체',
    },
    {
      value: 2,
      label: '승인대기',
    },
    {
      value: 1,
      label: '정상',
    },
    {
      value: 0,
      label: '잠김',
    },
  ]

  let roleOption = [
    {
      value: 'R9000',
      label: '관리자',
    },
    {
      value: 'R0001',
      label: '사용자',
    },
  ]

  let searchValue = ref('')
  let state = ref(3)
  let selectUsers = reactive([])
  let modifyUser = reactive({})
  let tableDownloadVisible = ref(false)
  let tableUploadVisible = ref(false)
  let isTableBtnView = ref(false)
  let modifyUserDialog = ref(false)
  let modifyRef = ref()

  let rules = reactive({
    userName: [
      {
        required: true,
        message: '아이디를 입력하세요.',
        trigger: 'blur',
      },
    ],
    email: [{ validator: validateEmail, trigger: 'blur' }],
    userRole: [
      {
        required: true,
        message: '권한을 선택하세요.',
        trigger: 'blur',
      },
    ],
  })

  function validateEmail(rule, value, callback) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}$/i

    if (value != null && !regExp.test(value)) {
      callback(new Error('이메일 주소 형식을 확인하십시오.'))
    } else {
      callback()
    }
  }

  function alignState(val) {
    switch (val) {
      case 0: {
        store.roleYn = null
        store.lock = true
        break
      }
      case 1: {
        store.lock = null
        store.roleYn = 'Y'
        break
      }
      case 2: {
        store.lock = null
        store.roleYn = 'N'
        break
      }
      case 3: {
        store.lock = null
        store.roleYn = null
        break
      }
      default:
        break
    }
    searchUser()
  }

  function searchUser() {
    store.keyword = searchValue.value
    store.getUserList()
  }

  function getActivePage(curPage) {
    store.pageInfo.pageNo = curPage
    searchUser()
  }

  function handleSelectionChange(val) {
    selectUsers = val
  }

  function initPass(loginId) {
    proxy
      .$confirm(
        '비밀번호 초기화 하시겠습니까?<br><span style="font-size:9pt">(사용자 아이디로 초기화 됩니다)</span>',
        '',
        true,
      )
      .then(() => {
        store
          .initPassword(loginId)
          .then(() => {
            proxy.$successMessage('초기화되었습니다.')
          })
          .catch(() => {
            proxy.$errorMessage('초기화중에 오류가 발생했습니다.')
          })
      })
  }

  function openModifyDialog(user) {
    modifyUser = reactive(cloneDeep(user))
    modifyUserDialog.value = true
  }

  function modifySave(formName) {
    formName.validate((valid, fields) => {
      if (valid) {
        store
          .modifyUser(modifyUser)
          .then(() => {
            proxy.$successMessage('수정되었습니다.')
            searchUser()
            modifyUserDialog.value = false
          })
          .catch((err) => {
            if (err.response.status === 409) {
              proxy.$errorMessage(err.response.data)
            } else {
              proxy.$errorMessage('수정 처리 중 에러가 발생했습니다.')
            }
          })
      } else {
        return false
      }
    })
  }

  function changeState(type) {
    if (selectUsers.length == 0) {
      proxy.$errorMessage('선택된 사용자가 없습니다.')
    } else {
      switch (type) {
        case 'lock': {
          const _userList = selectUsers.filter((a) => !a.lock)
          if (checkConfirm(_userList)) {
            proxy.$confirm('잠금 하시겠습니까?').then(() => {
              const _param = {
                lock: true,
                userList: _userList.map((a) => a.loginId),
              }
              store
                .updateLock(_param)
                .then(() => {
                  proxy.$successMessage('수정되었습니다.')
                  searchUser()
                })
                .catch(() => {
                  proxy.$errorMessage('수정중에 에러가 발생했습니다.')
                })
            })
          }

          break
        }
        case 'unlock': {
          const _userList = selectUsers.filter((a) => a.lock)
          if (checkConfirm(_userList)) {
            proxy.$confirm('잠금하제 하시겠습니까?').then(() => {
              const _param = {
                lock: false,
                userList: _userList.map((a) => a.loginId),
              }
              store
                .updateLock(_param)
                .then(() => {
                  proxy.$successMessage('수정되었습니다.')
                  searchUser()
                })
                .catch(() => {
                  proxy.$errorMessage('수정중에 에러가 발생했습니다.')
                })
            })
          }
          break
        }
        case 'approve': {
          const _userList = selectUsers.filter((a) => a.roleYn == 'N')
          if (checkConfirm(_userList, '승인')) {
            proxy.$confirm('승인 하시겠습니까?').then(() => {
              const _param = {
                roleYn: 'Y',
                userList: _userList.map((a) => a.loginId),
              }
              store
                .updateApprove(_param)
                .then(() => {
                  proxy.$successMessage('승인되었습니다.')
                  searchUser()
                })
                .catch(() => {
                  proxy.$errorMessage('승인중에 에러가 발생했습니다.')
                })
            })
          }
          break
        }
        case 'delete': {
          if (checkConfirm(selectUsers, '삭제')) {
            const userList = selectUsers.map((a) => a.loginId)

            proxy.$confirm('삭제 하시겠습니까?').then(() =>
              store
                .deleteUser(userList)
                .then(() => {
                  proxy.$successMessage('삭제되었습니다.')
                  searchUser()
                })
                .catch(() => {
                  proxy.$errorMessage('삭제중에 에러가 발생했습니다.')
                }),
            )
          }
          break
        }
        default:
          proxy.$errorMessage('취소되었습니다.')
          break
      }
    }
  }

  var checkConfirm = function (userList, msg) {
    if (userList.length == 0) {
      proxy.$errorMessage('처리가능한 사용자가 없습니다.')
      return false
    } else {
      return true
    }
  }

  onMounted(() => {
    store.getUserList()
  })
</script>
<style scoped>
  .colFlex {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .subHeader {
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  :deep .el-input--small .el-input__icon {
    line-height: 30px;
  }
  .page {
    text-align: center;
    padding: 15px 10px;
    background-color: white;
  }
  :deep .el-dialog__body {
    padding: 10px;
  }

  .totalLabel {
    float: left;
    font-size: 14px;
    line-height: 30px;
  }

  .label {
    font-size: 13px;
    color: #aaa;
    margin-bottom: 0;
  }

  .upload-form {
    padding: 20px 15px;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin: 0 10px;
  }
  .upload-form:hover {
    color: #409eff;
    border: 1px solid #c0c4cc;
  }
</style>
