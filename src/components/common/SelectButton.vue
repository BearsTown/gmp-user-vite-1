<template>
  <template v-if="type === 'radio'">
    <el-radio-group v-model="selectedListKeys[0]" @change="handleSelectionChange">
      <el-radio-button v-for="item in dataList" :key="item[keyName]" :label="item[keyName]"
        >{{ item[titleName] }}
      </el-radio-button>
    </el-radio-group>
  </template>

  <template v-else-if="type === 'multi'">
    <el-checkbox-group v-model="selectedListKeys" @change="handleSelectionChange">
      <el-checkbox-button v-for="item in dataList" :key="item[keyName]" :label="item[keyName]"
        >{{ item[titleName] }}
      </el-checkbox-button>
    </el-checkbox-group>

    <div class="select-control">
      <el-button @click="selectAll">전체</el-button>
      <el-button @click="selectReverse">반전</el-button>
      <el-button @click="clearSelection">해제</el-button>
    </div>
  </template>

  <template v-else-if="type === 'list'">
    <el-tree
      ref="listRef"
      node-key="key"
      :data="dataList"
      :props="{ label: 'title' }"
      show-checkbox
      @check-change="handleSelectionChange"
    />

    <!--    <el-table-->
    <!--      ref="cccc"-->
    <!--      :show-header="false"-->
    <!--      :data="dataList"-->
    <!--      style="width: 100%"-->
    <!--      @selection-change="handleSelectionChange"-->
    <!--    >-->
    <!--      <el-table-column type="selection" />-->
    <!--      <el-table-column prop="title" />-->
    <!--    </el-table>-->

    <div class="select-control">
      <el-button @click="selectAll">전체</el-button>
      <el-button @click="selectReverse">반전</el-button>
      <el-button @click="clearSelection">해제</el-button>
    </div>
  </template>
</template>

<script setup>
  import { onMounted, ref, toRefs, watch } from 'vue'

  import { useSelection } from '@/hooks/useSelection'

  // const props = defineProps(['type', 'keyName', 'valueName', 'titleName', 'requestApi'])
  const props = defineProps({
    type: {
      type: String,
      default: 'multi',
    },
    keyName: {
      type: String,
      default: '',
    },
    valueName: {
      type: String,
      default: '',
    },
    titleName: {
      type: String,
      default: '',
    },
    requestApi: {
      type: Function,
      default: () => {},
    },
  })
  const emits = defineEmits(['selection-change'])

  const {
    dataList,
    selectedList,
    selectionChange,
    allList,
    requestApi,
    isSelectedAll,
    selectAll: useSelectAll,
    selectReverse,
    clearSelection: useClearSelection,
    selectedListKeys,
  } = useSelection(props.requestApi, props.keyName)

  onMounted(() => {
    requestApi()
  })

  watch(
    () => selectedList.value,
    () => {
      console.log(`SelectButton.vue :: watch :: ${selectedList.value}`)
      emits('selection-change', selectedList.value)
    },
  )

  const listRef = ref()

  function handleSelectionChange(list) {
    switch (props.type) {
      case 'radio': {
        list = [list]
        break
      }
      case 'multi': {
        break
      }
      case 'list': {
        // list = list.map((data) => data.key)
        list = listRef.value.getCheckedKeys()
        break
      }
    }

    selectionChange(list)
  }

  function selectAll() {
    useSelectAll()
    listRefresh()
  }

  function clearSelection() {
    useClearSelection()
    listRefresh()
  }

  function listRefresh() {
    if (props.type === 'list') {
      listRef.value.setCheckedNodes(selectedList.value)
    }
  }

  defineExpose({
    ...toRefs({}),
    dataList,
    selectAll,
    selectedList,
    clearSelection,
  })
</script>

<style scoped lang="scss">
  .el-radio-group {
    display: block;

    :deep(.el-radio-button) {
      width: 100%;
      min-width: 70px;
      max-width: 100px;

      .el-radio-button__inner {
        width: 100%;
        padding: 8px;
      }
    }
  }

  .el-checkbox-group {
    flex-wrap: wrap;
    align-items: center;
    display: inline-flex;

    :deep(.el-checkbox-button) {
      margin: 2px;
      width: 100%;
      min-width: 70px;
      max-width: 100px;

      .el-checkbox-button__inner {
        width: 100%;
        padding: 8px;
        border: var(--el-border);
        border-radius: var(--el-border-radius-base);
      }
    }
  }

  /*
.el-button-group {
  flex-wrap: wrap;
  align-items: center;
  display: inline-flex;

  :deep(.el-button) {
    margin: 2px;
    width: 100%;
    min-width: 70px;
    max-width: 100px;
    border-radius: var(--el-border-radius-base);

    &:not(:first-child):not(:last-child) {
      border-radius: var(--el-border-radius-base);
    }
  }
}
*/
  .select-control {
    display: flex;
    justify-content: flex-end;
    margin: 10px 3px 0px 3px;

    & > .el-button {
      margin-left: 6px;
      background-color: var(--el-color-info-light-7);
    }
  }
</style>
