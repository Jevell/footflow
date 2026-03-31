<script setup lang="ts">
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/src/lib/utils';

defineProps<{
  items: { title: string; path?: string }[];
  className?: string;
}>();
</script>

<template>
  <nav :className="cn('flex items-center space-x-2 text-xs font-medium text-slate-400', className)">
    <div className="flex items-center hover:text-blue-600 transition-colors cursor-pointer">
      <Home className="w-3 h-3 mr-1" />
      <span>首页</span>
    </div>
    <div v-for="(item, index) in items" :key="index" className="flex items-center space-x-2">
      <ChevronRight className="w-3 h-3 text-slate-300" />
      <span 
        :className="cn(
          'transition-colors',
          index === items.length - 1 ? 'text-slate-600 font-bold' : 'hover:text-blue-600 cursor-pointer'
        )"
      >
        {{ item.title }}
      </span>
    </div>
  </nav>
</template>
