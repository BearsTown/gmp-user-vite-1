<template>
  <el-aside :class="{ 'is-details-collapse': isDetailsCollapse }">
    <slot name="content"></slot>
  </el-aside>
  <button
    type="button"
    class="btn_hide_widget"
    :class="[{ 'is-details-collapse': isDetailsCollapse }]"
    @click="isDetailsCollapse = !isDetailsCollapse"
  >
    <el-icon>
      <ArrowLeft />
    </el-icon>
  </button>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const props = defineProps({
    isDetailsCollapse: {
      type: Boolean,
      default: true,
    },
  })

  const isDetailsCollapse = ref(props.isDetailsCollapse)

  onMounted(() => {})

  function openCollapse() {
    isDetailsCollapse.value = true
  }

  defineExpose({
    openCollapse,
  })
</script>

<style scoped lang="scss">
  :deep.el-aside {
    width: 450px;
    height: 100%;
    display: flex;
    padding: 5px;
    margin-left: 5px;
    margin-right: -455px;
    border-radius: 5px;
    box-sizing: border-box;
    flex-direction: column;
    background-color: var(--el-fill-color-blank);
    transition: all var(--el-transition-duration);

    &.is-details-collapse {
      margin-right: 0px;
    }
  }

  .btn_hide_widget {
    z-index: 10000;
    position: absolute;
    cursor: pointer;
    transform: translateY(-50%);
    top: 50%;
    width: 20px;
    height: 50px;
    padding: 0px;
    right: 5px;
    border: 1px solid #cbcbcb;
    border-right: none;
    background-color: #ffffff;
    border-radius: 8px 0px 0px 8px;
    transition: all var(--el-transition-duration);

    &.is-details-collapse {
      right: 455px;

      > .el-icon {
        transform: rotate(180deg);
      }
    }

    &:hover {
      border-color: var(--el-color-primary-light-7);
      background-color: var(--el-color-primary-light-9);

      > .el-icon {
        color: var(--el-color-primary);
      }
    }
  }
</style>
