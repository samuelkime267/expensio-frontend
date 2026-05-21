import { GiReceiveMoney } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { Button } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { durations, type duration } from "@/data/durations.data";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";
import { useGetTotal } from "@/features/transaction/utils";

export default function IncomeStats() {
  const [duration, setDuration] = useState<duration>("week");
  const durationLabel =
    durations.find(({ value }) => value === duration)?.label || "";

  const { data } = useGetTotal(duration);
  const { income } = data || {};
  const { percentageChange, total } = income || {};

  const isPositive =
    percentageChange === undefined
      ? null
      : percentageChange === 0
        ? null
        : percentageChange > 0;

  const amount = total || 0;

  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-md bg-sec/30 w-fit">
          <GiReceiveMoney className="size-4" />
        </div>

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
              {durations.map(({ label, value }, i) => (
                <DropdownMenuItem
                  asChild
                  key={i}
                  onClick={() => setDuration(value)}
                >
                  <p>{label}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-3">
        <div
          className={cn(
            "bg-sec/80 w-fit rounded-full flex items-center justify-start gap-1 p-2.5 py-0.75",
            {
              "bg-destructive/80": !isPositive,
              "bg-neutral-200": isPositive === null,
            },
          )}
        >
          {isPositive !== null &&
            (isPositive ? (
              <FaArrowTrendUp className="size-2.5" />
            ) : (
              <FaArrowTrendDown className="size-2.5" />
            ))}

          <p className="text-[9px]">
            {isPositive !== null
              ? isPositive
                ? `+${percentageChange}%`
                : `${percentageChange}%`
              : "-"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xl font-medium">₦{formatCurrency(amount)}</p>
          <p className="capitalize text-xs text-text-mute">Total income</p>
        </div>
      </div>
    </div>
  );
}
