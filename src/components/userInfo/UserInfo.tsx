"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useApp } from "@/app/contexts/AppContext";

const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useApp();
  const { data: session } = useSession();

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

  // Mostrar información por defecto si no hay sesión
  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "GU"; // Guest User

  const userName = session?.user?.name || "Guest User";
  const userEmail = session?.user?.email || "guest@example.com";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`user-info-button ${
          theme === "light" ? "user-info-button-light" : "user-info-button-dark"
        }`}
      >
        <div className="user-avatar">{userInitials}</div>
        <span className="user-name">{userName}</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`user-dropdown ${
            theme === "light" ? "user-dropdown-light" : "user-dropdown-dark"
          }`}
        >
          <div
            className={`user-dropdown-header ${
              theme === "light"
                ? "user-dropdown-header-light"
                : "user-dropdown-header-dark"
            }`}
          >
            <p
              className={`user-dropdown-name ${
                theme === "light"
                  ? "user-dropdown-name-light"
                  : "user-dropdown-name-dark"
              }`}
            >
              {userName}
            </p>
            <p
              className={`user-dropdown-email ${
                theme === "light"
                  ? "user-dropdown-email-light"
                  : "user-dropdown-email-dark"
              }`}
            >
              {userEmail}
            </p>
          </div>

          <Link
            href="/profile"
            className={`user-dropdown-item ${
              theme === "light"
                ? "user-dropdown-item-light"
                : "user-dropdown-item-dark"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <User size={16} className="mr-2" />
            Your Profile
          </Link>

          <Link
            href="/settings"
            className={`user-dropdown-item ${
              theme === "light"
                ? "user-dropdown-item-light"
                : "user-dropdown-item-dark"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Settings size={16} className="mr-2" />
            Settings
          </Link>

          {/* Mostrar opción de logout solo si hay sesión */}
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className={`user-dropdown-item w-full text-left ${
                theme === "light"
                  ? "user-dropdown-item-light"
                  : "user-dropdown-item-dark"
              }`}
            >
              <LogOut size={16} className="mr-2" />
              Sign out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
