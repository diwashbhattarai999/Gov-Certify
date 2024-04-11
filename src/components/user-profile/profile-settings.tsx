"use client";

import { useEffect, useRef, useState } from "react";

import useOnClickOutside from "@/hooks/use-on-click-outside";

import SettingsForm from "./settings-form";
import { cn } from "@/lib/utils";
import { LuX } from "react-icons/lu";

interface ProfileSettingsProps {
  isProfileSettingsOpen?: boolean;
  setIsProfileSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileSettings = ({
  isProfileSettingsOpen,
  setIsProfileSettingsOpen,
}: ProfileSettingsProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const profileSettingsRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(profileSettingsRef, () => setIsProfileSettingsOpen(false));

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center w-screen min-h-screen duration-300",
          isProfileSettingsOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <div
          ref={profileSettingsRef}
          className="w-full max-w-screen-md max-h-screen gap-4 p-6 duration-200 border shadow-md w-50 bg-background sm:rounded-lg relative overflow-y-scroll no-scrollbar py-20"
        >
          <SettingsForm isEdit={isEdit} setIsEdit={setIsEdit} />

          <LuX
            className={cn(
              "absolute top-[5.4rem] right-5 w-10 h-10 rounded-md cursor-pointer hover:bg-muted p-2 duration-300",
              isEdit && "hidden"
            )}
            onClick={() => {
              setIsProfileSettingsOpen(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
