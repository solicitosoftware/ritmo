"use client";

import type React from "react";
import { ReactNode, useState } from "react";
import {
  Sun,
  Moon,
  Users,
  Layers,
  ShoppingBag,
  Home,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useApp } from "../contexts/AppContext";
import NavItem from "../../components/sidebar/NavItem";
import UserInfo from "@/components/userInfo/UserInfo";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme, mounted } = useApp();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Durante SSR o antes de la hidratación, renderizar un layout mínimo
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          <div className="flex-1 p-4">{children}</div>
        </div>
      </div>
    );
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div className="relative">
        <aside
          className={`sidebar-container ${sidebarOpen ? "w-64" : "w-16"} ${
            theme === "light" ? "sidebar-light" : "sidebar-dark"
          }`}
        >
          <div
            className={`sidebar-header ${sidebarOpen ? "px-4" : "px-2"} ${
              theme === "light" ? "sidebar-header-light" : "sidebar-header-dark"
            }`}
          >
            {sidebarOpen ? (
              <div className="text-3xl font-bold text-yellow-400 neon-text">
                RITMO
              </div>
            ) : (
              <div className="user-avatar">R</div>
            )}
          </div>

          <nav className="sidebar-nav">
            <ul className="sidebar-nav-list">
              <NavItem
                icon={<Home size={20} />}
                label="Dashboard"
                active={isActive("/dashboard")}
                collapsed={!sidebarOpen}
                href="/dashboard"
              />
              <NavItem
                icon={<Users size={20} />}
                label="Users"
                active={isActive("/dashboard/users")}
                collapsed={!sidebarOpen}
                subItems={[
                  { label: "All Users", href: "/dashboard/users" },
                  { label: "Add User", href: "/dashboard/users/new" },
                  { label: "Roles", href: "/dashboard/users/roles" },
                ]}
              />
              <NavItem
                icon={<Layers size={20} />}
                label="Categories"
                active={isActive("/dashboard/categories")}
                collapsed={!sidebarOpen}
                subItems={[
                  { label: "All Categories", href: "/dashboard/categories" },
                  { label: "Add Category", href: "/dashboard/categories/new" },
                  { label: "Manage", href: "/dashboard/categories/manage" },
                ]}
              />
              <NavItem
                icon={<ShoppingBag size={20} />}
                label="Products"
                active={isActive("/dashboard/products")}
                collapsed={!sidebarOpen}
                subItems={[
                  { label: "All Products", href: "/dashboard/products" },
                  { label: "Add Product", href: "/dashboard/products/new" },
                  { label: "Inventory", href: "/dashboard/products/inventory" },
                  {
                    label: "Categories",
                    href: "/dashboard/products/categories",
                  },
                ]}
              />
            </ul>

            <div
              className={`sidebar-divider ${
                theme === "light"
                  ? "sidebar-divider-light"
                  : "sidebar-divider-dark"
              }`}
            >
              <ul className="sidebar-nav-list">
                <NavItem
                  icon={<Settings size={20} />}
                  label="Settings"
                  active={isActive("/dashboard/settings")}
                  collapsed={!sidebarOpen}
                  href="/dashboard/settings"
                />
                <NavItem
                  icon={<HelpCircle size={20} />}
                  label="Help"
                  active={false}
                  collapsed={!sidebarOpen}
                  href="/dashboard/help"
                />
                <li className="relative group">
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className={`nav-item-button ${
                      theme === "light"
                        ? "nav-item-inactive-light"
                        : "nav-item-inactive-dark"
                    }`}
                  >
                    <div className="nav-item-content">
                      <span className="nav-item-icon">
                        <LogOut size={20} />
                      </span>
                      <span
                        className={`nav-item-label ${
                          !sidebarOpen ? "opacity-0 w-0" : "opacity-100"
                        }`}
                      >
                        Sign Out
                      </span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <button
          type="button"
          onClick={toggleSidebar}
          className={`sidebar-toggle ${
            sidebarOpen ? "left-60 top-[4.3rem]" : "left-12 top-[4.3rem]"
          } ${
            theme === "light" ? "sidebar-toggle-light" : "sidebar-toggle-dark"
          }`}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-16"
        }`}
      >
        {/* Navbar */}
        <header
          className={`navbar-container ${
            theme === "light" ? "navbar-light" : "navbar-dark"
          }`}
        >
          <div className="navbar-content">
            <div className="navbar-inner">
              <div className="flex items-center">
                <div className="navbar-title">
                  <h1
                    className={`navbar-title-text ${
                      theme === "light"
                        ? "navbar-title-light"
                        : "navbar-title-dark"
                    }`}
                  >
                    Dashboard
                  </h1>
                </div>
              </div>

              <div className="navbar-actions">
                <button
                  onClick={toggleTheme}
                  className={`theme-toggle ${
                    theme === "light"
                      ? "theme-toggle-light"
                      : "theme-toggle-dark"
                  }`}
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <NotificationDropdown />
                <UserInfo />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main
          className={`main-content ${
            theme === "light" ? "main-content-light" : "main-content-dark"
          }`}
        >
          {children}
        </main>

        {/* Footer */}
        <footer
          className={`footer-container ${
            theme === "light" ? "footer-light" : "footer-dark"
          }`}
        >
          <div className="footer-content">
            <p
              className={`footer-text ${
                theme === "light" ? "footer-text-light" : "footer-text-dark"
              }`}
            >
              © 2024 Your Company. All rights reserved.
            </p>
            <div className="footer-links">
              <Link
                href="/dashboard/privacy"
                className={`footer-link ${
                  theme === "light" ? "footer-link-light" : "footer-link-dark"
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/dashboard/terms"
                className={`footer-link ${
                  theme === "light" ? "footer-link-light" : "footer-link-dark"
                }`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
