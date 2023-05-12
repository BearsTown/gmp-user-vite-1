import { ref } from 'vue'
import { findIndex } from 'lodash'
import { defineStore } from 'pinia'
import JSEncrypt from 'jsencrypt'

import {
  token,
  login,
  getRsaPublicKey,
  checkToken as apiCheckToken,
  refreshToken as apiRefreshToken,
} from '@/api/auth'
import { Token } from '@/api/auth/model'
import tokenUtil from '@/utils/tokenUtil'

export const useAuthStore = defineStore('useAuthStore', () => {
  const isLoggedIn = ref(false)
  const userName = ref('')
  const logInStatus = ref('check')
  const path = ref('/main')
  const isAdmin = ref(false)

  /**
   * 로그인 처리
   * @param {Object} user 로그인 사용자 정보
   */
  async function logIn(user) {
    const { data: rsa } = await getRsaPublicKey()
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(rsa)

    const { data: token } = await login({
      username: user.username,
      password: encrypt.encrypt(user.password),
      grant_type: 'password',
    })

    tokenUtil.saveToken(token)
    await checkToken()
  }

  /**
   * access_token 유효성 체크
   */
  async function checkToken() {
    const access_token = tokenUtil.getAccessToken()
    if (!access_token) {
      logInErrorStatus('notLoggedIn')
    } else {
      try {
        const { data } = await apiCheckToken(access_token)
        logInSuccess(data)
      } catch (e) {
        logInErrorStatus('accessTokenExpired')
      }
    }
  }

  /**
   * refresh token을 이용하여 token 재발급
   */
  async function refreshToken() {
    const refresh_token = tokenUtil.getRefreshToken()
    if (!refresh_token) {
      logInErrorStatus('notLoggedIn')
    } else {
      try {
        const { data } = await apiRefreshToken({
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
        })

        tokenUtil.saveToken(data)

        if (isLoggedIn.value) {
          logInSuccess()
        } else {
          await checkToken()
        }
      } catch (e) {
        logOut()
      }
    }
  }

  function logInErrorStatus(status) {
    logInStatus.value = status
    isLoggedIn.value = false
  }

  function logInSuccess(token?: Token.Check) {
    if (token) {
      userName.value = token.user_name
      isAdmin.value = findIndex(token.authorities, (role) => role === 'ROLE_ADMIN') > -1
    }

    isLoggedIn.value = true
    logInStatus.value = 'success'
  }

  function setPath(_path) {
    path.value = _path
  }

  function logOut() {
    tokenUtil.removeToken()
    location.reload()
  }

  return {
    isLoggedIn,
    userName,
    logInStatus,
    path,
    isAdmin,
    logIn,
    checkToken,
    refreshToken,
    logInErrorStatus,
    logInSuccess,
    setPath,
    logOut,
  }
})
