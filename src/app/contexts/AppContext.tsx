"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { Notification } from "../types/notification";

type Theme = "light" | "dark";

interface AppContextType {
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
  user: User | null;

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
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = theme;
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      document.body.className = theme;
    }
  }, [theme, mounted]);

  // Theme functions
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize notifications
  useEffect(() => {
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

  // Update notifications in localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications, mounted]);

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
    user,

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
