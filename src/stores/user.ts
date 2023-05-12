import { defineStore } from 'pinia'
import JSEncrypt from 'jsencrypt'

import User from '@/api/gmp/user/model'
import UserService from '@/api/userService'
import { getRsaPublicKey } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { register as apiRegister, changePassword as apiChangePassword } from '@/api/gmp/user'

export const useUserStore = defineStore('useUserStore', () => {
  async function register(user) {
    const { data: rsa } = await getRsaPublicKey()
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(rsa)
    user.password = encrypt.encrypt(user.password)

    // const { data: result } = await apiRegister(user)
    return await apiRegister(user)
  }

  async function changePassword(param: User.PwdChange) {
    const auth = useAuthStore()
    const loginId = auth.userName

    const { data: rsa } = await getRsaPublicKey()
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(rsa)

    param.loginId = loginId
    param.curPassword = encrypt.encrypt(param.curPassword).toString()
    param.newPassword = encrypt.encrypt(param.newPassword).toString()

    return await apiChangePassword(param)
  }

  return {
    register,
    changePassword,
  }
})
