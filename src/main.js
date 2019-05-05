import Vue from 'vue';
import App from './App';
import router from './router';
// 导入element-ui和静态资源
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入moment 处理时间
import moment from 'moment';
// 导入bootstrap 样式
import 'bootstrap/dist/css/bootstrap.css';
// 导入字体图标的CSS文件
import './assets/fonts/iconfont.css';
// 全局样式
import './assets/css/global.css';
// 导入axios
import axios from './http';
// 导入vue-quill-editor富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
// 把富文本编辑器注册为中间件
Vue.use(VueQuillEditor);
// 把axios添加到vue的原型中，方便在后面使用
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
// 把moment 作为过滤器使用
Vue.filter('formatTime', function (value) {
  return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss');
});
// 设置element-ui的全局样式 大小设置为 小
Vue.use(ElementUI, {size: 'small'});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
