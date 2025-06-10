import { ReactNode } from "react";
import { requireAuth } from "@/lib/auth.server";
import ClientDashboardWrapper from "./ClientDashboardWrapper";

// This is a Server Component
export default async function RootLayout({ children }: { children: ReactNode }) {
  // This will redirect to /auth/signin if there's no session
  const session = await requireAuth();

  return (
    <ClientDashboardWrapper session={session}>
      {children}
    </ClientDashboardWrapper>
  );
}
