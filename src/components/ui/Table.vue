<script setup lang="ts">
import { cn } from '@/src/lib/utils';

interface Column {
  key: string;
  title: string;
  render?: (value: any, row: any) => any;
  className?: string;
}

defineProps<{
  columns: Column[];
  data: any[];
  className?: string;
}>();
</script>

<template>
  <div :className="cn('w-full overflow-x-auto rounded-xl border border-slate-100', className)">
    <table className="w-full text-left border-collapse">
      <thead className="bg-slate-50/80 border-b border-slate-100">
        <tr>
          <th 
            v-for="col in columns" 
            :key="col.key" 
            :className="cn('px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest', col.className)"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        <tr 
          v-for="(row, idx) in data" 
          :key="idx" 
          className="hover:bg-slate-50/50 transition-colors group"
        >
          <td 
            v-for="col in columns" 
            :key="col.key" 
            :className="cn('px-6 py-4 text-sm text-slate-600 font-medium', col.className)"
          >
            <template v-if="col.render">
              <component :is="col.render(row[col.key], row)" />
            </template>
            <template v-else>
              {{ row[col.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
