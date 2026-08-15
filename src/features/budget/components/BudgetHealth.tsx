import type { BudgetItemSchemaType } from "../schemas";

export default function BudgetHealth({
  items,
}: {
  items: BudgetItemSchemaType[];
}) {
  const onTrack = items.filter(
    (item) => item.status === "UNDER_BUDGET" || item.status === "ON_TRACK",
  ).length;
  const watch = items.filter((item) => item.status === "NEAR_LIMIT").length;
  const over = items.filter((item) => item.status === "OVER_BUDGET").length;

  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
      <h2 className="text-lg font-medium text-text-pri capitalize">
        Budget Health
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-medium text-success">{onTrack}</p>
          <p className="capitalize text-xs text-text-mute">On track</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-medium text-pending">{watch}</p>
          <p className="capitalize text-xs text-text-mute">Watch</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-medium text-err">{over}</p>
          <p className="capitalize text-xs text-text-mute">Over</p>
        </div>
      </div>
    </div>
  );
}
