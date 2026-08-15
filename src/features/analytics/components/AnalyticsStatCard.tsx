import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AnalyticsStatCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  valueClassName?: string;
};

export default function AnalyticsStatCard({
  label,
  value,
  icon,
  valueClassName,
}: AnalyticsStatCardProps) {
  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-8">
      <div className="p-2.5 rounded-md bg-sec/30 w-fit">{icon}</div>
      <div className="space-y-1">
        <p className={cn("text-xl font-medium", valueClassName)}>{value}</p>
        <p className="capitalize text-xs text-text-mute">{label}</p>
      </div>
    </div>
  );
}
