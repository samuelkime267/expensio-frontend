import { ProgressBar } from "@/components";
import { formatCurrency } from "@/utils";
import type { BudgetSchemaType } from "../schemas";

export default function BudgetOverview({
  budget,
}: {
  budget: BudgetSchemaType;
}) {
  const { overview, daysElapsed, daysInMonth } = budget;

  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium text-text-pri capitalize">
            Overview
          </h2>
          <p className="text-xs text-text-mute">
            Day {daysElapsed} of {daysInMonth}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xl font-medium text-text-pri">
          ₦{formatCurrency(overview.remaining)} left to spend
        </p>
        <p className="text-xs text-text-mute">
          of ₦{formatCurrency(overview.totalPlanned)} planned
        </p>
      </div>

      <ProgressBar progress={overview.percentageUsed} />

      <div className="grid grid-cols-3 gap-4 border-t border-bor pt-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-pri">
            ₦{formatCurrency(overview.income)}
          </p>
          <p className="capitalize text-xs text-text-mute">Income</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-pri">
            ₦{formatCurrency(overview.totalPlanned)}
          </p>
          <p className="capitalize text-xs text-text-mute">Planned</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-pri">
            ₦{formatCurrency(overview.remaining)}
          </p>
          <p className="capitalize text-xs text-text-mute">Remaining</p>
        </div>
      </div>
    </div>
  );
}
