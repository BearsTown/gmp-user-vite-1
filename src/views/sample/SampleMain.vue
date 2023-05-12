<template>
  <div class="common-layout">
    <el-container style="background-color: rgb(255, 255, 255)">
      <el-aside style="border-right: 1px solid rgb(221, 221, 221)">
        <el-scrollbar style="width: 100%">
          <el-menu
            :router="true"
            :default-active="activeMenu"
            style="border-right: none !important"
          >
            <el-menu-item index="/sample/user">사용자</el-menu-item>
            <el-menu-item index="/sample/board">FORM</el-menu-item>
            <el-menu-item index="/sample/test">TEST</el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-main style="padding: 0px">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const activeMenu = ref<string>('')

  function setDefaultActive() {
    activeMenu.value = route.path
  }

  onMounted(() => {
    setDefaultActive()
  })
</script>

<style scoped lang="scss">
  .layout-container-demo .el-header[data-v-472cff63] {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }

  .layout-container-demo .el-aside[data-v-472cff63] {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }

  .layout-container-demo .el-menu[data-v-472cff63] {
    border-right: none;
  }

  .layout-container-demo .el-main[data-v-472cff63] {
    padding: 0;
  }

  .layout-container-demo .toolbar[data-v-472cff63] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
</style>
