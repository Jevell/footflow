<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Eye, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.vue';
import Button from '../components/ui/Button.vue';
import Card from '../components/ui/Card.vue';
import Table from '../components/ui/Table.vue';
import Badge from '../components/ui/Badge.vue';
import Drawer from '../components/ui/Drawer.vue';
import { cn } from '@/src/lib/utils';

const props = defineProps<{
  title: string;
}>();

const isDrawerOpen = ref(false);
const selectedItem = ref<any>(null);

const columns = [
  { key: 'id', title: '编号' },
  { key: 'name', title: '名称' },
  { key: 'category', title: '分类' },
  { 
    key: 'status', 
    title: '状态',
    render: (val: string) => {
      const variants: any = { active: 'success', pending: 'warning', inactive: 'error' };
      const labels: any = { active: '正常', pending: '待处理', inactive: '已禁用' };
      return {
        template: `<Badge variant="${variants[val]}">${labels[val]}</Badge>`,
        components: { Badge }
      };
    }
  },
  { key: 'updatedAt', title: '最后更新' },
  { 
    key: 'actions', 
    title: '操作',
    className: 'text-right',
    render: (_: any, row: any) => {
      return {
        template: `
          <div class="flex items-center justify-end space-x-2">
            <Button variant="ghost" size="sm" :icon="Eye" @click="handleView(row)" />
            <Button variant="ghost" size="sm" :icon="Edit2" class="text-blue-600" />
            <Button variant="ghost" size="sm" :icon="Trash2" class="text-rose-600" />
          </div>
        `,
        components: { Button },
        data() { return { Eye, Edit2, Trash2, row }; },
        methods: { handleView: (r: any) => handleView(r) }
      };
    }
  },
];

const mockData = [
  { id: '1001', name: '示例数据 A', category: '分类一', status: 'active', updatedAt: '2024-03-30 10:24' },
  { id: '1002', name: '示例数据 B', category: '分类二', status: 'pending', updatedAt: '2024-03-30 11:15' },
  { id: '1003', name: '示例数据 C', category: '分类一', status: 'active', updatedAt: '2024-03-30 12:44' },
  { id: '1004', name: '示例数据 D', category: '分类三', status: 'inactive', updatedAt: '2024-03-30 14:02' },
  { id: '1005', name: '示例数据 E', category: '分类二', status: 'active', updatedAt: '2024-03-30 15:32' },
];

const handleView = (item: any) => {
  selectedItem.value = item;
  isDrawerOpen.value = true;
};
</script>

<template>
  <div className="space-y-6 animate-in fade-in duration-500">
    <PageHeader :title="title" :breadcrumbs="[{ title: '管理中心' }, { title }]">
      <template #actions>
        <Button variant="outline" :icon="Download">导出</Button>
        <Button :icon="Plus">新增记录</Button>
      </template>
    </PageHeader>

    <!-- Filter Area -->
    <Card className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="搜索关键词..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all">
            <option>全部状态</option>
            <option>正常</option>
            <option>待处理</option>
            <option>已禁用</option>
          </select>
          <Button variant="outline" :icon="Filter">更多筛选</Button>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          共计 1,248 条记录
        </div>
      </div>
    </Card>

    <!-- Data Table -->
    <Card noPadding>
      <Table :columns="columns" :data="mockData" />
      
      <!-- Pagination -->
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Page 1 of 124
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" :icon="ChevronLeft" disabled>上一页</Button>
          <div className="flex items-center space-x-1">
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-200">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors">3</button>
            <span className="px-2 text-slate-300">...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors">124</button>
          </div>
          <Button variant="outline" size="sm" :icon="ChevronRight">下一页</Button>
        </div>
      </div>
    </Card>

    <!-- Detail Drawer -->
    <Drawer 
      :isOpen="isDrawerOpen" 
      :title="title + ' 详情'"
      @close="isDrawerOpen = false"
    >
      <div v-if="selectedItem" className="space-y-8">
        <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
            <span className="text-2xl font-black italic tracking-tighter">L</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{{ selectedItem.name }}</h3>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-1">ID: {{ selectedItem.id }}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">当前状态</p>
            <div className="pt-1">
              <Badge :variant="selectedItem.status === 'active' ? 'success' : selectedItem.status === 'pending' ? 'warning' : 'error'">
                {{ selectedItem.status === 'active' ? '正常运行' : selectedItem.status === 'pending' ? '等待审核' : '已禁用' }}
              </Badge>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">所属分类</p>
            <p className="text-sm font-bold text-slate-700">{{ selectedItem.category }}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">创建时间</p>
            <p className="text-sm font-bold text-slate-700">2024-01-12 09:44:12</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">最后更新</p>
            <p className="text-sm font-bold text-slate-700">{{ selectedItem.updatedAt }}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">备注信息</p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-500 leading-relaxed font-medium">
            这是一段关于该记录的详细描述信息。系统会自动记录每一次状态变更和操作日志，确保数据的可追溯性。如果需要修改，请点击下方的编辑按钮。
          </div>
        </div>
      </div>

      <template #footer>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex-1" @click="isDrawerOpen = false">取消</Button>
          <Button className="flex-1">保存修改</Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>
