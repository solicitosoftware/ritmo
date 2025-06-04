import { ReactNode } from 'react';
import Link from 'next/link';
import { LuLayoutDashboard, LuPackage, LuTags } from 'react-icons/lu';

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LuLayoutDashboard,
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: LuPackage,
  },
  {
    title: 'Categories',
    href: '/dashboard/categories',
    icon: LuTags,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface shadow-md">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-base font-poppins">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-2.5 text-text-muted rounded-lg hover:bg-muted hover:text-primary transition-colors font-inter"
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 