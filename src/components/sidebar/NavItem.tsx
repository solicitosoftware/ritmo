"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useApp } from "../../app/contexts/AppContext";

interface SubMenuItem {
  label: string;
  href: string;
}

interface NavItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  subItems?: SubMenuItem[];
  href?: string;
}

const NavItem = ({
  icon,
  label,
  active,
  collapsed,
  subItems,
  href,
}: NavItemProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    visible: false,
  });
  const { theme } = useApp();

  const toggleSubMenu = () => {
    if (subItems?.length && !collapsed) {
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    if (collapsed) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({ top: rect.top, visible: true });
    }
  };

  const handleMouseLeave = () => {
    setTooltipPosition({ top: 0, visible: false });
  };

  const buttonContent = (
    <>
      <div className="nav-item-content">
        <span className="nav-item-icon">{icon}</span>
        <span
          className={`nav-item-label ${
            collapsed ? "opacity-0 w-0" : "opacity-100"
          }`}
        >
          {label}
        </span>
      </div>
      {subItems?.length && !collapsed && (
        <ChevronDown
          size={16}
          className={`nav-item-chevron ${isSubMenuOpen ? "rotate-180" : ""}`}
        />
      )}
    </>
  );

  return (
    <li
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <Link
          href={href}
          className={`nav-item-button ${
            active
              ? theme === "light"
                ? "nav-item-active-light"
                : "nav-item-active-dark"
              : theme === "light"
              ? "nav-item-inactive-light"
              : "nav-item-inactive-dark"
          }`}
        >
          {buttonContent}
        </Link>
      ) : (
        <button
          onClick={toggleSubMenu}
          className={`nav-item-button ${
            active
              ? theme === "light"
                ? "nav-item-active-light"
                : "nav-item-active-dark"
              : theme === "light"
              ? "nav-item-inactive-light"
              : "nav-item-inactive-dark"
          }`}
        >
          {buttonContent}
        </button>
      )}

      {/* Main Item Tooltip */}
      {collapsed && tooltipPosition.visible && (
        <div
          className={`nav-tooltip ${
            theme === "light" ? "nav-tooltip-light" : "nav-tooltip-dark"
          }`}
          style={{ top: tooltipPosition.top }}
        >
          <div className="flex items-center">{label}</div>
          {subItems && subItems.length > 0 && (
            <ul className="mt-2 border-t border-gray-700 pt-2">
              {subItems.map((item, index) => (
                <li key={index} className="py-1">
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Submenu for expanded state */}
      {subItems?.length && isSubMenuOpen && !collapsed && (
        <ul className="nav-submenu">
          {subItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`nav-submenu-item ${
                  theme === "light"
                    ? "nav-submenu-item-light"
                    : "nav-submenu-item-dark"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavItem;
