// import qs from 'qs'
//
// import { commentsHttp } from '@/api/config'
//
// export namespace Comment {
//   export interface Params {
//     postId: number
//   }
//
//   export interface InfoReq {
//     id: number
//     postId: number
//     body: string
//   }
// }
//
// export const getCommentInfo = (id: number) => {
//   return commentsHttp.get<Comment.InfoReq>(`/comments/${id}`)
// }
//
// export const getCommentsByIds = (ids: number[]) => {
//   const config = {
//     params: {
//       id: ids,
//     },
//     // paramsSerializer: (params) => {
//     //   return qs.stringify(params, { arrayFormat: 'repeat' })
//     // },
//   }
//   return commentsHttp.get<Comment.InfoReq[]>(`/comments`, config)
// }
//
// export default {
//   getCommentInfo,
//   getCommentsByIds,
// }
