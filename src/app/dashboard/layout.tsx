"use client";

import { useSession } from "next-auth/react";
import { AppProvider } from "../contexts/AppContext";
import DashboardLayout from "./DashboardLayout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Comentado: Redirección a login si no está autenticado
  // if (status === "unauthenticated") {
  //   redirect("/login")
  // }

  return (
    <AppProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
}
