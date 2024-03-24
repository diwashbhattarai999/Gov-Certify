import Link from "next/link";
import { IconType } from "react-icons/lib";

import { cn } from "@/lib/utils";

import AuthSocial from "@/components/auth/auth-social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  subHeaderLabel: string;
  HeaderIcon?: IconType;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
  disabled?: boolean;
  maxWidthFull?: boolean;
  className?: string;
}

const CardWrapper = ({
  children,
  headerLabel,
  HeaderIcon,
  backButtonLabel,
  subHeaderLabel,
  backButtonHref,
  showSocial,
  disabled,
  maxWidthFull,
  className,
}: CardWrapperProps) => {
  return (
    <div
      className={cn(
        "w-full  flex items-center justify-center bg-background",
        disabled && "cursor-not-allowed opacity-50 z-0"
      )}
    >
      <div
        className={cn(
          "w-full shadow-sm rounded-md text-card-foreground border-2 border-border/50 p-4 flex flex-col items-center justify-center gap-4",
          maxWidthFull ? "max-w-full" : "max-w-md",
          className
        )}
      >
        {/* Form Title */}
        <div className="w-full pb-4 text-center border-b border-border">
          <div className="flex items-center justify-center gap-4 text-foreground">
            {HeaderIcon && <HeaderIcon className="w-7 h-7" />}
            <h1 className="mb-1 text-4xl font-semibold">{headerLabel}</h1>
          </div>
          <h3 className="text-lg text-secondary-foreground">
            {subHeaderLabel}
          </h3>
        </div>
        <div
          className={cn(
            "w-full pb-4",
            (showSocial || backButtonHref) && "border-b border-border"
          )}
        >
          {children}
        </div>
        {showSocial && (
          <div className="w-full">
            <AuthSocial disabled={disabled} />
          </div>
        )}
        {backButtonHref && backButtonLabel && (
          <Link
            href={backButtonHref}
            className={cn(
              "text-secondary-foreground hover:text-primary-foreground text-sm border-b border-b-secondary-foreground/50",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {backButtonLabel}
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardWrapper;
