import http from '@/api/config/httpConfig'

export default {
  getList1(data) {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            key: 'KEY-1',
            value: 'VALUE-1',
            title: '법정동',
          },
          {
            key: 'KEY-2',
            value: 'VALUE-2',
            title: '행정동',
          },
          {
            key: 'KEY-3',
            value: 'VALUE-3',
            title: '격자(1㎟)',
          },
        ],
      })
    })
  },
  getList2(data) {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            key: 'KEY-2',
            value: 'VALUE-2',
            title: '영랑동',
          },
          {
            key: 'KEY-3',
            value: 'VALUE-3',
            title: '동명동',
          },
          {
            key: 'KEY-4',
            value: 'VALUE-4',
            title: '금호동',
          },
          {
            key: 'KEY-5',
            value: 'VALUE-5',
            title: '교동',
          },
          {
            key: 'KEY-6',
            value: 'VALUE-6',
            title: '노학동',
          },
          {
            key: 'KEY-7',
            value: 'VALUE-7',
            title: '조양동',
          },
          {
            key: 'KEY-8',
            value: 'VALUE-8',
            title: '청호동',
          },
          {
            key: 'KEY-9',
            value: 'VALUE-9',
            title: '대포동',
          },
        ],
      })
    })
  },
  getList3(data) {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            type: '공유',
            title: '속초 경찰서 일원',
            value: 'VALUE-1',
          },
          {
            type: '개인',
            title: '영랑호 남측 지역',
            value: 'VALUE-2',
          },
        ],
      })
    })
  },
}
