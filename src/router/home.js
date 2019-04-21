import VueRouter from 'vue-router';
import welcome from '../components/Welcome';
const router = new VueRouter({
  routes: [
    {path: '/welcome', component: welcome}
  ]
});

export default router;
