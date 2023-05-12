import { createPinia } from 'pinia'
import { cloneDeep } from 'lodash'

function resetStore({ store }) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}

const pinia = createPinia()
pinia.use(resetStore)

export default pinia
