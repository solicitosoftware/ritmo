"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import type { Notification } from "../types/notification";

type Theme = "light" | "dark";

interface AppContextType {
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New User Registration",
    message: "John Smith has registered as a new user",
    type: "info",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    actionUrl: "/users",
  },
  {
    id: "2",
    title: "Product Stock Alert",
    message: "iPhone 15 Pro is running low on stock (5 items remaining)",
    type: "warning",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    actionUrl: "/products",
  },
  {
    id: "3",
    title: "System Update Complete",
    message: "The system has been successfully updated to version 2.1.0",
    type: "success",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
  },
];

export const AppProvider = ({ children }: AppProviderProps) => {
  // Theme state
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const initialized = useRef(false);

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize app state
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    setMounted(true);

    // Initialize theme
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = theme;
    }

    // Initialize notifications
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications);
        const notificationsWithDates = parsedNotifications.map(
          (
            notification: Omit<Notification, "timestamp"> & {
              timestamp: string;
            }
          ) => ({
            ...notification,
            timestamp: new Date(notification.timestamp),
          })
        );
        setNotifications(notificationsWithDates);
      } catch (error) {
        console.error("Failed to parse notifications from localStorage", error);
        setNotifications(mockNotifications);
      }
    } else {
      setNotifications(mockNotifications);
    }
  }, []);

  // Update theme
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      document.body.className = theme;
    }
  }, [theme, mounted]);

  // Update notifications in localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications, mounted]);

  // Theme functions
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Notification functions
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  const contextValue: AppContextType = {
    // Theme
    theme,
    toggleTheme,
    mounted,

    // Notifications
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addNotification,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
