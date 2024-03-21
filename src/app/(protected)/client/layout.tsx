import { UserRole } from "@prisma/client";

import { RoleGate } from "@/components/auth/role-gate";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGate
      allowedRole={[UserRole.USER, UserRole.ADMIN]}
      backButtonHref="/"
      backButtonLabel="Go to Home"
    >
      <main className="relative min-h-screen md:flex md:gap-4">{children}</main>
    </RoleGate>
  );
}
