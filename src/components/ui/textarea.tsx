import { useEffect, useRef } from "react";
import { IconType } from "react-icons/lib";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { cn } from "@/lib/utils";

interface TextareaProps<T extends FieldValues = FieldValues> {
  name: keyof T;
  label: string;
  placeholder: string;
  disabled?: boolean;
  error?: string;
  Icon?: IconType;
  value?: string;
  setValue: UseFormSetValue<T>;
  register: UseFormRegister<T>;
}

const Textarea = <T extends FieldValues>({
  name,
  label,
  disabled,
  error,
  Icon,
  value,
  setValue,
  register,
  placeholder,
}: TextareaProps<T>) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...rest } = register(name as Path<T>);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setValue(name as Path<T>, input.value as PathValue<T, Path<T>>);
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [name, value]);

  return (
    <div
      className={cn(
        "relative w-full mb-4 flex flex-col gap-2 items-start",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <label
        htmlFor={name as string}
        className={cn(
          "text-primary-foreground cursor-pointer",
          error && "text-destructive opacity-80",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {label}
      </label>
      <div className="flex items-center w-full relative">
        {Icon && (
          <Icon className="absolute left-2 top-[1.1rem] pointer-events-none h-5 w-5 text-secondary-foreground" />
        )}
        <textarea
          ref={(e) => {
            ref(e);
            textareaRef.current = e;
          }}
          name={name as string}
          id={name as string}
          defaultValue={value}
          placeholder={placeholder}
          className={cn(
            "w-full py-4 px-10 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none leading-tight no-scrollbar",
            error
              ? "border-destructive focus:border-destructive"
              : "border-input focus:border-secondary-foreground"
          )}
          onChange={handleTextChange}
        ></textarea>
      </div>
      {error && <div className="mb-4 text-destructive italic">{error}</div>}
    </div>
  );
};

export default Textarea;
