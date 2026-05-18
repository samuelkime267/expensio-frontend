/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export type DropdownFramework = {
  label: string;
  value: string;
};

type InputDropdownProps = {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  error?: string;
  items: DropdownFramework[];
  onDropdownChange?: (e: DropdownFramework | null) => void;
  // setValue: (name: string, value: string) => void fix later;
  setValue: any;
  setError: any;
  className?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
};

export default function InputDropdown({
  label,
  className,
  disabled,
  labelClassName,
  containerClassName,
  name,
  required,
  error,
  onDropdownChange,
  items,
  setValue,
  setError,
}: InputDropdownProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start gap-1",
        containerClassName,
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
      <Combobox
        items={items}
        onValueChange={(val: DropdownFramework | null) => {
          if (onDropdownChange) onDropdownChange(val);
          const regName = name || label;
          if (val?.value && regName) setValue(regName, val.value);
          if (regName && setError && val?.value)
            setError(regName, { message: undefined });
        }}
        disabled={disabled}
      >
        <ComboboxInput
          className={cn(
            "w-full border border-neutral-300",
            {
              "border-destructive": error,
            },
            className,
          )}
          placeholder="Select a framework"
        />
        <ComboboxContent className={"bg-bg text-text-pri border border-bor"}>
          <ComboboxEmpty>Category not found.</ComboboxEmpty>
          <ComboboxList>
            {(framework) => (
              <ComboboxItem
                key={framework.value}
                value={framework}
                className={"hover:!bg-pri"}
              >
                {framework.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
