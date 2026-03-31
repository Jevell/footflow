<script setup lang="ts">
import Breadcrumbs from './Breadcrumbs.vue';
import { cn } from '@/src/lib/utils';

defineProps<{
  title: string;
  breadcrumbs?: { title: string; path?: string }[];
  className?: string;
}>();
</script>

<template>
  <div :className="cn('mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4', className)">
    <div>
      <Breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" className="mb-2" />
      <h1 className="text-2xl font-black text-slate-900 tracking-tight">{{ title }}</h1>
    </div>
    <div v-if="$slots.actions" className="flex items-center space-x-3">
      <slot name="actions" />
    </div>
  </div>
</template>
