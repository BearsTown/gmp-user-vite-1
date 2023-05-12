<template>Test 화면 확인중...</template>

<script setup lang="ts">
  // import { useSampleStore } from '@/stores/sample'
  // import { storeToRefs } from 'pinia'
  // import { useRouter } from 'vue-router'
  import { onMounted } from 'vue'

  // const store = useSampleStore()
  // const { user } = storeToRefs(store)

  // onMounted(() => {
  // store.getSampleList().then((res) => console.log(res))
  //   store.getSampleList()
  // })

  // import { getRsaPublicKey, login, checkToken, refreshToken } from '@/api/auth/index'
  import { getUsers, getUserInfoById } from '@/services/users/users'
  // import authService from '@/api/authService'
  import JSEncrypt from 'jsencrypt'
  import { Login } from '@/api/auth/model'

  import tokenUtil from '@/utils/tokenUtil'
  import { register, getUsers as getUsersss } from '@/api/gmp/user'
  // import { getTodos, getTodosInfoById } from '@/services/todos'
  // import { getCommentInfo, getCommentsByIds } from '@/services/comments'

  window.setTimeout(() => {
    // console.log('getRsaPublicKey')
    // getRsaPublicKey()
  }, 2000)

  onMounted(() => {
    ;(async () => {
      // const user = {
      //   username: 'admin',
      //   password: 'admin',
      // }
      //
      // const { data } = await getRsaPublicKey()
      //
      // const encrypt = new JSEncrypt()
      // encrypt.setPublicKey(data)
      //
      // const token = await login({
      //   username: user.username,
      //   password: encrypt.encrypt(user.password),
      //   grant_type: 'password',
      // })
      //
      // console.log(token.data.access_token)
      //
      // tokenUtil.saveToken(token.data)
      //
      // let access_token = tokenUtil.getAccessToken()
      // if (!access_token) {
      //   // logInErrorStatus('notLoggedIn');
      // } else {
      //   const { data } = await checkToken(access_token)
      //
      //   console.log(data)
      //
      //   // logInSuccess({
      //   //   access_token: access_token,
      //   //   user_name: res.data.user_name,
      //   //   authorities: res.data.authorities
      //   // });
      //
      //   const user = {
      //     id: 'admin',
      //     name: 'nameeee',
      //     email: 'emaillll',
      //     password: 'admin',
      //   }
      //
      //   try {
      //     const added = await register(user)
      //     console.log(added)
      //   } catch (e) {
      //     console.log(e)
      //   }
      //
      //   const users = await getUsersss({
      //     size: 5,
      //     pageNo: 1,
      //     keyword: 'admin',
      //   })
      //   console.log(users.data)
      //   console.log(users.data.list[0].userName)
      // }
      //
      // let refresh = tokenUtil.getRefreshToken()
      // return refreshToken({
      //   grant_type: 'refresh_token',
      //   refresh_token: refresh,
      // })
      // return authService.logIn(user)
      // const userList = await getUsers()
      // console.log(userList)
      //
      // const userInfo = await getUserInfoById(10)
      // console.log(userInfo)
      // const todosList = await getTodos({
      //   userId: 1,
      // })
      // console.log(todosList)
      //
      // const todosInfo = await getTodosInfoById(200)
      // console.log(todosInfo)
      // const commentInfo = await getCommentInfo(10)
      // console.log(commentInfo)
      //
      // const comments = await getCommentsByIds([1, 2, 3])
      // console.log(comments)
    })()
  })
</script>

<style></style>
