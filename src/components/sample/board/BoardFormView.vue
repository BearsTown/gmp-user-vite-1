<template>
  <el-form
    style="width: 100%; height: 100%; display: flex; flex-direction: column"
    :model="formData"
    label-width="120px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="strInput">
          <el-input v-model="formData.strInput" readonly />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="strCombo">
          <el-select
            v-model="formData.strCombo"
            placeholder="strCombo"
            disabled
            style="width: 100%"
          >
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
            readonly
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="datePicker">
          <el-date-picker
            v-model="formData.datePicker"
            type="date"
            readonly
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
            disabled
            style="width: 100%"
          >
            <el-option label="strColor" value="strColor" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="numSlider">
          <el-slider v-model="formData.numSlider" disabled show-input />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="boolSwitch">
          <el-switch v-model="formData.boolSwitch" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="boolRadio">
          <el-radio-group v-model="formData.boolRadio" disabled>
            <el-radio :label="true">OK</el-radio>
            <el-radio :label="false">NO</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-form-item label="strTextarea">
          <el-input v-model="formData.strTextarea" type="textarea" rows="10" readonly />
          <!--                  <common-editor/>-->
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import { onUnmounted } from 'vue'

  import { useSampleBoardDetailsStore } from '@/stores/sample/board/sample-board-form'

  const boardDetailsStore = useSampleBoardDetailsStore()

  const formData = boardDetailsStore

  onUnmounted(() => {
    boardDetailsStore.$reset()
  })

  function getDetails(id: number) {
    boardDetailsStore.getDetails(id)
  }

  defineExpose({
    getDetails,
  })
</script>

<style scoped></style>
