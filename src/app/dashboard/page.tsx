"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="welcome-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="welcome-title text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Welcome to the Dashboard
        {session?.user?.name ? `, ${session.user.name}` : ", Guest"}!
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Select an option from the sidebar to get started. You can manage Users,
        Categories, and Products from the navigation menu.
      </p>

      {/* Mostrar mensaje si no hay sesión activa */}
      {!session && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            You are browsing as a guest. Some features may be limited.
            <a href="/login" className="font-medium underline ml-1">
              Sign in
            </a>{" "}
            for full access.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
          <h3 className="font-medium text-blue-700 dark:text-blue-300">
            Users
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            Manage user accounts and permissions
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
          <h3 className="font-medium text-green-700 dark:text-green-300">
            Products
          </h3>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            Manage your product inventory
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
          <h3 className="font-medium text-purple-700 dark:text-purple-300">
            Categories
          </h3>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
            Organize products into categories
          </p>
        </div>
      </div>

      {/* Mostrar información de sesión solo si existe */}
      {session && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Session Information
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Name: {session.user?.name}</p>
            <p>Email: {session.user?.email}</p>
            <p>Role: User</p>
          </div>
        </div>
      )}
    </div>
  );
}
