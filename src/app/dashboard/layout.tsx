'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { LuLayoutDashboard, LuPackage, LuTags, LuMenu } from 'react-icons/lu';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={`fixed md:relative z-20 h-full bg-surface shadow-md transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-0 md:w-16 overflow-hidden'
        }`}
      >
        <div className={`p-6 border-b border-border flex items-center justify-between ${
          isSidebarOpen ? '' : 'px-4'
        }`}>
          <h2 className={`text-xl font-semibold text-text-base font-poppins transition-opacity duration-200 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'
          }`}>
            Admin Panel
          </h2>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2.5 text-text-muted rounded-lg hover:bg-muted hover:text-primary transition-colors font-inter ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
                title={!isSidebarOpen ? item.title : undefined}
              >
                <Icon className="w-5 h-5 min-w-[1.25rem]" />
                {isSidebarOpen && <span className="ml-3 font-medium">{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <LuMenu className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 