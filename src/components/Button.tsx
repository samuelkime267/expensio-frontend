import { cn } from "@/lib/utils";
import React from "react";

type ButtonType = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  btnType?: ButtonType;
}

const BtnType: Record<ButtonType, string> = {
  primary:
    "w-full bg-pri text-bg font-medium py-2 px-4 rounded-sm hover:scale-[102%] duration-300 transition-colors transition-transform hover:cursor-pointer flex items-center justify-center gap-2 capitalize",
  secondary:
    "border border-pri flex items-center justify-center gap-2 w-full capitalize py-2 px-4 rounded-sm hover:scale-[102%] duration-300 transition-colors transition-transform",
};

export default function Button({
  children,
  className,
  btnType,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:outline-none",
        btnType && BtnType[btnType],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
