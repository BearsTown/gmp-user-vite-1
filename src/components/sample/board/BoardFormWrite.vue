<template>
  <el-form
    ref="ruleFormRef"
    style="width: 100%; height: 100%; display: flex; flex-direction: column"
    :model="formData"
    :rules="rules"
    label-width="120px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="strInput" prop="strInput">
          <el-input v-model="formData.strInput" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="strCombo">
          <el-select v-model="formData.strCombo" placeholder="strCombo" style="width: 100%">
            <el-option label="strCombo" value="strCombo" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="numSpin">
          <el-input-number
            v-model="formData.numSpin"
            style="width: 100%"
            :min="0.01"
            :max="10.0"
            :step="0.01"
            :precision="2"
            controls-position=""
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="datePicker">
          <el-date-picker
            v-model="formData.datePicker"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="strColor">
          <el-select
            v-model="formData.strColor"
            placeholder="please select your zone"
            style="width: 100%"
          >
            <el-option label="strColor" value="strColor" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="numSlider">
          <el-slider v-model="formData.numSlider" show-input />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="boolSwitch">
          <el-switch v-model="formData.boolSwitch" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="boolRadio">
          <el-radio-group v-model="formData.boolRadio">
            <el-radio :label="true">OK</el-radio>
            <el-radio :label="false">NO</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-form-item label="strTextarea">
          <el-input v-model="formData.strTextarea" type="textarea" rows="10" />
          <!--                  <common-editor/>-->
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import { ref, reactive, onUnmounted } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useSampleBoardDetailsStore } from '@/stores/sample/board/sample-board-form'

  const boardDetailsStore = useSampleBoardDetailsStore()

  const formData = boardDetailsStore

  onUnmounted(() => {
    boardDetailsStore.$reset()
  })

  function getDetails(id) {
    boardDetailsStore.getDetails(id)
  }

  const rules = reactive<FormRules>({
    strInput: [
      { required: true, message: 'strInput 입력해주세요', trigger: 'blur' },
      { min: 1, max: 5, message: '1~5자리 입력.', trigger: 'blur' },
    ],
  })

  const ruleFormRef = ref<FormInstance>()

  defineExpose({
    ruleFormRef,
    getDetails,
  })
</script>

<style scoped></style>
