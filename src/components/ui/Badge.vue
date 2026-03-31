<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/src/lib/utils';

const props = defineProps<{
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  className?: string;
}>();

const variantClasses = {
  success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  warning: 'bg-amber-50 text-amber-600 border-amber-100',
  error: 'bg-rose-50 text-rose-600 border-rose-100',
  info: 'bg-blue-50 text-blue-600 border-blue-100',
  default: 'bg-slate-50 text-slate-600 border-slate-100',
};

const classes = computed(() => cn(
  'px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider',
  variantClasses[props.variant || 'default'],
  props.className
));
</script>

<template>
  <span :className="classes">
    <slot />
  </span>
</template>
