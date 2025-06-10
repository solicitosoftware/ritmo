"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Bell, X, Check, CheckCheck, Trash2, ExternalLink } from "lucide-react";
import { useApp } from "../../app/contexts/AppContext";
import type { Notification } from "../../app/types/notification";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    theme,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useApp();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case "success":
        return <Check className={`${iconClass} text-green-500`} />;
      case "warning":
        return <Bell className={`${iconClass} text-yellow-500`} />;
      case "error":
        return <X className={`${iconClass} text-red-500`} />;
      default:
        return <Bell className={`${iconClass} text-blue-500`} />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.hash = notification.actionUrl;
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`notification-bell-button ${
          theme === "light"
            ? "notification-bell-button-light"
            : "notification-bell-button-dark"
        }`}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={`notification-dropdown ${
            theme === "light"
              ? "notification-dropdown-light"
              : "notification-dropdown-dark"
          }`}
        >
          <div
            className={`notification-dropdown-header ${
              theme === "light"
                ? "notification-dropdown-header-light"
                : "notification-dropdown-header-dark"
            }`}
          >
            <h3
              className={`notification-dropdown-title ${
                theme === "light"
                  ? "notification-dropdown-title-light"
                  : "notification-dropdown-title-dark"
              }`}
            >
              Notifications
              {unreadCount > 0 && (
                <span className="notification-count-badge">{unreadCount}</span>
              )}
            </h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className={`notification-action-button ${
                    theme === "light"
                      ? "notification-action-button-light"
                      : "notification-action-button-dark"
                  }`}
                  title="Mark all as read"
                >
                  <CheckCheck size={16} />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className={`notification-action-button ${
                    theme === "light"
                      ? "notification-action-button-light"
                      : "notification-action-button-dark"
                  }`}
                  title="Clear all notifications"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div
                className={`notification-empty ${
                  theme === "light"
                    ? "notification-empty-light"
                    : "notification-empty-dark"
                }`}
              >
                <Bell size={24} className="mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.read ? "notification-item-unread" : ""
                  } ${
                    theme === "light"
                      ? "notification-item-light"
                      : "notification-item-dark"
                  }`}
                >
                  <div
                    className="notification-item-content"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notification-item-icon">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-item-text">
                      <h4
                        className={`notification-item-title ${
                          theme === "light"
                            ? "notification-item-title-light"
                            : "notification-item-title-dark"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      <p
                        className={`notification-item-message ${
                          theme === "light"
                            ? "notification-item-message-light"
                            : "notification-item-message-dark"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <span
                        className={`notification-item-time ${
                          theme === "light"
                            ? "notification-item-time-light"
                            : "notification-item-time-dark"
                        }`}
                      >
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                    {notification.actionUrl && (
                      <ExternalLink
                        size={14}
                        className={`notification-item-link ${
                          theme === "light"
                            ? "notification-item-link-light"
                            : "notification-item-link-dark"
                        }`}
                      />
                    )}
                  </div>
                  <div className="notification-item-actions">
                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        className={`notification-item-action ${
                          theme === "light"
                            ? "notification-item-action-light"
                            : "notification-item-action-dark"
                        }`}
                        title="Mark as read"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className={`notification-item-action ${
                        theme === "light"
                          ? "notification-item-action-light"
                          : "notification-item-action-dark"
                      }`}
                      title="Delete notification"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div
              className={`notification-dropdown-footer ${
                theme === "light"
                  ? "notification-dropdown-footer-light"
                  : "notification-dropdown-footer-dark"
              }`}
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to full notifications page if you have one
                }}
                className={`notification-view-all ${
                  theme === "light"
                    ? "notification-view-all-light"
                    : "notification-view-all-dark"
                }`}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
