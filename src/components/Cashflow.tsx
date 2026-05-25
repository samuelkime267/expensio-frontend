import { Button, BarChart } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { durations, type duration } from "@/data/durations.data";
import { useGetCashflow } from "@/features/transaction/utils";
import { useState } from "react";

export default function Cashflow() {
  const [duration, setDuration] = useState<duration>("week");
  const durationLabel =
    durations.find(({ value }) => value === duration)?.label || "";

  const { data } = useGetCashflow(duration);
  const { labels, expense, income } = data || {};

  const chartData = {
    labels: labels || [],
    datasets: [
      {
        label: "Income",
        data: income || [],
        backgroundColor: "#baf49d",
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: "Expenses",
        data: expense || [],
        backgroundColor: "#1e483f",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="md:col-span-2 lg:col-span-3 border border-bor rounded-xl p-4 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-pri text-2xl font-medium capitalize">Cashflow</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              btnType="accent"
              className="flex items-center justify-center gap-2 text-xs "
            >
              {duration !== "all-time" && "This"} {durationLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bg" align="start">
            <DropdownMenuGroup>
              {durations.map(({ label, value }, i) => {
                if (
                  value === "all-time" ||
                  value === "day" ||
                  value === "month"
                )
                  return;
                return (
                  <DropdownMenuItem
                    asChild
                    key={i}
                    onClick={() => setDuration(value)}
                  >
                    <p>{label}</p>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <BarChart data={chartData} />

      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center justify-start gap-2">
          <div className="bg-[#baf49d] size-4 rounded-full" />
          <p className="text-sm">Income</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="bg-[#1e483f] size-4 rounded-full" />
          <p>Expense</p>
        </div>
      </div>
    </div>
  );
}
