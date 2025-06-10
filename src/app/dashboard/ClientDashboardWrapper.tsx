"use client";

import { ReactNode } from "react";
import { AppProvider } from "../contexts/AppContext";
import DashboardLayout from "./DashboardLayout";
import type { Session } from '@supabase/supabase-js';

interface ClientDashboardWrapperProps {
  children: ReactNode;
  session: Session;
}

export default function ClientDashboardWrapper({ 
  children,
  session 
}: ClientDashboardWrapperProps) {
  return (
    <AppProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AppProvider>
  );
} 