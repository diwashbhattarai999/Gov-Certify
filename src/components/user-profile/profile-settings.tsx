"use client";

import { useRef, useState } from "react";

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
      {isProfileSettingsOpen && (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-background/80 backdrop-blur-sm"></div>
      )}

      <div
        className={cn(
          "absolute top-0 -right-[100%] translate-x-[12%] translate-y-1/2 z-50 flex items-center justify-center w-screen h-screen duration-300",
          isProfileSettingsOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <div
          ref={profileSettingsRef}
          className="w-full max-w-screen-md gap-4 p-6 duration-200 border shadow-md w-50 full bg-background sm:rounded-lg no-scrollbar relative"
        >
          <SettingsForm isEdit={isEdit} setIsEdit={setIsEdit} />

          <LuX
            className={cn(
              "absolute top-6 right-10 w-10 h-10 rounded-md cursor-pointer hover:bg-muted p-2 duration-300",
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
