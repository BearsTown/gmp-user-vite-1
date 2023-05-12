<template>
  <router-view />
</template>

<script setup lang="ts">
  import { watch, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '@/stores/auth'

  const router = useRouter()
  const store = useAuthStore()
  const { logInStatus, path } = storeToRefs(store)

  watch(logInStatus, (changeStatus) => {
    if (changeStatus === 'success') {
      router.push(path.value)
    } else if (changeStatus === 'notLoggedIn') {
      router.push('/main')
    } else if (changeStatus === 'accessTokenExpired') {
      store.refreshToken()
    }
  })
</script>

<style scoped></style>
