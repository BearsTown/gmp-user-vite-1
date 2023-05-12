import http from './config/httpConfig'

const option = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export default {
  getCodeList(parentCode) {
    return http.get(`api/v1/codes/${parentCode}/child`)
  },

  addNewCode: function (codeForm) {
    const url = 'api/v1/codes'
    return http.post(url, JSON.stringify(codeForm), option)
  },

  modifyCode: function (codeForm) {
    const url = 'api/v1/codes'
    return http.put(url, JSON.stringify(codeForm), option)
  },

  removeCode: function (code) {
    const url = `api/v1/codes/${code}`
    return http.delete(url)
  },

  changeCodePriority: function (param) {
    const url = 'api/v1/codes/priority'
    return http.put(url, JSON.stringify(param), option)
  },
}
