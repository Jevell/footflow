<script setup lang="ts">
import { cn } from '@/src/lib/utils';

defineProps<{
  title?: string;
  extra?: any;
  className?: string;
  noPadding?: boolean;
}>();
</script>

<template>
  <div :className="cn('bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden', className)">
    <div v-if="title || $slots.extra" className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <h3 v-if="title" className="text-base font-bold text-slate-800 tracking-tight">{{ title }}</h3>
      <div v-if="$slots.extra">
        <slot name="extra" />
      </div>
    </div>
    <div :className="cn(noPadding ? '' : 'p-6')">
      <slot />
    </div>
  </div>
</template>
