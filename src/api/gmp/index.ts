import { AxiosResponse } from 'axios'

import router from '@/router'
import tokenUtil from '@/utils/tokenUtil'
import { AbstractApiAxios } from '@/utils/apiAxios'
import { useAuthStore } from '@/stores/auth'
import { ResultData } from '@/api/gmp/model'
import { API_INFO_GMPMS } from '@/config/config'
import { authAxiosInstance, refreshToken } from '@/api/auth'

class GmpAxios extends AbstractApiAxios<ResultData<any>> {
  constructor() {
    super({
      baseURL: API_INFO_GMPMS.PREFIX,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.getAxios().interceptors.request.use(
      (config) => {
        const token = tokenUtil.getAccessToken()
        config.headers['Authorization'] = token ? `bearer ${token}` : null
        return config
      },
      (error) => Promise.reject(error.response),
    )

    this.getAxios().interceptors.response.use(
      (res: AxiosResponse) => {
        /**
         * -ToDo : 서버 통신 에러 메시지 공통 처리
         */
        return res
      },
      async (error) => {
        const res = error.response
        if (res.status === 401) {
          const description = res.data.error_description
          if (description.indexOf('Access token expired') > -1) {
            return this.getTokenByRefreshToken().then((res) => this.retryRequest(res, error))
          } else if (description.indexOf('Invalid refresh token') > -1) {
            const authStore = useAuthStore()
            authStore.logOut()
          } else if (description.indexOf('Full authentication is required') > -1) {
            await router.replace('/main')
          }
        } else if (res.status === 403) {
          await router.replace('/main')
        }
        return Promise.reject(error)
      },
    )
  }

  private retryRequest({ data }, { config }) {
    tokenUtil.saveToken(data)
    config.headers.Authorization = [data.token_type, data.access_token].join(' ')
    return authAxiosInstance.getAxios().request(config)
  }

  private getTokenByRefreshToken() {
    const refresh = tokenUtil.getRefreshToken()
    return refreshToken({
      grant_type: 'refresh_token',
      refresh_token: refresh,
    })
  }
}

export const gmpAxiosInstance = new GmpAxios()
