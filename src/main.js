import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import Antd from 'ant-design-vue'
import Vant from 'vant'
import 'vant/lib/index.css'

// Vue.use(List);
import '@styles/index.less'
// 内置组件
import LayoutComponent from './layout'

router.beforeEach(async (to, from, next) => {
  if (decodeURIComponent(sessionStorage.getItem('token')) == 'admin321') {
    next()
  } else {
    location.href = '/login.html'
  }
})

const app = createApp(App)
// app.use(ElementPlus)
app.use(router)
app.use(Antd)
app.use(Vant)
app.use(LayoutComponent)

app.mount('#app')
