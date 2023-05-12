<template>
  <VueEchart
    v-for="info in infos"
    :key="info.id"
    :info="info"
    :active-id="activeId"
    position="TOP"
    view-type="BASIC"
    @handle-click="handleClick"
  />
  <VueEchart position="TOP" view-type="ADD" @handle-click="handleClick" />
</template>

<script setup>
  import VueEchart from '@/components/chart/VueEchart.vue'
  import { reactive, ref } from 'vue'

  const infos = reactive([
    {
      id: 'TEST',
      title: {
        name: '인구 증감률',
        desc: '확인 테스트',
      },
      subTitle: {
        name: '10.5%',
        isIcon: true,
        isIconType: true,
      },
      bottomTitle: {
        name: '속초시 0.2%',
        isIcon: true,
        isIconType: false,
      },
    },
    {
      id: 'TEST2',
      title: {
        name: '지가 변동률',
        desc: '확인 지가변동률',
      },
      subTitle: {
        name: '15.6%',
        isIcon: true,
        isIconType: true,
      },
      bottomTitle: {
        name: '속초시 5.4%',
        isIcon: true,
        isIconType: true,
      },
    },
    {
      id: 'TEST3',
      title: {
        name: '개발행위허가건수',
        desc: '',
      },
      subTitle: {
        name: '125건',
        isIcon: true,
        isIconType: false,
      },
      bottomTitle: {
        name: '속초시 2.4%',
        isIcon: false,
        isIconType: true,
      },
    },
  ])

  const activeId = ref('')
  function handleClick(args) {
    if (args.type == 'ADD') {
      //지표추가
      alert('추가')
      infos.push({
        id: 'TEST4',
        title: {
          name: '개발행위 없음',
          desc: '',
        },
        subTitle: {
          name: '120건',
          isIcon: false,
          isIconType: false,
        },
        bottomTitle: {
          name: '속초시 2.4%',
          isIcon: false,
          isIconType: true,
        },
      })
    } else if (args.type == 'BASIC') {
      //기본 지표
      activeId.value = args.id
    } else {
      // 차트
      console.log(args)
    }
  }
</script>

<style></style>
