<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/src/lib/utils';

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: any;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}>();

const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  outline: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const classes = computed(() => cn(
  baseStyles, 
  variants[props.variant || 'primary'], 
  sizes[props.size || 'md'], 
  props.className
));
</script>

<template>
  <button 
    :type="type || 'button'" 
    :disabled="disabled" 
    :className="classes"
  >
    <component 
      v-if="icon" 
      :is="icon" 
      :className="cn('w-4 h-4', $slots.default ? 'mr-2' : '')" 
    />
    <slot />
  </button>
</template>
