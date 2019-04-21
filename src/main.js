import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/global.css';
// 导入element-ui和静态资源
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入bootstrap 样式
import 'bootstrap/dist/css/bootstrap.css';
// 导入字体图标的CSS文件
import './assets/fonts/iconfont.css';
// 导入axios
import axios from './http';
// 把axios添加到vue的原型中，方便在后面使用
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
// 设置element-ui的全局样式 大小设置为 小
Vue.use(ElementUI, {size: 'small'});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
