/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "@/lib/utils";
import { useState } from "react";
import { type UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  register?: UseFormRegister<any>;
  error?: string;
  valueAsNumber?: boolean;
}

export default function Input({
  label,
  className,
  disabled,
  maxLength,
  onChange,
  readOnly,
  type,
  inputClassName,
  labelClassName,
  containerClassName,
  children,
  register,
  valueAsNumber,
  name,
  required,
  error,
  ...props
}: InputProps) {
  const [lettersCount, setLettersCount] = useState(0);

  const registration =
    (register &&
      register((name as string) || (label as string), {
        valueAsNumber,
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
      className={cn(
        "flex flex-col items-start justify-start gap-1",
        containerClassName,
        {
          "opacity-50": disabled || readOnly,
          "w-full": type !== "checkbox" && type !== "radio",
        },
      )}
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
          {
            "w-full flex items-center justify-between border border-neutral-700 rounded-md":
              type !== "checkbox" && type !== "radio",
            "border-destructive/60":
              error && type !== "checkbox" && type !== "radio",
          },
          className,
        )}
      >
        {children}
        <input
          className={cn("w-full text-xs outline-none p-2.5", inputClassName, {
            "border-destructive": error,
          })}
          disabled={disabled}
          readOnly={readOnly}
          type={type}
          name={name}
          {...registration}
          {...props}
        />

        {maxLength && (
          <div className="text-xs font-semibold text-sub-text p-5">
            {lettersCount}/{maxLength}
          </div>
        )}
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
