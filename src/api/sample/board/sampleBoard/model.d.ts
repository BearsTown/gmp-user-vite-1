import { PageReq, PageRes } from '@/api/gmp/model'
import SampleUploadFileDto from '@/api/sample/board/sampleBoardFile/model'

namespace SampleBoardDto {
  namespace Search {
    export interface Params extends PageReq {
      keyword?: string
    }

    export interface Row {
      num: number
      id: number
      strInput: string
    }

    export interface Result {
      page: PageRes
      list: Row[]
    }
  }

  namespace Details {
    export interface Params {
      boardId: number
    }

    export interface Result extends SampleBoard {
      userName: string
    }
  }

  export interface Insert extends SampleBoard {
    uploadFiles: SampleUploadFileDto.TempFile[]
  }

  export interface Update extends SampleBoard {
    deleteFiles: SampleUploadFile
    updateFiles: SampleUploadFile
    uploadFiles: SampleUploadFileDto.TempFile[]
  }

  namespace Delete {
    export interface Params {
      boardIds: number[]
    }
  }
}

export interface SampleBoard {
  id: Nullable<number>
  createUser: string
  strInput: string
  strColor: string
  strCombo: string
  strTextarea: string
  numSpin: Nullable<number>
  numSlider: Nullable<number>
  datePicker: string
  boolRadio: boolean
  boolSwitch: boolean
  createDate: string
  updateDate: string
}

export default SampleBoardDto
