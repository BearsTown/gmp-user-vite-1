<template>
  <div class="border-box-round" style="padding: 0px 10px; margin: 5px">
    <div :class="['common-collapse', 'inside-collapse']" @click="toggleOpen">
      <div>
        <div class="title">
          {{ title }}
        </div>
        <div style="flex: 1">
          <slot name="sub"></slot>
        </div>
        <div>
          <el-icon class="icon-caret-collapse" :class="{ 'is-open': isOpen }">
            <CaretLeft />
          </el-icon>
        </div>
      </div>
    </div>

    <el-collapse-transition>
      <div v-show="isOpen" style="padding-bottom: 5px">
        <slot name="content"></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script setup>
  import { ref, onMounted, toRefs, computed } from 'vue'
  import { useBoolean } from '@/hooks/useBoolean'

  const props = defineProps({
    type: {
      type: String,
      default: 'switch', // ['info', 'switch']
    },
    title: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  })

  const { isBoolRef: isOpen, toggle: toggleOpen } = useBoolean(props.isOpen)
  const { isBoolRef: isActive, toggle: toggleActive } = useBoolean(props.isActive)

  const emits = defineEmits(['info-click', 'switch-change'])

  function setSwitch(val) {
    isActive.value = val
    handleSwitchChange(isActive.value)
  }

  function handleSwitchChange(val) {
    emits('switch-change', val)
  }

  onMounted(() => {})

  defineExpose({
    setSwitch,
  })
</script>

<style scoped lang="scss">
  .inside-collapse {
    padding: 0px;
    display: flex;
    align-items: center;

    &:deep(.icon-caret-collapse) {
      color: var(--ugis-color-temp-2);

      &.is-open {
        transform: rotate(-90deg);
      }
    }

    & > div {
      .title {
        flex: 0.5;
      }

      .func-button {
        width: 30px;
        justify-content: center;
        color: var(--ugis-color-white);
      }
    }
  }
</style>
