import { ResultData } from '@/api/users/model'
import { AbstractApiAxios } from '@/utils/apiAxios'

class UserAxios extends AbstractApiAxios<ResultData<any>> {
  constructor() {
    super({
      baseURL: '/api-users',
    })
  }
}

export const userAxiosInstance = new UserAxios()
