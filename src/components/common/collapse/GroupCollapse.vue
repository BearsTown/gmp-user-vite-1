<template>
  <div style="margin: 5px">
    <div :class="['common-collapse', 'group-collapse']" @click="toggle">
      <div>
        <div>
          <el-icon class="icon-caret-collapse" :class="{ 'is-open': isOpen }">
            <CaretRight />
          </el-icon>
        </div>

        <div class="title">
          {{ title }}
        </div>

        <div @click.prevent.stop>
          <slot name="sub"></slot>
        </div>
      </div>
    </div>

    <el-collapse-transition>
      <div v-show="isOpen" :class="{ 'is-left-margin': props.useLeftMargin }">
        <slot name="content"></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useBoolean } from '@/hooks/useBoolean'

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    useLeftMargin: {
      type: Boolean,
      default: false,
    },
  })

  const { isBoolRef: isOpen, toggle } = useBoolean(props.isOpen)

  onMounted(() => {})

  defineExpose({})
</script>

<style scoped lang="scss">
  .group-collapse {
    padding: 3px;
  }

  .is-left-margin {
    margin-left: 15px;
  }
</style>
