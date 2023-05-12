import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/views/Main.vue'
import Default from '@/views/Default.vue'
import { useAuthStore } from '@/stores/auth.js'

const base = import.meta.env.VITE_APP_CONTEXT

const routes = [
  {
    //기본 세션체크용
    path: '/',
    component: Default,
  },
  {
    //메인화면
    path: '/main',
    component: Main,
  },
  {
    //샘플
    path: '/sample',
    component: () => import('@/views/sample/SampleMain.vue'),
    children: [
      {
        name: 'user',
        path: 'user',
        component: () => import('@/views/Sample.vue'),
      },
      {
        name: 'board',
        path: 'board',
        component: () => import('@/views/sample/BoardMain.vue'),
        children: [
          {
            path: 'user',
            component: () => {},
          },
        ],
      },
    ],
  },
  {
    // UI
    path: '/work',
    name: 'work',
    redirect: '/work/plannedAreaAnalysis',
    component: () => import('@/views/work/index.vue'),
    children: [
      {
        path: 'plannedAreaAnalysis',
        name: 'plannedAreaAnalysis',
        meta: {
          title: '계획구역 분석',
        },
        components: {
          menuContent: () => import('@/views/work/plannedAreaAnalysis/menuContent/index.vue'),
          mainContent: () => import('@/views/work/plannedAreaAnalysis/mainContent/index.vue'),
        },
      },
      {
        path: 'plannedAreaMonitoring',
        name: 'plannedAreaMonitoring',
        meta: {
          title: '계획구역 모니터링',
        },
        components: {
          menuContent: () => import('@/views/work/plannedAreaMonitoring/menuContent/index.vue'),
          mainContent: () => import('@/views/work/plannedAreaMonitoring/mainContent/index.vue'),
        },
      },
      {
        path: 'operationGMPlan',
        name: 'operationGMPlan',
        meta: {
          title: '성장관리계획 운영',
        },
        components: {
          menuContent: () => import('@/views/work/operationGMPlan/menuContent/index.vue'),
          mainContent: () => import('@/views/work/operationGMPlan/mainContent/index.vue'),
        },
      },
    ],
  },
  {
    //관리자
    path: '/admin',
    component: () => import('@/views/admin/Main.vue'),
    children: [
      {
        path: 'users',
        component: () => import('@/views/admin/Users.vue'),
      },
      {
        path: 'code',
        component: () => import('@/views/admin/CodeMain.vue'),
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(base),
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  const { isLoggedIn } = storeToRefs(store)

  if (!(to.path === '/' || to.path === '/main') && !isLoggedIn.value) {
    store.setPath(to.path)
    next({ path: '/' })
  } else if (to.path === '/' && isLoggedIn.value) {
    next({ path: '/main' })
  } else {
    next()
  }
})

export default router
