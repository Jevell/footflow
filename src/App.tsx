import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PlaceholderPage } from './pages/Placeholder';
import { Login } from './pages/Login';
import { CredentialPage } from './pages/CredentialPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                
                {/* 凭证管理 */}
                <Route path="/inventory/overview" element={<CredentialPage />} />
                <Route path="/inventory/inbound" element={<PlaceholderPage title="入库管理" />} />
                <Route path="/inventory/outbound" element={<PlaceholderPage title="出库管理" />} />
                <Route path="/inventory/trash" element={<PlaceholderPage title="库存回收站" />} />
                
                {/* Apple ID管理器 */}
                <Route path="/apple/list" element={<PlaceholderPage title="Apple ID列表" />} />
                <Route path="/apple/tools" element={<PlaceholderPage title="Apple工具" />} />
                
                {/* 设备总览 */}
                <Route path="/device/list" element={<PlaceholderPage title="设备管理" />} />
                <Route path="/device/inbound" element={<PlaceholderPage title="入库设备管理" />} />
                <Route path="/device/outbound" element={<PlaceholderPage title="出库设备管理" />} />
                
                {/* 自动化入库 */}
                <Route path="/automation/tasks" element={<PlaceholderPage title="入库任务管理" />} />
                <Route path="/automation/generate" element={<PlaceholderPage title="任务生成" />} />
                
                {/* 客户管理 */}
                <Route path="/customer/merchants" element={<PlaceholderPage title="商户列表" />} />
                <Route path="/customer/pricing" element={<PlaceholderPage title="商户定价" />} />
                <Route path="/customer/funds" element={<PlaceholderPage title="商户资金管理" />} />
                
                {/* 其他一级菜单 */}
                <Route path="/orders" element={<PlaceholderPage title="订单管理" />} />
                <Route path="/products" element={<PlaceholderPage title="商品管理" />} />
                <Route path="/finance" element={<PlaceholderPage title="财务报表" />} />
                <Route path="/api-management" element={<PlaceholderPage title="接口管理" />} />
                
                {/* 系统设置 */}
                <Route path="/settings/gift-packs" element={<PlaceholderPage title="礼包档位设置" />} />
                <Route path="/settings/collection" element={<PlaceholderPage title="采集设置" />} />
                <Route path="/settings/roles" element={<PlaceholderPage title="角色管理" />} />
                <Route path="/settings/sub-accounts" element={<PlaceholderPage title="子账户管理" />} />
                <Route path="/settings/logs" element={<PlaceholderPage title="系统操作日志" />} />
                <Route path="/settings/alerts" element={<PlaceholderPage title="告警规则配置" />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
