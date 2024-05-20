import { RoleGate } from "@/components/auth/role-gate";
import Sidebar from "@/components/admin/sidebar";
import TopBar from "@/components/admin/topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Dashboard | Gov Certify",
    default: "Gov Certify",
  },
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGate
      allowedRole={["ADMIN"]}
      backButtonHref="/"
      backButtonLabel="Go to Home"
    >
      <div className="relative min-h-screen flex flex-col">
        <TopBar />
        <div className="flex-1 flex">
          <Sidebar />
          {/* Main content */}
          <main className="bg-muted/30 backdrop-blur-md w-full p-4">
            {children}
          </main>
        </div>
      </div>
    </RoleGate>
  );
}
