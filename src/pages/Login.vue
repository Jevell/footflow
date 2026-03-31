<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Lock, User, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button.vue';
import { cn } from '@/src/lib/utils';

const account = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const errors = ref<{ account?: string; password?: string }>({});
const router = useRouter();

const handleLogin = (e: Event) => {
  e.preventDefault();
  const newErrors: { account?: string; password?: string } = {};

  if (!account.value) newErrors.account = '请输入账号';
  if (!password.value) newErrors.password = '请输入密码';

  if (Object.keys(newErrors).length > 0) {
    errors.value = newErrors;
    return;
  }

  errors.value = {};
  loading.value = true;

  // Simulate login delay
  setTimeout(() => {
    loading.value = false;
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/');
  }, 1500);
};
</script>

<template>
  <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
    <!-- Background Decorative Elements -->
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px]" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-[120px]" />
    </div>

    <div className="w-full max-w-[440px] px-6 relative z-10">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <!-- Header Section -->
        <div className="pt-10 pb-6 text-center px-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-6 transform -rotate-3">
            <span className="text-white text-3xl font-black italic tracking-tighter">L</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">LOOTFLOW</h1>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">后台管理系统</p>
        </div>

        <!-- Form Section -->
        <form @submit="handleLogin" className="px-10 pb-12 space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">账号</label>
            <div :className="cn(
              'flex items-center bg-slate-50 border rounded-xl px-4 py-3 transition-all duration-200',
              errors.account ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50'
            )">
              <User className="w-5 h-5 text-slate-400 mr-3" />
              <input
                type="text"
                v-model="account"
                placeholder="请输入账号"
                className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-slate-700 placeholder:text-slate-300"
              />
            </div>
            <p v-if="errors.account" className="text-xs text-rose-500 font-medium ml-1">{{ errors.account }}</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">密码</label>
            <div :className="cn(
              'flex items-center bg-slate-50 border rounded-xl px-4 py-3 transition-all duration-200',
              errors.password ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50'
            )">
              <Lock className="w-5 h-5 text-slate-400 mr-3" />
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="请输入密码"
                className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-slate-700 placeholder:text-slate-300"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <component :is="showPassword ? EyeOff : Eye" className="w-5 h-5" />
              </button>
            </div>
            <p v-if="errors.password" className="text-xs text-rose-500 font-medium ml-1">{{ errors.password }}</p>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
              <span className="ml-2 text-xs text-slate-500 font-medium group-hover:text-slate-700 transition-colors">记住我</span>
            </label>
            <button type="button" className="text-xs text-blue-600 font-bold hover:text-blue-700 transition-colors">忘记密码？</button>
          </div>

          <Button
            type="submit"
            :disabled="loading"
            className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-blue-200"
          >
            <template v-if="loading">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              登录中...
            </template>
            <template v-else>
              立即登录
            </template>
          </Button>
        </form>

        <!-- Footer Info -->
        <div className="bg-slate-50/50 py-4 px-10 border-t border-slate-100 flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Admin Access Only</span>
        </div>
      </div>

      <p className="mt-8 text-center text-slate-400 text-xs font-medium">
        © 2026 LOOTFLOW. All Rights Reserved.
      </p>
    </div>
  </div>
</template>
