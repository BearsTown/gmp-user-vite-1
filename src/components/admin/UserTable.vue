<template>
  <el-table
    height="100%"
    :header-row-style="{ cursor: 'pointer', height: '60px' }"
    :row-style="{ cursor: 'pointer', height: '50px' }"
    :data="userList"
    @selection-change="handleSelectionChange"
    @row-click="selectUser"
  >
    <el-table-column type="selection" width="55" />

    <el-table-column label="상태" width="120" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.userRole == 'R9000'" type="warning" size="small"> 관리자 </el-tag>
        <el-tag v-else-if="scope.row.lock" size="small" type="danger"> 잠김 </el-tag>
        <el-tag v-else-if="scope.row.roleYn === 'Y'" size="small"> 정상 </el-tag>
        <el-tag v-else-if="scope.row.roleYn == 'N'" type="success" size="small"> 승인대기 </el-tag>
      </template>
    </el-table-column>

    <el-table-column
      v-for="item in userInfo"
      :key="item.value"
      :prop="item.value"
      :label="item.label"
      align="center"
      sortable
    />

    <el-table-column label="비밀번호" align="center" width="170">
      <template #default="scope">
        <el-button type="primary" link size="small" @click="initPass(scope.row.loginId)">
          초기화
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
  defineProps({
    userList: {
      type: Array,
    },
  })

  const emit = defineEmits(['handleSelectionChange', 'initPass', 'openModifyDialog'])

  let userInfo = [
    {
      value: 'loginId',
      label: '아이디',
    },
    {
      value: 'userName',
      label: '이름',
    },
    {
      value: 'email',
      label: '이메일',
    },
  ]

  function handleSelectionChange(val) {
    emit('handleSelectionChange', val)
  }

  function initPass(loginId) {
    emit('initPass', loginId)
  }

  function selectUser(user, column) {
    if (column.label !== '비밀번호') {
      emit('openModifyDialog', user)
    }
  }
</script>
<style scoped>
  :deep .el-button--text {
    padding: 0 !important;
  }
  .label {
    font-size: 13px;
    color: #aaa;
    margin: 0 10px;
  }
</style>
