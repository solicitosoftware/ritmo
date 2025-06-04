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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
} 