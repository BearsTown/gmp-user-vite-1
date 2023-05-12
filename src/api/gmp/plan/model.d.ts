import { PageReq, PageRes } from '@/api/gmp/model'

namespace Plan {
  export interface Item {
    planLayerId: string
    plan: string
    planGroup: string
    planLayerCode: string
    planLayerName: string
    planLayerDesc: string
  }
}

export default Plan
