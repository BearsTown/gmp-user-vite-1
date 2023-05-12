// import { ProxyOptions } from 'vite'
//
// import {API_INFO_AUTH, API_INFO_GMPMS, API_INFO_VWORLD, API_INFO_MAPSTUDIO, API_LIST} from './config'
// import { getEnvAPIs } from '../utils/getEnv'
//
// type ProxyTargetList = Record<string, ProxyOptions>
//
// export function proxy(): ProxyTargetList {
//   console.log(process.env)
//
//   // getEnvAPIs()
//
//   const list = {}
//   API_LIST.forEach(api => {
//     list[api.PREFIX] = {
//       target: api.URL(),
//       changeOrigin: true,
//       rewrite: (path) =>
//           path.replace(new RegExp(`^${api.PREFIX}`), `${api.PATH}`),
//     }
//   })
//
//   console.log(list)
//
//   return {
//     [API_INFO_AUTH.PREFIX]: {
//       target: API_INFO_AUTH.URL(),
//       changeOrigin: true,
//       rewrite: (path) =>
//         path.replace(new RegExp(`^${API_INFO_AUTH.PREFIX}`), `${API_INFO_AUTH.PATH}`),
//     },
//     [API_INFO_GMPMS.PREFIX]: {
//       target: API_INFO_GMPMS.URL(),
//       changeOrigin: true,
//       rewrite: (path) =>
//         path.replace(new RegExp(`^${API_INFO_GMPMS.PREFIX}`), `${API_INFO_GMPMS.PATH}`),
//     },
//     [API_INFO_VWORLD.PREFIX]: {
//       target: API_INFO_VWORLD.URL(),
//       changeOrigin: true,
//       rewrite: (path) =>
//         path.replace(new RegExp(`^${API_INFO_VWORLD.PREFIX}`), `${API_INFO_VWORLD.PATH}`),
//     },
//     [API_INFO_MAPSTUDIO.PREFIX]: {
//       target: API_INFO_MAPSTUDIO.URL(),
//       changeOrigin: true,
//       rewrite: (path) =>
//         path.replace(new RegExp(`^${API_INFO_MAPSTUDIO.PREFIX}`), `${API_INFO_MAPSTUDIO.PATH}`),
//     },
//     '/api-users': {
//       target: 'https://jsonplaceholder.typicode.com',
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api-users/, ''),
//     },
//     '/api-todos': {
//       target: 'https://jsonplaceholder.typicode.com',
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api-todos/, ''),
//     },
//     '/api-comments': {
//       target: 'https://jsonplaceholder.typicode.com',
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api-comments/, ''),
//     },
//   }
// }
