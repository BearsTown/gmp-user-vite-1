<template>
  <el-container style="width: 100%; height: 100%" class="cls-container">
    <Test />
    <el-header class="cls-header">
      <el-row
        style="
          justify-content: center;
          display: flex;
          align-items: center;
          height: 100%;
          width: 100%;
        "
      >
        <div class="div-h-left">
          <img :src="cube" style="opacity: 0.2; width: 25px; padding-right: 10px" alt="my-logo" />
          GMPMS |
          <span style="font-size: 12px; width: 200px; padding-left: 10px"
            >Growth Management Plan<br />Management System</span
          >
        </div>
        <div class="div-h-right">
          <span v-if="userName" style="color: white">
            {{ userName }}
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-icon size="30" style="vertical-align: middle"><UserFilled /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="info">내 정보</el-dropdown-item>
                  <el-dropdown-item command="pwdChange">비밀번호 변경</el-dropdown-item>
                  <el-dropdown-item command="admin">관리자페이지</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>로그아웃</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
          <span v-if="!userName" style="color: white; cursor: pointer" @click="loginF">
            로그인</span
          >
          <!-- <router-link to="/sample"> 샘플</router-link> -->
        </div>
      </el-row>
    </el-header>
    <el-main class="cls-main">
      <el-row style="justify-content: center">
        <div style="width: 100%; font-size: 72px; font-weight: 700; color: white">
          {{ title }}
        </div>
      </el-row>
      <el-row style="justify-content: center; padding-top: 50px">
        <div style="position: relative; width: 40%; margin-right: 30px">
          <div style="position: absolute; top: 0; width: 100%">
            <input
              v-model="search"
              placeholder="검색어(지역명, 지번, 도로명주소)를 입력해주세요."
              class="search"
            />
          </div>
          <div style="position: absolute; top: 0; right: -35px">
            <el-button type="success" round style="width: 80px; height: 56px; border-radius: 30px"
              >검색
              <el-icon>
                <Search />
              </el-icon>
            </el-button>
          </div>
        </div>
      </el-row>
    </el-main>
    <el-footer class="cls-footer">
      <el-row style="justify-content: center; width: 100%">
        <!-- <el-col
          v-for="(item, index) in mainTextArr"
          :key="index"
          :span="3"
          class="card-col"
        >
          <el-card
            :body-style="{ padding: '0px', cursor: 'pointer' }"
            @click="toPage(item.link)"
          >
            <div class="box">
              <img
                class="front"
                :src="require(`@/assets/image/main/u14.svg`)"
              />
              <img
                class="back"
                :src="require(`@/assets/image/main/${item.imgPath}`)"
              />
            </div>
            <div style="padding: 14px; text-align: center">
              <span class="title">{{ item.title }}</span>
              <div class="bottom">
                {{ item.desc }}
              </div>
            </div>
          </el-card>
        </el-col> -->
        <div
          @click="toPage('plannedAreaAnalysis')"
          class="bottom-c"
          style="
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            border: 3px solid black;
          "
        >
          <div class="bottom-col-1">
            <el-icon size="60">
              <Aim />
            </el-icon>
          </div>
          <div class="bottom-col-2">성장관리계획 <br />구역 분석</div>
        </div>
        <div
          @click="toPage('plannedAreaMonitoring')"
          class="bottom-c"
          style="border-bottom: 3px solid black; border-top: 3px solid black"
        >
          <div class="bottom-col-1">
            <el-icon size="60">
              <Monitor />
            </el-icon>
          </div>
          <div class="bottom-col-2">계획 구역<br />모니터링</div>
        </div>
        <div
          @click="toPage('operationGMPlan')"
          class="bottom-c"
          style="
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            border: 3px solid black;
          "
        >
          <div class="bottom-col-1">
            <el-icon size="60">
              <Edit />
            </el-icon>
          </div>
          <div class="bottom-col-2">성장관리계획<br />운영</div>
        </div>
      </el-row>
    </el-footer>
    <LoginMainDialog :is-visible="isVisible" />
    <PwdChangeDialog :is-visible="isPwdChangeVisible" @close-dialog="isPwdChangeVisible = false" />
  </el-container>
</template>

