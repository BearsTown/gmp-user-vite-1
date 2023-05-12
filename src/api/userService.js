import http from './config/httpConfig'

const option = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export default {
  register: function (user) {
    const url = '/cmm/signUp'
    return http.post(url, JSON.stringify(user), option)
  },

  changePassword: function ({ loginId, param }) {
    const url = `api/v1/user/${loginId}`
    return http.put(url, JSON.stringify(param), option)
  },
}
