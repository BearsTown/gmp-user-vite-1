import qs from 'qs'
import { AxiosRequestConfig } from 'axios'

import { API_INFO_GMPMS } from '@/config/config'

import http from '@/api/config/httpConfig'
import { BASIC_AUTH } from '@/config/config'
// import todosHttp from '@/api/config/todosHttp'
import { ref } from 'vue'

const option: AxiosRequestConfig = {
  auth: BASIC_AUTH,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

export default {
  logIn({ username, password }) {
    return http.post(
      '/oauth/token',
      qs.stringify({
        username: username,
        password: password,
        grant_type: 'password',
      }),
      option,
    )
  },
  refreshToken(refresh_token) {
    return http.post(
      '/oauth/token',
      qs.stringify({
        refresh_token: refresh_token,
        grant_type: 'refresh_token',
      }),
      option,
    )
  },
  checkToken(access_token) {
    return http.post('/oauth/check_token', qs.stringify({ token: access_token }), option)
  },
  //403
  setAuthorization(access_token) {
    let token
    if (access_token) {
      token = 'Bearer ' + access_token
    }
    http.defaults.headers.common.Authorization = token
  },
  getRsaPublicKey() {
    return http.get('/rsa/key')
  },
}