<script setup lang="ts">
  import { ref, getCurrentInstance, onBeforeMount } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  import LoginMainDialog from '@/components/login/LoginMainDialog.vue'
  import PwdChangeDialog from '@/components/login/PwdChangeDialog.vue'

  import { storeToRefs } from 'pinia'
  import { useLoginStore } from '@/stores/login'
  import cube from '@/assets/image/main/cube.svg'

  const loginStore = useLoginStore()
  const { isLoginDialog } = storeToRefs(loginStore)

  const title = import.meta.env.VITE_APP_TITLE
  const { proxy } = getCurrentInstance() as CurrentInstance

  const router = useRouter()
  const store = useAuthStore()
  const { userName } = storeToRefs(store)
  const isVisible = ref<boolean>(false)
  const isPwdChangeVisible = ref<boolean>(false)

  const mainTextArr = [
    {
      title: '성장관리계획 구역 분석',
      imgPath: 'u37.png',
      link: 'plannedAreaAnalysis',
      desc: '성장관리계획 구역 분석입니다.',
    },
    {
      title: '계획 구역 모니터링',
      imgPath: 'u33.png',
      link: 'plannedAreaMonitoring',
      desc: '계획 구역 모니터링입니다.',
    },
    {
      title: '성장관리계획 운영',
      imgPath: 'u34.png',
      link: 'operationGMPlan',
      desc: '성장관리계획 운영입니다.',
    },
  ]
  const search = ref<string>('')

  function logOutFn() {
    proxy
      .$confirm('로그아웃 하시겠습니까?', '로그아웃', {
        confirmButtonText: '승인',
        cancelButtonText: '취소',
      })
      .then(() => store.logOut())
  }

  function toPage(link) {
    console.log(link)
    router.push({
      name: link,
    })
  }

  function loginF() {
    loginStore.setIsLoginDialog(true)
  }

  function handleCommand(cmd) {
    if (cmd == 'logout') {
      logOutFn()
    } else if (cmd == 'pwdChange') {
      isPwdChangeVisible.value = true
    } else if (cmd == 'info') {
      alert('내정보')
    } else if (cmd == 'admin') {
      router.push({
        path: '/admin',
      })
    }
  }

  onBeforeMount(async () => {
    await useAuthStore().checkToken()
    console.log('Main-check')
  })

  import Test from '@/views/Test.vue'
</script>

<style scoped>
  .bottom-c {
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    text-align: center;
    width: 300px;
    height: 150px;
    background-color: rgb(191 197 199);
    cursor: pointer;
    color: #3480a5;
  }

  .bottom-c:hover {
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    text-align: center;
    width: 300px;
    height: 150px;
    background-color: rgb(10 90 133);
    cursor: pointer;
    color: white;
  }

  .bottom-col-1 {
    width: 50px;
    font-size: 30px;
    font-weight: bold;
  }

  .bottom-col-2 {
    width: 100%;
    font-size: 30px;
    font-weight: bold;
  }

  .div-h-left {
    font-size: 30px;
    color: rgb(255, 255, 255, 0.6);
    font-weight: 700;
    text-align: left;
    position: absolute;
    left: 20%;
    display: flex;
    align-items: center;
  }

  .div-h-right {
    font-size: 18px;
    font-weight: 700;
    text-align: right;
    position: absolute;
    right: 20%;
  }

  a {
    text-decoration: none;
    /* color: #616161; */
    color: white;
  }

  .box {
    position: relative;
    height: 200px;
  }

  .front {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .front:hover {
    content: url('@/assets/image/main/u14_mouseOver.svg');
    cursor: pointer;
  }

  .back {
    position: absolute;
    width: 70px;
    height: 70px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .cls-container {
    background-image: url('@/assets/image/main/u1.png');
    background-size: cover;
  }

  .cls-header {
    height: 70px;
    background-color: rgb(33 144 201);
  }

  .cls-main {
    padding: 0;
    height: 50%;
    text-align: center;
    flex-direction: column;
    display: flex;
    justify-content: center;
    background-size: cover;
  }

  .cls-footer {
    padding-top: 20px;
    height: 40%;
    background-color: rgba(27, 102, 139, 0.7);
    display: flex;
    align-items: center;
  }

  .search {
    width: 100%;
    color: rgb(153, 153, 153);
    height: 50px;
    border-radius: 30px;
    border-color: rgba(121, 121, 121, 1);
    border-width: 1px;
    border-style: solid;
    padding: 2px 2px 2px 30px;
  }

  .search:hover {
    width: 100%;
    color: rgb(153, 153, 153);
    height: 50px;
    border-radius: 30px;
    border-color: rgba(121, 121, 121, 1);
    border-width: 1px;
    border-style: solid;
    padding: 2px 2px 2px 30px;
  }

  .el-main {
    border-bottom: 10px solid rgba(13, 43, 77, 0.8);
  }

  html,
  body {
    width: 100%;
    height: 100%;
    color: #5c5c5c;
  }

  .card-col {
    padding-left: 10px;
    padding-right: 10px;
    max-width: 14.5% !important;
    flex: 0 0 14.5% !important;
  }

  .time {
    font-size: 12px;
    color: #999;
  }

  .title {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
  }

  .bottom {
    color: #7f7f7f;
    text-align: center;
    font-size: 14px;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  .image {
    width: 100%;
    display: block;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
  }
</style>
