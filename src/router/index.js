import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '../components/home/Home';
import Welcome from '../components/home/Welcome';
import User from '../components/users/Users';
import Rights from '../components/auth/Rights';
import Roles from '../components/auth/Roles';
import Goods from '../components/commodity/goods';
// 导入进度条插件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({
  showSpinner: false
});
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/welcome',
      component: Home,
      children: [
        {path: '/welcome', name: 'welcome', component: Welcome},
        {path: '/users', name: 'users', component: User},
        {path: '/rights', name: 'rights', component: Rights},
        {path: '/roles', name: 'roles', component: Roles},
        {path: '/goods', name: 'goods', component: Goods}
      ]
    }
  ]
});

// 导航守卫,用来判断用户是否登录
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (to.path === '/login') {
    NProgress.start();
    return next();
  }
  if (token) {
    NProgress.start();
    return next();
  }
  next('/login');
  // to 去的路由对象
  // from 离开的路由对象
  // next() 调用下一个路由
  // next('/xxx') 去某个路由
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
