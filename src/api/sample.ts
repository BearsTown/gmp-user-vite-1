import { ref } from 'vue'

export interface Temp {
  a: string
  b?: number
}

const data = ref<Temp>({
  a: '1',
})
process.cwd()
data.value.a = '1'
// data.value.b = '1';
data.value.c = 111
