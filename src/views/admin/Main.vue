<template>
  <el-container style="height: 100%">
    <el-header class="main-header">
      GMPMS 관리자
      <div style="float: right">
        <span style="font-size: 12px; display: inline-block; margin-right: 10px"
          >[ {{ username }}님 ]</span
        >
        <el-button type="primary" text size="small" @click="logOutFn">로그아웃</el-button>
        <el-button type="primary" text size="small" style="margin-left: 0px">
          <router-link to="/main"> 메인화면 </router-link>
        </el-button>
      </div>
    </el-header>
    <el-main style="padding: 0px !important">
      <el-container style="height: 100%">
        <el-aside
          width="230px"
          style="height: 100%; background-color: #fff; border-right: 1px solid #ddd"
        >
          <el-menu
            :router="true"
            :default-active="activeMenu"
            style="border-right: none !important"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><User /></el-icon>
                <span>사용자 및 권한 관리</span>
              </template>
              <el-menu-item index="/admin/users">사용자</el-menu-item>
              <!-- <el-menu-item index="/admin/userRole">접근 권한</el-menu-item> -->
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><Cpu /></el-icon>공통 코드 관리
              </template>
              <el-menu-item index="/admin/code">일반 코드</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main style="padding: 0px">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
</template>
<script setup>
  import { ref, getCurrentInstance, onMounted } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  const { proxy } = getCurrentInstance()

  const router = useRouter()

  const store = useAuthStore()
  const username = store.userName
  const activeMenu = ref('')

  function logOutFn() {
    proxy
      .$confirm('로그아웃 하시겠습니까?', '로그아웃', {
        confirmButtonText: '승인',
        cancelButtonText: '취소',
      })
      .then(() => {
        store.logOut()
      })
  }

  onMounted(() => {
    if (!store.isAdmin) {
      router.push({ path: '/main' })
    }
  })
</script>
<style scoped>
  .main-header {
    background-color: #50586c !important;
    color: #dce2f0 !important;
  }

  .el-header {
    background-color: #eeeeee;
    border-bottom: 1px solid #e0e0e0;
    line-height: 60px;
  }

  .el-aside {
    background-color: #eeeeee;
  }
  a {
    text-decoration: none;
    /* color: #616161; */
    color: #409eff;
  }
</style>
