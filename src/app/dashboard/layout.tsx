"use client";

import { AppProvider } from "../contexts/AppContext";
import DashboardLayout from "./DashboardLayout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
}
