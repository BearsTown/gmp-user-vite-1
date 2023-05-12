import axios from 'axios'

import { API_INFO_GMPMS } from '@/config/config'
import tokenUtil from '@/utils/tokenUtil'

const http = axios.create({
  baseURL: API_INFO_GMPMS.PREFIX,
})

/**
 * temp
 */
http.interceptors.request.use(
  (config) => {
    const token = tokenUtil.getAccessToken()
    config.headers['Authorization'] = token ? `bearer ${token}` : null
    return config
  },
  (error) => Promise.reject(error.response),
)

export default http
