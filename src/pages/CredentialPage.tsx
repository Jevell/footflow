import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Upload, 
  Download, 
  Eye, 
  FileText, 
  User, 
  Calendar, 
  Tag, 
  Hash, 
  Globe, 
  Coins, 
  Info,
  ChevronRight,
  Plus
} from 'lucide-react';
import { 
  PageHeader, 
  Button, 
  Card, 
  Table, 
  Badge, 
  Drawer, 
  Modal,
  BadgeVariant 
} from '../components/UIComponents';
import { cn } from '@/src/lib/utils';

// --- Mock Data ---
const MOCK_DATA = [
  {
    id: '1',
    gameName: '原神 (Genshin Impact)',
    appId: 'com.mihoyo.genshin',
    tierName: '6480 创世结晶',
    tierPrice: '648.00',
    tierCode: 'GI_6480',
    country: '中国',
    currency: 'CNY',
    inventoryNo: 'INV-20260331-001',
    status: 'in_stock',
    createdTime: '2026-03-31 10:00:00',
    inboundType: '批量导入',
    inboundUser: 'admin',
    inboundTime: '2026-03-31 10:05:00',
    outboundType: '-',
    outboundUser: '-',
    outboundTime: '-',
    inventoryId: 'STK-992831'
  },
  {
    id: '2',
    gameName: '王者荣耀 (Honor of Kings)',
    appId: 'com.tencent.tmgp.sgame',
    tierName: '1180 点券',
    tierPrice: '118.00',
    tierCode: 'HOK_1180',
    country: '中国',
    currency: 'CNY',
    inventoryNo: 'INV-20260331-002',
    status: 'outbound_success',
    createdTime: '2026-03-30 14:20:00',
    inboundType: '接口同步',
    inboundUser: 'system',
    inboundTime: '2026-03-30 14:25:00',
    outboundType: '订单核销',
    outboundUser: 'user_882',
    outboundTime: '2026-03-31 09:15:22',
    inventoryId: 'STK-112233'
  },
  {
    id: '3',
    gameName: 'PUBG Mobile',
    appId: 'com.tencent.ig',
    tierName: '6000+2100 UC',
    tierPrice: '99.99',
    tierCode: 'PUBG_8100',
    country: '美国',
    currency: 'USD',
    inventoryNo: 'INV-20260331-003',
    status: 'in_stock',
    createdTime: '2026-03-31 08:00:00',
    inboundType: '手动录入',
    inboundUser: 'operator_01',
    inboundTime: '2026-03-31 08:10:00',
    outboundType: '-',
    outboundUser: '-',
    outboundTime: '-',
    inventoryId: 'STK-445566'
  }
];

// --- Sub-components ---

const CredentialFilterBar = ({ onSearch, onReset }: { onSearch: () => void; onReset: () => void }) => {
  return (
    <Card className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">游戏名称</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索游戏名称..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">应用 ID</label>
          <input 
            type="text" 
            placeholder="请输入应用 ID" 
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">档位名称</label>
          <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
            <option value="">全部档位</option>
            <option value="1">6480 创世结晶</option>
            <option value="2">1180 点券</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">状态</label>
          <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
            <option value="">全部状态</option>
            <option value="in_stock">库内</option>
            <option value="outbound_success">出库成功</option>
          </select>
        </div>
        <div className="space-y-1.5 lg:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">入库时间</label>
          <div className="flex items-center space-x-2">
            <input 
              type="datetime-local" 
              step="1"
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
            />
            <span className="text-slate-400">至</span>
            <input 
              type="datetime-local" 
              step="1"
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">入库用户</label>
          <input 
            type="text" 
            placeholder="请输入入库用户" 
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">库存单号</label>
          <input 
            type="text" 
            placeholder="请输入库存单号" 
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end space-x-3 border-t border-slate-100 pt-6">
        <Button variant="outline" icon={RotateCcw} onClick={onReset}>重置</Button>
        <Button variant="primary" icon={Search} onClick={onSearch}>查询</Button>
      </div>
    </Card>
  );
};

const ImportCredentialModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="批量导入凭证"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button variant="primary" onClick={onClose}>确认导入</Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 hover:border-blue-300 transition-all cursor-pointer group">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm font-bold text-slate-700 mb-1">点击或拖拽文件至此处上传</p>
          <p className="text-xs text-slate-400">支持 Excel (.xlsx) 或 CSV 格式文件</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">凭证导入模板.xlsx</span>
          </div>
          <Button variant="ghost" size="sm" icon={Download} className="text-blue-600 hover:bg-blue-100">下载模板</Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">入库类型</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
              <option value="batch">批量导入</option>
              <option value="manual">手动录入</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">入库用户</label>
            <div className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 font-medium">
              admin (当前登录)
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">备注信息</label>
          <textarea 
            placeholder="请输入备注信息（可选）"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all min-h-[80px]"
          />
        </div>
      </div>
    </Modal>
  );
};

const ExportCredentialModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="批量导出凭证"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button variant="primary" onClick={onClose}>确认导出</Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start space-x-3">
          <Info className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-900">导出说明</p>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              系统将根据当前筛选条件导出凭证数据。单次导出上限为 50,000 条，如数据量过大请分批次导出。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-sm font-medium text-slate-700">导出范围</span>
            <Badge variant="info">当前筛选结果 (1,283 条)</Badge>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">导出字段</label>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-2">
              {['游戏名称', '应用 ID', '档位信息', '库存号', '凭证内容', '状态', '入库时间', '出库时间'].map(f => (
                <div key={f} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-slate-600">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const CredentialDetailDrawer = ({ isOpen, onClose, data }: { isOpen: boolean; onClose: () => void; data: any }) => {
  if (!data) return null;

  const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-1.5 bg-blue-50 rounded-lg">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{title}</h4>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value, isBadge, badgeVariant }: { label: string; value: string; isBadge?: boolean; badgeVariant?: BadgeVariant }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500 font-medium">{label}</span>
      {isBadge ? (
        <Badge variant={badgeVariant}>{value}</Badge>
      ) : (
        <span className="text-sm text-slate-900 font-bold">{value}</span>
      )}
    </div>
  );

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="凭证详情明细">
      <Section title="基本信息" icon={Tag}>
        <InfoItem label="游戏名称" value={data.gameName} />
        <InfoItem label="应用 ID" value={data.appId} />
        <InfoItem label="档位名称" value={data.tierName} />
        <InfoItem label="档位价格" value={`${data.currency} ${data.tierPrice}`} />
        <InfoItem label="档位编码" value={data.tierCode} />
        <InfoItem label="国家" value={data.country} />
        <InfoItem label="货币代码" value={data.currency} />
        <InfoItem label="库存号" value={data.inventoryNo} />
        <InfoItem 
          label="状态" 
          value={data.status === 'in_stock' ? '库内' : '出库成功'} 
          isBadge 
          badgeVariant={data.status === 'in_stock' ? 'success' : 'default'}
        />
      </Section>

      <Section title="入库信息" icon={Download}>
        <InfoItem label="入库类型" value={data.inboundType} />
        <InfoItem label="入库用户" value={data.inboundUser} />
        <InfoItem label="入库时间" value={data.inboundTime} />
        <InfoItem label="库存单号" value={data.inventoryId} />
      </Section>

      <Section title="出库信息" icon={Upload}>
        <InfoItem label="出库类型" value={data.outboundType} />
        <InfoItem label="出库用户" value={data.outboundUser} />
        <InfoItem label="出库时间" value={data.outboundTime} />
      </Section>

      <Section title="系统信息" icon={Info}>
        <InfoItem label="创建时间" value={data.createdTime} />
        <InfoItem label="更新时间" value={data.inboundTime} />
      </Section>
    </Drawer>
  );
};

// --- Main Page Component ---

export function CredentialPage() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<any>(null);

  const handleViewDetails = (record: any) => {
    setSelectedCredential(record);
    setIsDetailDrawerOpen(true);
  };

  const columns = [
    { title: '游戏名称', key: 'gameName', width: '200px' },
    { title: '应用 ID', key: 'appId', width: '180px' },
    { title: '档位名称', key: 'tierName', width: '150px' },
    { title: '档位价格', key: 'tierPrice', width: '100px', render: (val: any, record: any) => `${record.currency} ${val}` },
    { title: '状态', key: 'status', width: '120px', render: (val: any) => (
      <Badge variant={val === 'in_stock' ? 'success' : 'default'}>
        {val === 'in_stock' ? '库内' : '出库成功'}
      </Badge>
    )},
    { title: '库存号', key: 'inventoryNo', width: '180px' },
    { title: '入库时间', key: 'inboundTime', width: '180px' },
    { title: '入库用户', key: 'inboundUser', width: '120px' },
    { 
      title: '操作', 
      key: 'action', 
      width: '100px',
      render: (_: any, record: any) => (
        <button 
          onClick={() => handleViewDetails(record)}
          className="text-blue-600 font-bold hover:text-blue-700 flex items-center space-x-1 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>查看</span>
        </button>
      )
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <PageHeader 
        title="凭证列表" 
        breadcrumbs={[
          { label: '凭证管理' },
          { label: '凭证列表' }
        ]}
        actions={
          <>
            <Button variant="outline" icon={Upload} onClick={() => setIsImportModalOpen(true)}>导入凭证</Button>
            <Button variant="primary" icon={Download} onClick={() => setIsExportModalOpen(true)}>导出凭证</Button>
          </>
        }
      />

      <CredentialFilterBar 
        onSearch={() => {}} 
        onReset={() => {}} 
      />

      <Card noPadding className="shadow-xl shadow-slate-200/50">
        <div className="overflow-x-auto">
          <Table 
            columns={columns} 
            dataSource={MOCK_DATA} 
          />
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <span className="text-sm text-slate-500 font-medium">共 {MOCK_DATA.length} 条记录</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>上一页</Button>
            <div className="flex items-center space-x-1">
              <Button variant="primary" size="sm" className="w-8 h-8 p-0">1</Button>
            </div>
            <Button variant="outline" size="sm" disabled>下一页</Button>
          </div>
        </div>
      </Card>

      <ImportCredentialModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />

      <ExportCredentialModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
      />

      <CredentialDetailDrawer 
        isOpen={isDetailDrawerOpen} 
        onClose={() => setIsDetailDrawerOpen(false)} 
        data={selectedCredential}
      />
    </div>
  );
}
