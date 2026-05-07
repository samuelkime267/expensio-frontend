import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { cn } from "@/lib/utils";
import { IoIosClose } from "react-icons/io";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from "@/components/ui/tags-input";

type option = {
  label: string;
  value: string;
  subLabel?: string;
  hex?: string;
};

type InputTagProps = {
  values: string[];
  onValueChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  options?: option[];
  error?: string;
  required?: boolean;
};

export default function InputTag({
  onValueChange,
  values,
  label,
  placeholder,
  options,
  error,
  required,
}: InputTagProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <TagsInput
        value={values}
        onValueChange={onValueChange}
        onFocus={() => setIsOpen(true)}
        editable
        addOnPaste
        className="w-full gap-1"
      >
        <TagsInputLabel className="text-xs capitalize font-normal">
          {label}
          {required && <span className="text-destructive">*</span>}
        </TagsInputLabel>
        <TagsInputList
          className={cn("p-2 border-neutral-700", {
            "border-destructive/60": error,
          })}
        >
          {values.map((value, i) => {
            const { hex } =
              (options || []).find((v) => v.label === value) || {};
            return (
              <TagsInputItem
                key={i}
                value={value}
                onClick={(e) => e.preventDefault()}
              >
                <div className="flex items-center gap-1">
                  {hex && (
                    <div
                      style={{ backgroundColor: hex }}
                      className="size-3 rounded-full"
                    />
                  )}
                  {value}
                </div>
              </TagsInputItem>
            );
          })}
          <TagsInputInput ref={inputRef} placeholder={placeholder} />
        </TagsInputList>
        {error && <p className="text-destructive text-xs">{error}</p>}
      </TagsInput>

      {isOpen && options && options?.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full z-1000000 bg-[#040404] border border-[#303030] rounded-lg! translate-y-[calc(100%+0.5rem)] p-4 flex flex-wrap gap-2 max-h-64 overflow-y-auto tag-input-dropdown">
          {options.map(({ label, hex }, i) => {
            const isActive = values.includes(label);
            return (
              <Button
                key={i}
                onClick={() => {
                  if (isActive) {
                    onValueChange(values.filter((value) => value !== label));
                  } else {
                    onValueChange([...values, label]);
                  }
                }}
                type="button"
                className={cn(
                  "flex items-center gap-2 border border-[#303030] rounded-lg px-2 py-1 w-fit",
                  {
                    "bg-outline": isActive,
                  },
                )}
              >
                {hex && (
                  <div
                    style={{ backgroundColor: hex }}
                    className="size-4 rounded-full"
                  />
                )}
                <p className="text-white text-sm">{label}</p>
                <IoIosClose
                  className={cn("size-3 text-white/80 rotate-45", {
                    "rotate-0": isActive,
                  })}
                />
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
