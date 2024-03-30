"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuLogOut, LuUserCircle2 } from "react-icons/lu";
import { TbCertificate } from "react-icons/tb";
import { VscFileSubmodule } from "react-icons/vsc";

import { logout } from "@/actions/logout";

import { useCurrentUser } from "@/hooks/use-current-user";

import ProfileSettings from "./profile-settings";
import { cn } from "@/lib/utils";

const UserProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  const user = useCurrentUser();

  const MENU_ITEMS = [
    {
      label: "Manage Profile",
      icon: LuUserCircle2,
      onClick: () => {
        setIsProfileSettingsOpen(true);
        setIsProfileOpen(false);
      },
    },
    {
      label: "You Certificates",
      icon: VscFileSubmodule,
      onClick: () => {
        router.push("/your-certificates");
        setIsProfileOpen(false);
      },
    },
    {
      label: "Birth Certificate",
      icon: TbCertificate,
      onClick: () => {
        router.push("/birth-certificate");
        setIsProfileOpen(false);
      },
    },
    {
      label: "Death Certificate",
      icon: TbCertificate,
      onClick: () => {
        router.push("/death-certificate");
        setIsProfileOpen(false);
      },
    },
    {
      label: "Marriage Certificate",
      icon: TbCertificate,
      onClick: () => {
        router.push("/marriage-certificate");
        setIsProfileOpen(false);
      },
    },
    {
      label: "Migration Certificate",
      icon: TbCertificate,
      onClick: () => {
        router.push("/migration-certificate");
        setIsProfileOpen(false);
      },
    },
  ];

  return (
    <div className="relative">
      <Image
        src={user?.image || "/images/default-profile.png"}
        alt="profile"
        width={100}
        height={100}
        className="rounded-full cursor-pointer h-9 w-9 group-hover:opacity-70"
        onClick={() => setIsProfileOpen((currValue) => !currValue)}
      />

      <div
        className={cn(
          "absolute right-0 z-30 px-2 py-3 rounded-md shadow-sm w-56 top-14 bg-primary text-foreground duration-300",
          isProfileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-5 pointer-events-none"
        )}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <h3 className="px-2 py-3 font-medium rounded-md text-muted-foreground">
              @{user?.email?.split("@")[0]}
            </h3>
          </li>

          <hr className="bg-border" />

          {MENU_ITEMS.map((item, index) => {
            return (
              <li
                key={index}
                onClick={item.onClick}
                className="flex items-center gap-3 px-2 font-medium transition-colors rounded-md cursor-pointer hover:bg-popover"
              >
                <item.icon className="w-auto py-3 h-11" />
                <h3>{item.label}</h3>
              </li>
            );
          })}

          <li
            onClick={handleLogout}
            className="flex items-center gap-3 px-2 font-medium transition-colors rounded-md cursor-pointer hover:bg-popover"
          >
            <LuLogOut className="w-auto py-3 h-11" />
            <h3>Logout</h3>
          </li>
        </ul>
      </div>

      <ProfileSettings
        isProfileSettingsOpen={isProfileSettingsOpen}
        setIsProfileSettingsOpen={setIsProfileSettingsOpen}
      />
    </div>
  );
};

export default UserProfile;
