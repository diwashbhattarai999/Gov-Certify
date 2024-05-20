"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";

const SIDEBAR_LINKS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    label: "Certificates",
    href: "/admin/certificates",
    icon: TbCertificate,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: FaUsers,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-56 border-r border-border flex flex-col items-center shadow-sm">
      <ul className="w-full mt-4 text-center flex flex-col gap-2">
        {SIDEBAR_LINKS.map((link) => {
          return (
            <li
              key={link.label}
              className="font-semibold text-primary-foreground px-2 w-full cursor-pointer"
            >
              <Link
                href={link.href}
                className={cn(
                  "flex items-center justify-start gap-2 p-2 rounded-md hover:bg-accent/80 hover:text-accent-foreground duration-300",
                  {
                    "bg-accent/80 text-accent-foreground":
                      pathname === link.href,
                  }
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
