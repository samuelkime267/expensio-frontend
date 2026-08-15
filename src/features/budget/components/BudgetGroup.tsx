import type { ReactNode } from "react";
import type { BudgetItemSchemaType } from "../schemas";
import BudgetRow from "./BudgetRow";

type BudgetGroupProps = {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  items: BudgetItemSchemaType[];
  onSelect: (item: BudgetItemSchemaType) => void;
};

export default function BudgetGroup({
  title,
  subtitle,
  icon,
  items,
  onSelect,
}: BudgetGroupProps) {
  if (items.length === 0) return null;

  return (
    <div className="border border-bor rounded-xl overflow-hidden">
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center justify-start gap-2">
          <div className="p-2.5 rounded-md bg-sec/30">{icon}</div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-sm font-medium text-text-pri capitalize">
              {title}
            </h2>
            {subtitle && <p className="text-xs text-text-mute">{subtitle}</p>}
          </div>
        </div>
      </div>

      <div className="divide-y divide-bor">
        {items.map((item) => (
          <BudgetRow key={item.category.value} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
