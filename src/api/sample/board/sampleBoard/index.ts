import { AxiosRequestConfig } from 'axios'

import { ResultData } from '@/api/gmp/model'
import { gmpAxiosInstance as http } from '@/api/gmp'
import SampleBoardDto, { SampleBoard } from '@/api/sample/board/sampleBoard/model'

const prefix = '/api/v1/sample/board'

export function searchBoardList(params: SampleBoardDto.Search.Params) {
  const config: AxiosRequestConfig = {
    params,
  }
  return http.get<ResultData<SampleBoardDto.Search.Result>>(`${prefix}/list`, config)
}

export function getBoardDeatails(data: SampleBoardDto.Details.Params) {
  return http.post<ResultData<SampleBoardDto.Details.Result>>(`${prefix}/details`, data)
}

export function insert(data: SampleBoardDto.Insert) {
  return http.post<ResultData<number>>(`${prefix}/insert`, data)
}

export function update(data: SampleBoardDto.Update) {
  return http.put<ResultData<number>>(`${prefix}/update`, data)
}

export function remove(params: SampleBoardDto.Delete.Params) {
  const config: AxiosRequestConfig = {
    data: params,
  }
  return http.delete<ResultData<number>>(`${prefix}/delete`, config)
}
