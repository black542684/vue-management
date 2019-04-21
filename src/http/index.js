import axios from 'axios';
// 全局配置公用的路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

// 在所有的请求中的请求头携带token信息
axios.interceptors.request.use(config => {
  // 给config添加新的信息
  // config可以给请求头追加属性
  config.headers.Authorization = sessionStorage.getItem('token');
  return config;
});

// 判断session是否失效
axios.interceptors.response.use(res => {
  // 判断 token 是否失效
  if (res.data.meta.status === 401) {
    location.href = '#/login';
  } else {
    return res;
  }
});

export default axios;
