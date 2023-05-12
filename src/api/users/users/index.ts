import User from '@/api/users/users/model'
import { ResultData } from '@/api/users/model'
import { userAxiosInstance as http } from '@/api/users'

// export const getUsers = () => http.get<User.Details[]>(`/users`)
export const getUsers = () => http.get<ResultData<User.Search.Result>>(`/users`)
export const getUsersInfoById = (id: number) => http.get<ResultData<User.Details>>(`/users/${id}`)

export default {
  getUsers,
  getUsersInfoById,
}
