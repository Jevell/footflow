<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Smartphone,
  Apple,
  RefreshCw,
  Download
} from 'lucide-react';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import PageHeader from '../components/ui/PageHeader.vue';
import Button from '../components/ui/Button.vue';
import Card from '../components/ui/Card.vue';
import Table from '../components/ui/Table.vue';
import Badge from '../components/ui/Badge.vue';
import { cn } from '@/src/lib/utils';

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const revenueOption = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['03-24', '03-25', '03-26', '03-27', '03-28', '03-29', '03-30'],
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#94a3b8' }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#f1f5f9' } }
    }
  ],
  series: [
    {
      name: '营收',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#3b82f6'
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.1,
        color: '#3b82f6'
      },
      emphasis: {
        focus: 'series'
      },
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490]
    }
  ]
});

const deviceOption = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '5%',
    left: 'center',
    icon: 'circle',
    textStyle: { color: '#64748b' }
  },
  series: [
    {
      name: '设备分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 400, name: 'iPhone 15', itemStyle: { color: '#3b82f6' } },
        { value: 300, name: 'iPhone 14', itemStyle: { color: '#10b981' } },
        { value: 300, name: 'iPhone 13', itemStyle: { color: '#f59e0b' } },
        { value: 200, name: '其他', itemStyle: { color: '#ef4444' } },
      ]
    }
  ]
});

const latestOrders = [
  { id: 'ORD-2024033001', merchant: '游戏工坊', amount: '¥1,280.00', status: 'completed', time: '10:24:32' },
  { id: 'ORD-2024033002', merchant: '充值中心', amount: '¥560.00', status: 'processing', time: '10:25:15' },
  { id: 'ORD-2024033003', merchant: '极速代充', amount: '¥2,100.00', status: 'completed', time: '10:28:44' },
  { id: 'ORD-2024033004', merchant: '全球购', amount: '¥89.00', status: 'failed', time: '10:30:02' },
  { id: 'ORD-2024033005', merchant: '游戏工坊', amount: '¥450.00', status: 'completed', time: '10:32:18' },
];

const orderColumns = [
  { key: 'id', title: '订单编号' },
  { key: 'merchant', title: '商户名称' },
  { key: 'amount', title: '金额' },
  { 
    key: 'status', 
    title: '状态',
    render: (val: string) => {
      const variants: any = { completed: 'success', processing: 'info', failed: 'error' };
      const labels: any = { completed: '已完成', processing: '处理中', failed: '已失败' };
      return {
        template: `<Badge variant="${variants[val]}">${labels[val]}</Badge>`,
        components: { Badge }
      };
    }
  },
  { key: 'time', title: '下单时间' },
];

const inventoryAlerts = [
  { name: '美区 Apple ID', stock: 12, threshold: 50, status: 'critical' },
  { name: '日区 Apple ID', stock: 45, threshold: 100, status: 'warning' },
  { name: '港区 Apple ID', stock: 8, threshold: 30, status: 'critical' },
];

const alertColumns = [
  { key: 'name', title: '资源名称' },
  { key: 'stock', title: '当前库存' },
  { key: 'threshold', title: '告警阈值' },
  { 
    key: 'status', 
    title: '风险等级',
    render: (val: string) => {
      const variants: any = { critical: 'error', warning: 'warning' };
      const labels: any = { critical: '极低', warning: '较低' };
      return {
        template: `<Badge variant="${variants[val]}">${labels[val]}</Badge>`,
        components: { Badge }
      };
    }
  },
];
</script>

<template>
  <div className="space-y-8 animate-in fade-in duration-500">
    <PageHeader title="仪表盘概览" :breadcrumbs="[{ title: '仪表盘' }]">
      <template #actions>
        <Button variant="outline" :icon="RefreshCw">刷新数据</Button>
        <Button :icon="Download">导出报表</Button>
      </template>
    </PageHeader>

    <!-- KPI Cards -->
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Wallet className="w-6 h-6" />
          </div>
          <MoreHorizontal className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">今日总营收</p>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">¥128,430.00</h2>
        <div className="flex items-center mt-2">
          <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
          <span className="text-xs font-bold text-emerald-500">+12.5%</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase ml-2 tracking-tighter">VS YESTERDAY</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <MoreHorizontal className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">今日订单数</p>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">1,240</h2>
        <div className="flex items-center mt-2">
          <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
          <span className="text-xs font-bold text-emerald-500">+8.2%</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase ml-2 tracking-tighter">VS YESTERDAY</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Users className="w-6 h-6" />
          </div>
          <MoreHorizontal className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">活跃商户数</p>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">86</h2>
        <div className="flex items-center mt-2">
          <ArrowDownRight className="w-4 h-4 text-rose-500 mr-1" />
          <span className="text-xs font-bold text-rose-500">-2.4%</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase ml-2 tracking-tighter">VS YESTERDAY</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <TrendingUp className="w-6 h-6" />
          </div>
          <MoreHorizontal className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">库存预警</p>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">12</h2>
        <div className="flex items-center mt-2">
          <span className="text-xs font-bold text-amber-500">需要关注</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase ml-2 tracking-tighter">URGENT ACTION</span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card title="营收趋势" className="lg:col-span-2">
        <div className="h-[300px] w-full">
          <VChart :option="revenueOption" autoresize />
        </div>
      </Card>
      <Card title="设备分布">
        <div className="h-[300px] w-full">
          <VChart :option="deviceOption" autoresize />
        </div>
      </Card>
    </div>

    <!-- Tables Section -->
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="最新订单" noPadding>
        <Table :columns="orderColumns" :data="latestOrders" />
      </Card>
      <Card title="库存预警" noPadding>
        <Table :columns="alertColumns" :data="inventoryAlerts" />
      </Card>
    </div>
  </div>
</template>
