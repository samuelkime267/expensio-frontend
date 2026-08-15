import { ProgressBar } from "@/components";
import { formatCurrency } from "@/utils";
import { ChevronRight, Home, Sparkles, Target } from "lucide-react";
import type { BudgetItemSchemaType } from "../schemas";
import BudgetStatusBadge from "./BudgetStatusBadge";

const TYPE_ICON = {
  FIXED: Home,
  FLEXIBLE: Sparkles,
  GOAL: Target,
};

type BudgetRowProps = {
  item: BudgetItemSchemaType;
  onSelect: (item: BudgetItemSchemaType) => void;
};

export default function BudgetRow({ item, onSelect }: BudgetRowProps) {
  const Icon = TYPE_ICON[item.type];

  return (
    <button
      onClick={() => onSelect(item)}
      className="w-full flex items-center gap-3 p-4 text-left hover:bg-[#ecf5ea]/50 transition-color duration-300 cursor-pointer"
    >
      <div className="p-2.5 rounded-md bg-sec/30 shrink-0">
        <Icon className="size-4" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-sm font-medium text-text-pri capitalize truncate">
          {item.category.name}
        </p>
        <p className="text-xs text-text-mute truncate">
          ₦{formatCurrency(item.spent)} / ₦{formatCurrency(item.amount)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0 w-24">
        <ProgressBar progress={item.percentageUsed} className="w-full" />
        <BudgetStatusBadge status={item.status} />
      </div>

      <ChevronRight className="size-4 text-text-mute shrink-0" />
    </button>
  );
}
