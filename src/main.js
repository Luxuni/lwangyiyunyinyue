import {createApp} from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
//添加路由
import router from "./router";
import moment from "moment";
//添加基本css文件
import "@/assets/css/base";
import "@/assets/scss/base";
import "@/assets/font/font";
import store from "./store";
const app = createApp (App);
app.use (router);
app.use (ElementPlus);
app.use (moment);
app.use (store);
app.mount ("#app");
