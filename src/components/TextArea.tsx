/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "@/lib/utils";
import { useState } from "react";
import { type UseFormRegister } from "react-hook-form";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  maxLength?: number;
  register?: UseFormRegister<any>;
  error?: string;
  success?: boolean;
  labelClassName?: string;
}

export default function TextArea({
  label,
  className,
  disabled,
  onChange,
  maxLength,
  register,
  name,
  required,
  error,
  labelClassName,
  ...props
}: InputProps) {
  const [lettersCount, setLettersCount] = useState(0);

  const registration =
    (register &&
      register((name as string) || (label as string), {
        required,
        onChange: (e) => {
          if (maxLength) {
            const length = e.target.value.length;
            if (length >= maxLength) {
              e.target.value = e.target.value.slice(0, maxLength);
              setLettersCount(maxLength);
            } else {
              setLettersCount(length);
            }
          }

          if (onChange) onChange(e);
        },
      })) ||
    {};

  return (
    <div
      className={cn("w-full flex flex-col items-start justify-start gap-1", {
        "opacity-50 pointer-events-none": disabled,
      })}
    >
      {label && (
        <label
          htmlFor={name}
          className={cn("text-xs capitalize", labelClassName)}
        >
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div
        className={cn(
          "w-full flex items-center justify-between border border-neutral-700 rounded-md",
          {
            "border-destructive/60": error,
          },
          className,
        )}
      >
        <textarea
          className="w-full text-xs outline-none p-2.5 resize-none"
          disabled={disabled}
          rows={6}
          required={required}
          {...registration}
          {...props}
        ></textarea>

        {maxLength && (
          <div className="absolute top-1 right-1 font-sora text-xs font-semibold text-sub-text">
            {lettersCount}/{maxLength}
          </div>
        )}
      </div>
      {error && <p className="text-destructive text-xs font-sora">{error}</p>}
    </div>
  );
}
