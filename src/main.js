import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
//添加路由
import router from './router'
//添加基本css文件
import '@/assets/css/base'
import '@/assets/scss/base'
import '@/assets/font/font'
const app=createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
