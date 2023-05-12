import http from '../../config/httpConfig'
import qs from 'qs'
//import axios from 'axios';

const option = {
  headers: {
    'content-type': 'application/json',
  },
}

export default {
  getList(param) {
    const queryParam = qs.stringify(param)
    let url = `/api/v1/log/list?${queryParam}`

    return http.get(url)
  },
}
