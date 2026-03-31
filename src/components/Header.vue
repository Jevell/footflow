<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Search, Bell, User, LogOut, HelpCircle } from 'lucide-react';

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  router.push('/login');
};
</script>

<template>
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm shadow-slate-100/50">
    <!-- Search Bar -->
    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-96 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500/50 transition-all">
      <Search className="w-4 h-4 text-slate-400" />
      <input 
        type="text" 
        placeholder="搜索功能、订单、商户..." 
        className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none text-slate-600 placeholder:text-slate-400"
      />
    </div>

    <!-- Right Actions -->
    <div className="flex items-center space-x-5">
      <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
          12
        </span>
      </button>
      
      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
        <HelpCircle className="w-5 h-5" />
      </button>

      <div className="flex items-center space-x-3 pl-5 border-l border-slate-200 group cursor-pointer">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">管理员</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Super Admin</p>
        </div>
        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
          <User className="w-5 h-5" />
        </div>
        <button 
          @click="handleLogout"
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
          title="退出登录"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
</template>
