import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"

import Antd from "ant-design-vue"
import Vant from "vant"
import "vant/lib/index.css"

// Vue.use(List);
import "@styles/index.less"
// 内置组件
import LayoutComponent from "./layout"

const app = createApp(App)
// app.use(ElementPlus)
app.use(router)
app.use(Antd)
app.use(Vant)
app.use(LayoutComponent)

app.mount("#app")
