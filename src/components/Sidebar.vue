<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  LayoutDashboard, 
  Package, 
  Apple, 
  Smartphone, 
  Zap, 
  Users, 
  ShoppingCart, 
  Box, 
  BarChart3, 
  Cpu, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const props = defineProps<{
  isCollapsed: boolean;
}>();

const emit = defineEmits(['toggle']);

const route = useRoute();
const router = useRouter();

const menuItems = [
  { 
    title: '仪表盘', 
    icon: LayoutDashboard, 
    path: '/' 
  },
  { 
    title: '库存管理', 
    icon: Package, 
    children: [
      { title: '库存总览', path: '/inventory/overview' },
      { title: '入库管理', path: '/inventory/inbound' },
      { title: '出库管理', path: '/inventory/outbound' },
      { title: '库存回收站', path: '/inventory/trash' },
    ]
  },
  { 
    title: 'Apple ID管理器', 
    icon: Apple, 
    children: [
      { title: 'Apple ID列表', path: '/apple/list' },
      { title: 'Apple工具', path: '/apple/tools' },
    ]
  },
  { 
    title: '设备总览', 
    icon: Smartphone, 
    children: [
      { title: '设备管理', path: '/device/list' },
      { title: '入库设备管理', path: '/device/inbound' },
      { title: '出库设备管理', path: '/device/outbound' },
    ]
  },
  { 
    title: '自动化入库', 
    icon: Zap, 
    children: [
      { title: '入库任务管理', path: '/automation/tasks' },
      { title: '任务生成', path: '/automation/generate' },
    ]
  },
  { 
    title: '客户管理', 
    icon: Users, 
    children: [
      { title: '商户列表', path: '/customer/merchants' },
      { title: '商户定价', path: '/customer/pricing' },
      { title: '商户资金管理', path: '/customer/funds' },
    ]
  },
  { title: '订单管理', icon: ShoppingCart, path: '/orders' },
  { title: '商品管理', icon: Box, path: '/products' },
  { title: '财务报表', icon: BarChart3, path: '/finance' },
  { title: '接口管理', icon: Cpu, path: '/api-management' },
  { 
    title: '系统设置', 
    icon: Settings, 
    children: [
      { title: '礼包档位设置', path: '/settings/gift-packs' },
      { title: '采集设置', path: '/settings/collection' },
      { title: '角色管理', path: '/settings/roles' },
      { title: '子账户管理', path: '/settings/sub-accounts' },
      { title: '系统操作日志', path: '/settings/logs' },
      { title: '告警规则配置', path: '/settings/alerts' },
    ]
  },
];

const openMenus = ref<string[]>([]);

const toggleMenu = (title: string) => {
  if (props.isCollapsed) return;
  const index = openMenus.value.indexOf(title);
  if (index > -1) {
    openMenus.value.splice(index, 1);
  } else {
    openMenus.value.push(title);
  }
};

const isActive = (path: string) => route.path === path;
const isParentActive = (item: any) => {
  if (item.path) return isActive(item.path);
  return item.children?.some((child: any) => isActive(child.path));
};

const navigate = (path: string) => {
  router.push(path);
};
</script>

<template>
  <aside 
    :className="cn(
      'bg-[#001529] text-slate-300 transition-all duration-300 flex flex-col sticky top-0 h-screen z-20 shadow-2xl',
      isCollapsed ? 'w-20' : 'w-64'
    )"
  >
    <!-- Logo Section -->
    <div className="h-16 flex items-center px-6 border-b border-white/5 overflow-hidden">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
          <span className="text-white font-black italic tracking-tighter">L</span>
        </div>
        <span 
          :className="cn(
            'text-white font-black text-xl tracking-tight transition-opacity duration-200',
            isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
          )"
        >
          LOOTFLOW
        </span>
      </div>
    </div>

    <!-- Navigation Menu -->
    <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
      <div v-for="item in menuItems" :key="item.title" className="px-3 mb-1">
        <!-- Single Menu Item -->
        <div v-if="!item.children">
          <button
            @click="navigate(item.path!)"
            :className="cn(
              'w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              isActive(item.path!) 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'hover:bg-white/5 hover:text-white'
            )"
          >
            <component :is="item.icon" :className="cn('w-5 h-5 flex-shrink-0', isActive(item.path!) ? 'text-white' : 'text-slate-400 group-hover:text-white')" />
            <span 
              :className="cn(
                'ml-3 text-sm font-medium transition-all duration-200',
                isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
              )"
            >
              {{ item.title }}
            </span>
            
            <!-- Tooltip for collapsed state -->
            <div v-if="isCollapsed" className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
              {{ item.title }}
            </div>
          </button>
        </div>

        <!-- Submenu Item -->
        <div v-else>
          <button
            @click="toggleMenu(item.title)"
            :className="cn(
              'w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              isParentActive(item) ? 'text-white' : 'hover:bg-white/5 hover:text-white'
            )"
          >
            <component :is="item.icon" :className="cn('w-5 h-5 flex-shrink-0', isParentActive(item) ? 'text-blue-400' : 'text-slate-400 group-hover:text-white')" />
            <span 
              :className="cn(
                'ml-3 text-sm font-medium transition-all duration-200 flex-1 text-left',
                isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
              )"
            >
              {{ item.title }}
            </span>
            <div v-if="!isCollapsed">
              <component :is="openMenus.includes(item.title) ? ChevronUp : ChevronDown" className="w-4 h-4 text-slate-500" />
            </div>
            
            <!-- Tooltip for collapsed state -->
            <div v-if="isCollapsed" className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
              {{ item.title }}
            </div>
          </button>

          <!-- Submenu Children -->
          <div 
            v-if="!isCollapsed && openMenus.includes(item.title)" 
            className="mt-1 space-y-1 ml-4 border-l border-white/5 pl-4"
          >
            <button
              v-for="child in item.children"
              :key="child.path"
              @click="navigate(child.path)"
              :className="cn(
                'w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200',
                isActive(child.path) 
                  ? 'text-blue-400 font-bold bg-blue-400/5' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              )"
            >
              {{ child.title }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Collapse Toggle -->
    <div className="p-4 border-t border-white/5">
      <button 
        @click="emit('toggle')"
        className="w-full h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
      >
        <component :is="isCollapsed ? ChevronRight : ChevronLeft" className="w-5 h-5" />
      </button>
    </div>
  </aside>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
