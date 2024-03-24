"use client";

import { HTMLInputTypeAttribute, ReactPropTypes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IconType } from "react-icons/lib";

import { cn } from "@/lib/utils";

interface InputProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  register: UseFormRegisterReturn;
  value?: string;
  placeholder?: string;
  icon?: IconType;
  error?: string;
  disabled?: boolean;
}

const Input = ({
  label,
  name,
  type,
  value,
  placeholder,
  icon: Icon,
  error,
  disabled,
  register,
}: InputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const EyeIcon = passwordVisible ? LuEye : LuEyeOff;

  return (
    <div
      className={cn(
        "relative w-full mb-4 flex flex-col gap-2 items-start",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <label
        htmlFor={name}
        className={cn(
          "text-primary-foreground cursor-pointer",
          error && "text-destructive opacity-80",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {label}
      </label>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center w-full relative">
          {Icon && (
            <Icon className="absolute left-2 pointer-events-none h-5 w-5 text-secondary-foreground" />
          )}
          <input
            {...register}
            name={name}
            type={
              type == "password"
                ? passwordVisible
                  ? "string"
                  : "password"
                : type
            }
            placeholder={placeholder}
            defaultValue={value}
            id={name}
            disabled={disabled}
            className={cn(
              "w-full h-full py-4 pl-10 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-destructive focus:border-destructive"
                : "border-input focus:border-secondary-foreground"
            )}
          />
        </div>

        {type == "password" && (
          <EyeIcon
            className="absolute right-2 cursor-pointer pr-4 h-9 w-9 text-secondary-foreground"
            onClick={() => setPasswordVisible((currentVal) => !currentVal)}
          />
        )}
      </div>
      {error && <div className="mb-4 text-destructive italic">{error}</div>}
    </div>
  );
};

export default Input;
