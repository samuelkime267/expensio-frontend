/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
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

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
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
    onFocus,
    ...props
  },
  ref,
) {
  const [lettersCount, setLettersCount] = useState(0);

  let registration: any = {};

  if (register) {
    registration = register((name as string) || (label as string), {
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
    });
  }
  const { ref: registerRef, ...registrationProps } = registration;

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

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
            "w-full flex items-center justify-between border border-neutral-300 rounded-md":
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
          onFocus={(e) => {
            handleFocus(e);
            if (onFocus) onFocus(e);
          }}
          onChange={onChange}
          {...registrationProps}
          ref={(el) => {
            registerRef?.(el);

            if (typeof ref === "function") {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
          }}
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
});

Input.displayName = "Input";

export default Input;
