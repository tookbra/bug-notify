import Vue from 'vue';
import Router from 'vue-router';
import Setting from '@/views/setting/setting.vue';
import Main from '@/views/main.vue';
import Index from '@/views/system/index.vue';
import Config from '@/views/system/config.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index,
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting,
        },
        {
          path: 'config',
          name: 'config',
          component: Config,
        },
      ],
    },
  ],
});
