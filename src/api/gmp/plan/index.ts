import { AxiosRequestConfig } from 'axios'

import Plan from '@/api/gmp/plan/model'
import { ResultData } from '@/api/gmp/model'
import { gmpAxiosInstance as http } from '@/api/gmp'

const prefix = '/api/v1/plan'

export function getLayers(params: Plan.Item) {
  const config: AxiosRequestConfig = {
    params,
  }
  return http.get<ResultData<Plan.Item[]>>(`${prefix}/layer/get`, config)
}
