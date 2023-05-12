<template>
  <el-button @click="dialogVisible = true">추가 </el-button>

  <el-container>
    <el-dialog v-model="dialogVisible" title="인센티브 설정" width="30%" @close="closeDialog()">
      <div>
        <div class="selectTitle">1. 용도지역 설정</div>
        <el-radio-group v-model="LandUseRadio" @click="inputList.landuse = $event.target.value">
          <el-radio-button
            plain
            class="IncentiveBtn"
            v-for="(code, key) in landuseCodeList"
            :key="key"
            :label="code.codeName"
            :value="code.code"
          />
        </el-radio-group>
      </div>

      <div>
        <div class="selectTitle" style="margin-top: 60px">2. 인센티브 항목 선택</div>
        <el-radio-group v-model="IncentiveRadio" @click="inputList.incentive = $event.target.value">
          <el-radio-button
            plain
            class="IncentiveBtn"
            v-for="(code, key) in incentiveCodeList"
            :key="key"
            :label="code.codeName"
            :value="code.code"
          />
        </el-radio-group>
      </div>

      <div>
        <div class="selectTitle" style="margin-top: 60px; margin-bottom: 6px">3. 내용 입력</div>
        <el-alert
          title="기준건폐율 x ( 기반시설면적 / 대지면적 ) x 1.2"
          type="info"
          center
          show-icon
          :closable="false"
          effect="dark"
        />

        <div class="detailContents">
          <span style="font-size: 14px; color: #e6a23c"> 2.4 % </span> &nbsp; &nbsp;

          <!-- 기반시설면적 입력 -->
          <span style="font-size: 11px">기반시설면적 </span> &nbsp;
          <input
            class="inputField"
            type="text"
            maxlength="10"
            oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');"
            @change="inputList.infra = $event.target.value"
            :value="inputList.infra"
          /><span class="distanceUnit">㎡</span> &nbsp;

          <!-- 대지면적 입력 -->
          <span style="font-size: 11px">대지면적 </span> &nbsp;
          <input
            class="inputField"
            type="text"
            maxlength="10"
            oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');"
            @change="inputList.area = $event.target.value"
            :value="inputList.area"
          /><span class="distanceUnit">㎡</span> &nbsp;
        </div>
      </div>

      <!-- Footer -->
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitArray()" style="width: 80px"> 추가 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup>
  import { ElMessage } from 'element-plus'
  import { getCurrentInstance, onMounted, ref } from 'vue'
  import { useAddIncentiveDialogStore } from '@/stores/work/plannedAreaMonitoring/addIncentive'
  const incentiveStore = useAddIncentiveDialogStore()
  const { proxy } = getCurrentInstance()

  const dialogVisible = ref(false)

  // Radio Button 기본 선택
  const LandUseRadio = ref('자연녹지지역')
  const IncentiveRadio = ref('도로개설')

  // Dialog 선택 값 Object 초기화
  const inputList = ref({ landuse: '', incentive: '', infra: 0, area: 0 })

  // 코드 값 목록 배열
  const landuseCodeList = ref([])
  const incentiveCodeList = ref([])

  onMounted(async () => {
    try {
      landuseCodeList.value = await incentiveStore.getCodeList('G0002')
      incentiveCodeList.value = await incentiveStore.getCodeList('G0003')
    } catch (error) {
      console.log(error)
      proxy.$errorMessage('코드 정보 중에 오류가 발생했습니다. ')
    }
    console.log(landuseCodeList)
  })

  // Dialog 닫힐 때
  function closeDialog() {
    // 버튼 위치 초기화
    this.LandUseRadio = '자연녹지지역'
    this.IncentiveRadio = '도로개설'
    this.inputList = { landuse: '', incentive: '', infra: 0, area: 0 }
  }

  // 추가 버튼 누를때
  function submitArray() {
    const newObj = Object.keys(this.inputList).filter((key) => {
      if (!this.inputList[key].length) {
        return `${key}`
      }
    })

    try {
      if (newObj.length === 0) {
        ElMessage({
          message: '입력을 성공하였습니다.',
          type: 'success',
        })
        console.log(this.inputList)

        // Dialog 초기화
        this.dialogVisible = false
        this.inputList = {
          landuse: '',
          incentive: '',
          infra: 0,
          area: 0,
        }
      } else {
        ElMessage({
          showClose: true,
          message: '[ ' + newObj + ' ] ' + '값이 빈 칸 입니다.',
          type: 'warning',
        })
        this.dialogVisible = true
      }
    } catch (error) {
      ElMessage({
        message: error + '오류가 발생했습니다.',
        type: 'error',
      })
      this.dialogVisible = true
    }
  }
</script>

<style scoped>
  .distanceUnit {
    font-size: 12px;
    color: #409eff;
  }

  .inputField {
    /* text-decoration: underline; */
    color: #409eff;
    border: none;
    border-bottom: 1px solid #409eff !important;
    width: 70px;
    font-size: 12px;
    text-align: center;
    outline: none;
  }

  :deep(.el-input__wrapper) {
    box-shadow: none;
    text-decoration: underline;
    padding: 0px;
  }

  :deep(.el-input-group__append) {
    background-color: white;
    color: #409eff;
    box-shadow: none;
    padding: 0px;
    height: 25px;
    line-height: 25px;
  }

  .detailContents {
    border: 1px solid #409eff;
    border-radius: 4px;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
  }

  .selectTitle {
    font-weight: bold;
    font-size: 14px;
  }

  :deep(.el-alert__title) {
    font-size: 12px;
    font-weight: bold;
  }

  :deep(.el-dialog) {
    border: 0px solid !important;
    border-radius: 10px;
  }

  /** Dialog Header */
  :deep(.el-dialog__header) {
    background-color: #409eff;
    border: 0px solid !important;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin: 0px;
    padding: 20px;
    height: 15px;
  }

  /** Dialog Title */
  :deep(.el-dialog__title) {
    color: white;
    font-weight: bold;
    line-height: 15px;
    /* padding: 5px; */
  }

  /** Header Close Button */
  :deep(.el-dialog__headerbtn .el-dialog__close) {
    color: white;
    font-size: 20px;
    /* line-height: 15px; */
  }

  /** Select Radio Button */
  :deep(.el-radio-button__inner) {
    border: 1px solid #dcdfe6 !important;
    border-radius: 5px !important;
    font-size: 12px;
    font-weight: bold;
    margin: 6px;
  }

  /** '용도지역 설정' 버튼 */
  :deep(.LandUseBtn > .el-radio-button__inner) {
    width: 95px;
    padding: 8px;
    box-shadow: none;
  }

  /** '인센티브 항목 설정' 버튼 */
  :deep(.IncentiveBtn > .el-radio-button__inner) {
    width: 122px;
    padding: 8px;
    box-shadow: none;
  }
</style>
