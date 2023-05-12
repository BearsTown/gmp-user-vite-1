import { ProxyOptions } from 'vite'

import { API_LIST } from './config'

export function proxy(): Record<string, ProxyOptions> {
  const list = {}
  API_LIST.forEach((api) => {
    list[api.PREFIX] = {
      target: api.URL(),
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${api.PREFIX}`), `${api.PATH}`),
    }
  })

  return {
    ...list,

    /**
     * test
     */
    '/api-users': {
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api-users/, ''),
    },
    '/api-todos': {
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api-todos/, ''),
    },
    '/api-comments': {
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api-comments/, ''),
    },
  }
}
