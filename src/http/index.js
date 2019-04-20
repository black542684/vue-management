import axios from 'axios';
// 全局配置公用的路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
export default axios;
