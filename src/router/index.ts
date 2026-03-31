import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/Layout.vue';
import Dashboard from '../pages/Dashboard.vue';
import Placeholder from '../pages/Placeholder.vue';
import Login from '../pages/Login.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
        },
        // 库存管理
        { path: 'inventory/overview', component: Placeholder, props: { title: '库存总览' } },
        { path: 'inventory/inbound', component: Placeholder, props: { title: '入库管理' } },
        { path: 'inventory/outbound', component: Placeholder, props: { title: '出库管理' } },
        { path: 'inventory/trash', component: Placeholder, props: { title: '库存回收站' } },
        
        // Apple ID管理器
        { path: 'apple/list', component: Placeholder, props: { title: 'Apple ID列表' } },
        { path: 'apple/tools', component: Placeholder, props: { title: 'Apple工具' } },
        
        // 设备总览
        { path: 'device/list', component: Placeholder, props: { title: '设备管理' } },
        { path: 'device/inbound', component: Placeholder, props: { title: '入库设备管理' } },
        { path: 'device/outbound', component: Placeholder, props: { title: '出库设备管理' } },
        
        // 自动化入库
        { path: 'automation/tasks', component: Placeholder, props: { title: '入库任务管理' } },
        { path: 'automation/generate', component: Placeholder, props: { title: '任务生成' } },
        
        // 客户管理
        { path: 'customer/merchants', component: Placeholder, props: { title: '商户列表' } },
        { path: 'customer/pricing', component: Placeholder, props: { title: '商户定价' } },
        { path: 'customer/funds', component: Placeholder, props: { title: '商户资金管理' } },
        
        // 其他一级菜单
        { path: 'orders', component: Placeholder, props: { title: '订单管理' } },
        { path: 'products', component: Placeholder, props: { title: '商品管理' } },
        { path: 'finance', component: Placeholder, props: { title: '财务报表' } },
        { path: 'api-management', component: Placeholder, props: { title: '接口管理' } },
        
        // 系统设置
        { path: 'settings/gift-packs', component: Placeholder, props: { title: '礼包档位设置' } },
        { path: 'settings/collection', component: Placeholder, props: { title: '采集设置' } },
        { path: 'settings/roles', component: Placeholder, props: { title: '角色管理' } },
        { path: 'settings/sub-accounts', component: Placeholder, props: { title: '子账户管理' } },
        { path: 'settings/logs', component: Placeholder, props: { title: '系统操作日志' } },
        { path: 'settings/alerts', component: Placeholder, props: { title: '告警规则配置' } },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
