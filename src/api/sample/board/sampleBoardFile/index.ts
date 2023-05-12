import { AxiosRequestConfig } from 'axios'

import { ResultData } from '@/api/gmp/model'
import { gmpAxiosInstance as http } from '@/api/gmp'
import SampleUploadFileDto from '@/api/sample/board/sampleBoardFile/model'

const prefix = '/api/v1/sample/file'

export function downLoadFile(id: number) {
  const config: AxiosRequestConfig = {
    responseType: 'blob',
  }
  return http.get<ResultData<BlobPart>>(`${prefix}/${id}/download`, config)
}

export function searchFileList(params: SampleUploadFileDto.Search.Params) {
  const config: AxiosRequestConfig = {
    params,
  }
  return http.get<ResultData<SampleUploadFileDto.Search.Result>>(`${prefix}/list`, config)
}

export function uploadTempFile(data: FormData) {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  return http.post<ResultData<SampleUploadFileDto.TempFile[]>>(`${prefix}/temp`, data, config)
}
