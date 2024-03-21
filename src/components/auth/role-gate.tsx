"use client";

import { UserRole } from "@prisma/client";

import { useCurrentRole } from "@/hooks/use-current-role";

import FormError from "@/components/ui/form-error";
import ErrorCard from "./error-card";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole[];
  backButtonLabel: string;
  backButtonHref: string;
}

export const RoleGate = ({
  children,
  allowedRole,
  backButtonLabel,
  backButtonHref,
}: RoleGateProps) => {
  const role = useCurrentRole();
  if (role && !allowedRole.includes(role)) {
    return (
      <ErrorCard
        backButtonHref={backButtonHref}
        backButtonLabel={backButtonLabel}
        logout
      >
        <FormError message="You do not have permission to view this content!" />
      </ErrorCard>
    );
  }

  return <>{children}</>;
};
