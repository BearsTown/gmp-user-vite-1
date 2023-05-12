import { PageReq, PageRes } from '@/api/users/model'

namespace User {
  namespace Search {
    export interface Params extends PageReq {
      userId: number
    }

    export interface Row {
      id: number
      name: string
    }

    export interface Result {
      page: PageRes
      list: Row[]
    }
  }

  export interface Address {
    city: string
  }

  export interface Details {
    id: number
    name: string
    username: string
    address: Address
  }
}

export default User
