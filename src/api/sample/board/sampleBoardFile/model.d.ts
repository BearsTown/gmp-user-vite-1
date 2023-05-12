import { PageReq, PageRes } from '@/api/gmp/model'

namespace SampleUploadFileDto {
  namespace Search {
    export interface Params extends PageReq {
      linkId: number | null
      keyword?: string
      typeCode?: string
    }

    export interface Row extends SampleUploadFile {
      num?: number
    }

    export interface Result {
      page: PageRes
      list: Row[]
    }
  }

  namespace Delete {
    export interface Params {
      fileIds: number[]
    }
  }

  export interface TempFile {
    size: number
    ext: string
    orgName: string
    newName: string
    typeCode: string
  }
}

export interface SampleUploadFile {
  id: Nullable<number>
  createUser?: string
  linkId?: number
  orgName: string
  newName: string
  path?: string
  ext: string
  size: number
  typeCode: string
  createDate?: string
}

export default SampleUploadFileDto
