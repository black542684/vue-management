import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '../components/Home';
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
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
});

// 导航守卫,用来判断用户是否登录
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (to.path === '/login') {
    return next();
  }
  if (token) {
    return next();
  }
  next('/login');
  // to 去的路由对象
  // from 离开的路由对象
  // next() 调用下一个路由
  // next('/xxx') 去某个路由
});

export default router;
