import { Button, ProgressBar } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatCurrency } from "@/utils";
import { Home, Sparkles, Target } from "lucide-react";
import type { BudgetItemSchemaType, BudgetSchemaType } from "../schemas";
import BudgetStatusBadge from "./BudgetStatusBadge";

const TYPE_ICON = {
  FIXED: Home,
  FLEXIBLE: Sparkles,
  GOAL: Target,
};

const PACE_LABEL: Record<BudgetItemSchemaType["pace"], string> = {
  ahead: "Ahead of schedule",
  behind: "Behind schedule",
  "on-track": "On schedule",
};

type BudgetDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: BudgetItemSchemaType | null;
  budget: BudgetSchemaType;
  onEdit: (item: BudgetItemSchemaType) => void;
  onMoveMoney: (item: BudgetItemSchemaType) => void;
};

export default function BudgetDetailDialog({
  open,
  onOpenChange,
  item,
  budget,
  onEdit,
  onMoveMoney,
}: BudgetDetailDialogProps) {
  if (!item) return null;

  const Icon = TYPE_ICON[item.type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-bg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-start gap-3">
            <div className="p-2.5 rounded-md bg-sec/30 shrink-0">
              <Icon className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-medium text-text-pri capitalize">
                {item.category.name}
              </h2>
              <p className="text-xs text-text-mute capitalize">
                {item.type.toLowerCase()} budget
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium text-text-pri">
              ₦{formatCurrency(item.spent)} spent
            </p>
            <p className="text-xs text-text-mute">
              of ₦{formatCurrency(item.amount)} budgeted
            </p>
          </div>

          <ProgressBar progress={item.percentageUsed} />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <BudgetStatusBadge status={item.status} />

            <div className="w-fit rounded-full flex items-center justify-start gap-1 p-2.5 py-0.75 bg-sec/80">
              <p className="text-[9px] text-text-pri">{PACE_LABEL[item.pace]}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-bor pt-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-pri">
                ₦{formatCurrency(item.expectedSpend)}
              </p>
              <p className="capitalize text-xs text-text-mute">
                Expected by day {budget.daysElapsed}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-pri">
                ₦{formatCurrency(item.remaining)}
              </p>
              <p className="capitalize text-xs text-text-mute">Remaining</p>
            </div>
          </div>

          {item.previousSpent > 0 || item.previousBudgetAmount > 0 ? (
            <div className="flex flex-col gap-1 border-t border-bor pt-4">
              <p className="text-sm font-medium text-text-pri capitalize">
                Last month
              </p>
              <p className="text-xs text-text-mute">
                Spent ₦{formatCurrency(item.previousSpent)} of ₦
                {formatCurrency(item.previousBudgetAmount)} budgeted
              </p>
            </div>
          ) : null}

          <div className="w-full flex items-center justify-center gap-4 pt-2">
            <Button
              btnType="secondary"
              className="w-full"
              onClick={() => onEdit(item)}
            >
              Edit budget
            </Button>
            <Button
              btnType="primary"
              className="w-full"
              onClick={() => onMoveMoney(item)}
            >
              Move money
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
