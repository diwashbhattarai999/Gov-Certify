"use client";

import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { cn } from "@/lib/utils";

interface SwitchProps {
  label: string;
  descriptions: string;
  disabled?: boolean;
  error?: string;
  value?: boolean;
  setValue: UseFormSetValue<{
    image?: string | undefined;
    role: "ADMIN" | "USER";
    name?: string | undefined;
    isTwoFactorEnabled?: boolean | undefined;
    email?: string | undefined;
    password?: string | undefined;
    newPassword?: string | undefined;
  }>;
}

const Switch = ({
  label,
  descriptions,
  disabled,
  error,
  value,
  setValue,
}: SwitchProps) => {
  const [toggleSwitch, setToggleSwitch] = useState(value);

  const handleSwitch = () => {
    setToggleSwitch((currValue) => !currValue);
    setValue("isTwoFactorEnabled", !toggleSwitch);
  };

  return (
    <div
      className={cn(
        "w-full h-full py-4 pl-2 pr-8 mb-8 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none flex items-center justify-between max-md:gap-4 max-md:flex-col max-md:items-start max-md:pr-2",
        error
          ? "border-destructive focus:border-destructive"
          : "border-input focus:border-secondary-foreground",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <div className="flex flex-col items-start justify-start gap-1 text-left flex-1">
        <label className="text-sm font-medium text-primary-foreground">
          {label}
        </label>
        <p className="text-sm text-secondary-foreground">{descriptions}</p>
      </div>
      <div
        className={cn(
          "w-10 h-6 flex items-center bg-accent rounded-full cursor-pointer shadow-inner",
          toggleSwitch && "bg-muted"
        )}
        onClick={handleSwitch}
      >
        <div
          className={cn(
            "w-4 h-4 mx-1 bg-primary-foreground rounded-full duration-300",
            toggleSwitch ? "translate-x-[100%]" : "translate-x-0"
          )}
        ></div>
      </div>
    </div>
  );
};

export default Switch;
