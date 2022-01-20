import { createApp } from 'vue'
import App from './App.vue'
//添加路由
import router from './router'
//添加基本css文件
import '@/assets/css/base'
const app=createApp(App)
app.use(router)
app.mount('#app')
