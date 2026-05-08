import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import { Button } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type StatusCardProps = {
  type: "income" | "expense" | "balance";
};

export default function StatusCard({ type }: StatusCardProps) {
  const [isPositive] = useState(true);

  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-md bg-sec/30 w-fit">
          {type === "balance" && <TbMoneybag className="size-4" />}
          {type === "income" && <GiReceiveMoney className="size-4" />}
          {type === "expense" && <GiPayMoney className="size-4" />}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              btnType="accent"
              className="flex items-center justify-center gap-2 text-xs "
            >
              This week
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bg" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <p>Day</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <p>Week</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <p>Month</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <p>Year</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-sec/80 w-fit rounded-full flex items-center justify-start gap-1 p-2.5 py-0.75">
          {isPositive ? (
            <FaArrowTrendUp className="size-2.5" />
          ) : (
            <FaArrowTrendDown className="size-2.5" />
          )}

          <p className="text-[9px]">+99.99%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xl font-medium">₦100,000,000,000.00</p>
          <p className="capitalize text-xs text-text-mute">Total {type}</p>
        </div>
      </div>
    </div>
  );
}
