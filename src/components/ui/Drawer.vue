<script setup lang="ts">
import { X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

defineProps<{
  isOpen: boolean;
  title: string;
  className?: string;
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <div 
    v-if="isOpen"
    className="fixed inset-0 z-50 flex justify-end"
  >
    <!-- Backdrop -->
    <div 
      @click="emit('close')"
      className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
    />
    
    <!-- Panel -->
    <div 
      :className="cn(
        'relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full',
        className
      )"
    >
      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">{{ title }}</h2>
        <button 
          @click="emit('close')"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <slot />
      </div>
      
      <div v-if="$slots.footer" className="p-6 border-t border-slate-100 bg-slate-50/50">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
