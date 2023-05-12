// import { todosHttp } from '@/api/config'
// import { AxiosRequestConfig } from 'axios/index'
// import qs from 'qs'
//
// export interface TodosParams {
//   userId: number
// }
//
// export interface TodosReq {
//   id: number
//   userId: number
//   title: string
//   completed: boolean
// }
//
// // export const getTodosInfoById = (id: string | number) => todosHttp.get<TodosReq>(`/todos/${id}`)
//
// // export const getTodosInfoById = (id: string | number) => {
// //   return todosHttp.get<TodosReq>(`/todos/${id}`)
// // }
//
// export const getTodos = (params: TodosParams) => todosHttp.post<TodosReq[]>(`/todos`, params)
// export const getTodosInfoById = (id: string | number) => todosHttp.get<TodosReq>(`/todos/${id}`)
//
// export default {
//   getTodos,
//   getTodosInfoById,
// }
//
// // const config: AxiosRequestConfig = {
// //   params,
// //   paramsSerializer: (params) => {
// //     return qs.stringify(params, { arrayFormat: 'brackets' })
// //   },
// // }
