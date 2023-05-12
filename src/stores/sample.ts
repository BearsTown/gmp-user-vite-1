import { defineStore } from 'pinia'
import { ref } from 'vue'

import User from '@/api/gmp/user/model'
import { getUsers } from '@/api/gmp/user'

export const useSampleStore = defineStore('useSampleStore', () => {
  const user = ref<User.User[]>()

  async function getSampleList() {
    const users = await getUsers({
      size: 7,
      pageNo: 2,
    })

    user.value = users.data.list
  }

  return {
    user,
    getSampleList,
  }
})
