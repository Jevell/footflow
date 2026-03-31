import React from 'react';
import { ChevronRight, Home, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

// --- Badge Component ---
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    error: 'bg-rose-50 text-rose-700 border-rose-100',
    info: 'bg-sky-50 text-sky-700 border-sky-100',
    default: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium border inline-flex items-center",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  className, 
  ...props 
}: ButtonProps) {
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

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {Icon && <Icon className={cn("w-4 h-4", children ? "mr-2" : "")} />}
      {children}
    </button>
  );
}

// --- Card Component ---
interface CardProps {
  children: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ children, title, extra, className, noPadding }: CardProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", className)}>
      {(title || extra) && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          {title && <h3 className="text-base font-semibold text-slate-800">{title}</h3>}
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className={cn(noPadding ? "" : "p-6")}>
        {children}
      </div>
    </div>
  );
}

// --- Breadcrumbs Component ---
interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
      <Link to="/" className="hover:text-blue-600 transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          {item.path ? (
            <Link to={item.path} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// --- Page Header Component ---
interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({ title, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {actions && <div className="flex items-center space-x-3">{actions}</div>}
      </div>
    </div>
  );
}

// --- Table Component ---
interface TableProps {
  columns: { title: string; key: string; render?: (val: any, record: any) => React.ReactNode; width?: string }[];
  dataSource: any[];
  className?: string;
}

export function Table({ columns, dataSource, className }: TableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            {columns.map((col) => (
              <th 
                key={col.key} 
                className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                style={{ width: col.width }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {dataSource.map((record, index) => (
            <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-slate-600">
                  {col.render ? col.render(record[col.key], record) : record[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Drawer Component ---
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children, footer }: DrawerProps) {
  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out transform flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end space-x-3 bg-slate-50/30">
            {footer}
          </div>
        )}
      </div>
    </>
  );
}

// --- Modal Component ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export function Modal({ isOpen, onClose, title, children, footer, width = "max-w-lg" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className={cn(
        "relative bg-white rounded-2xl shadow-2xl w-full transform transition-all overflow-hidden flex flex-col",
        width
      )}>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end space-x-3 bg-slate-50/30">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
