import { cn } from "@/lib/utils";
import type { BudgetStatus } from "../schemas";

const STATUS_META: Record<BudgetStatus, { label: string; className: string }> = {
  UNDER_BUDGET: { label: "Under", className: "bg-success/20 text-success" },
  ON_TRACK: { label: "On track", className: "bg-sec/80 text-text-pri" },
  NEAR_LIMIT: { label: "Near limit", className: "bg-pending/20 text-pending" },
  OVER_BUDGET: { label: "Over", className: "bg-err/20 text-err" },
  NO_BUDGET: { label: "No budget", className: "bg-neutral-200" },
};

type BudgetStatusBadgeProps = {
  status: BudgetStatus;
};

export default function BudgetStatusBadge({ status }: BudgetStatusBadgeProps) {
  const meta = STATUS_META[status];

  return (
    <div
      className={cn(
        "w-fit rounded-full flex items-center justify-start gap-1 p-2.5 py-0.75",
        meta.className,
      )}
    >
      <p className="text-[9px]">{meta.label}</p>
    </div>
  );
}
