import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import pinia from './stores'
import router from './router'
import globals from './js/globals'

import './styles/common.scss'

const app = createApp(App)

//element ui 아이콘 적용
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//글로벌 사용 설정
app.use(globals)
app.use(ElementPlus, {})
app.use(router)
app.use(pinia)

app.mount('#app')
