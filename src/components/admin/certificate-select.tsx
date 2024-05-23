"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CertificateSelect = () => {
  const p = usePathname();
  const pathname = p.split("/")[3];

  return (
    <div className="flex items-center gap-4 font-medium text-muted-foreground mb-8 border-b-2 border-border">
      <Link
        href={"/admin/certificates/birth"}
        className={cn(
          "hover:bg-accent/80 hover:text-accent-foreground rounded-t-md p-2 cursor-pointer",
          pathname === "birth" && "bg-accent/80 text-accent-foreground"
        )}
      >
        Birth Certificates
      </Link>
      <Link
        href={"/admin/certificates/death"}
        className={cn(
          "hover:bg-accent/80 hover:text-accent-foreground rounded-t-md p-2 duration-200 ease-in cursor-pointer",
          pathname === "death" && "bg-accent/80 text-accent-foreground"
        )}
      >
        Death Certificates
      </Link>
      <Link
        href={"/admin/certificates/residential"}
        className={cn(
          "hover:bg-accent/80 hover:text-accent-foreground rounded-t-md p-2 duration-200 ease-in cursor-pointer",
          pathname === "residential" && "bg-accent/80 text-accent-foreground"
        )}
      >
        Residential Certificates
      </Link>
      <Link
        href={"/admin/certificates/marriage"}
        className={cn(
          "hover:bg-accent/80 hover:text-accent-foreground rounded-t-md p-2 duration-200 ease-in cursor-pointer",
          pathname === "marriage" && "bg-accent/80 text-accent-foreground"
        )}
      >
        Marriage Certificates
      </Link>
    </div>
  );
};

export default CertificateSelect;
