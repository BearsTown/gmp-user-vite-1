declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_APP_PORT: number
  VITE_APP_PREVIEW: boolean
  VITE_APP_CONTEXT: string
  VITE_APP_DROP_CONSOLE: boolean
  VITE_APP_TITLE: string
  VITE_APP_BASE_URL: string
  VITE_API_AUTH_URL: string
  VITE_API_GMPMS_URL: string
  VITE_API_VWORLD_URL: string
  VITE_API_MAPSTUDIO_URL: string
}

declare interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare interface PageInfo {
  pageNo: number
  pageSize: number
  totalCount: number
  currentPageSize: number
}

declare interface CurrentInstance {
  proxy
}
