<template>
  <div style="margin: 5px">
    <div
      :class="['common-collapse', 'outside-collapse', { 'is-disabled': !isActive }]"
      @click="toggleOpen"
    >
      <div>
        <div style="width: 30px">
          <el-icon class="icon-caret-collapse" :class="{ 'is-open': isOpen }">
            <ArrowRight />
          </el-icon>
        </div>

        <div class="title">
          {{ title }}
        </div>

        <div class="func-button" @click.prevent.stop>
          <el-icon v-if="type === 'info'" @click.prevent.stop="$emit('info-click')">
            <InfoFilled />
          </el-icon>
          <el-switch
            v-else
            size="small"
            v-model="isActive"
            @click.prevent.stop
            @change="handleSwitchChange"
            style="
              --el-switch-on-color: var(--ugis-color-black);
              --el-switch-off-color: var(--ugis-color-gray);
            "
          />
        </div>
      </div>
    </div>

    <el-collapse-transition>
      <div v-show="isOpen">
        <div class="border-box-round" :class="{ 'is-disabled': !isActive }">
          <slot name="content"></slot>
        </div>
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

  // const isDisabled = computed(() => ({
  //   'is-disabled': !isActive.value,
  // }))

  onMounted(() => {})

  defineExpose({
    setSwitch,
  })
</script>

<style scoped lang="scss">
  .outside-collapse {
    background-color: var(--ugis-color-temp-3);
    transition: opacity var(--el-transition-duration);

    &:deep(.icon-caret-collapse) {
      color: var(--ugis-color-white);
    }

    & > div {
      .title {
        text-align: center;
        color: var(--ugis-color-white);
      }

      .func-button {
        width: 30px;
        justify-content: center;
        color: var(--ugis-color-white);
      }
    }
  }
</style>
