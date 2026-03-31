import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Box, 
  Apple, 
  Smartphone, 
  Zap, 
  Users, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Globe, 
  Settings,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  History,
  ShieldCheck,
  BellRing,
  Trash2,
  PlusCircle,
  MinusCircle,
  List,
  Wrench,
  Database,
  ArrowRightLeft,
  FileText,
  Activity
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  children?: { title: string; path: string; icon?: React.ElementType }[];
}

const menuItems: MenuItem[] = [
  { title: '仪表盘', icon: LayoutDashboard, path: '/' },
  { 
    title: '凭证管理', 
    icon: Box, 
    children: [
      { title: '凭证列表', path: '/inventory/overview' },
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
  { title: '商品管理', icon: Package, path: '/products' },
  { title: '财务报表', icon: BarChart3, path: '/finance' },
  { title: '接口管理', icon: Globe, path: '/api-management' },
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

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const location = useLocation();

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const isActive = (path?: string) => location.pathname === path;
  const isChildActive = (children?: { path: string }[]) => 
    children?.some(child => location.pathname === child.path);

  return (
    <div className={cn(
      "h-screen bg-[#001529] text-gray-300 transition-all duration-300 flex flex-col sticky top-0",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 bg-[#002140] overflow-hidden whitespace-nowrap">
        <div className="w-8 h-8 bg-blue-600 rounded flex-shrink-0 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/50">
          L
        </div>
        {!collapsed && (
          <span className="ml-3 text-white font-bold text-lg tracking-widest uppercase">LOOTFLOW</span>
        )}
      </div>

      {/* Menu Area */}
      <div className="flex-1 overflow-y-auto py-6 scrollbar-hide">
        {menuItems.map((item) => {
          const hasChildren = !!item.children;
          const isOpen = openMenus.includes(item.title);
          const active = isActive(item.path) || isChildActive(item.children);

          return (
            <div key={item.title} className="mb-1 px-3">
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group",
                      active ? "text-white bg-blue-600/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 flex-shrink-0", active ? "text-blue-400" : "text-slate-400 group-hover:text-white")} />
                    {!collapsed && (
                      <>
                        <span className="ml-3 flex-1 text-left text-sm font-medium">{item.title}</span>
                        {isOpen ? <ChevronDown className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />}
                      </>
                    )}
                  </button>
                  {!collapsed && isOpen && (
                    <div className="mt-1 space-y-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "flex items-center pl-11 pr-3 py-2 text-sm rounded-lg transition-all duration-200",
                            isActive(child.path) ? "text-white bg-blue-600 font-medium" : "text-slate-500 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path!}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive(item.path) ? "text-white bg-blue-600 shadow-lg shadow-blue-900/20" : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive(item.path) ? "text-white" : "text-slate-400 group-hover:text-white")} />
                  {!collapsed && <span className="ml-3 text-sm font-medium">{item.title}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 flex items-center justify-center border-t border-gray-800 hover:bg-[#002140] transition-colors"
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </div>
  );
}
