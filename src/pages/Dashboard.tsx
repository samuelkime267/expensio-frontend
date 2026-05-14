import {
  Button,
  ProgressBar,
  StatusCard,
  TransactionTable,
} from "@/components";
import BarChart from "@/components/BarChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { TfiLoop } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { LuCalendarSync } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Dashboard() {
  return (
    <main className="w-full p-4">
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="space-y-4 h-fit">
          {/* Quick log */}
          <div className="border border-bor  rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="">Quick Log</h2>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#ecf4e8] aspect-square rounded-lg flex items-center justify-center flex-col gap-1">
                <GiReceiveMoney className="size-5" />
                <p className="text-[9px]">Income</p>
              </div>
              <div className="bg-[#ecf4e8] aspect-square rounded-lg flex items-center justify-center flex-col gap-1">
                <GiPayMoney className="size-5" />
                <p className="text-[9px]">Expense</p>
              </div>
              <div className="bg-[#ecf4e8] aspect-square rounded-lg flex items-center justify-center flex-col gap-1">
                <TfiLoop className="size-5" />
                <p className="text-[9px]">Subscription</p>
              </div>
            </div>
          </div>

          {/* Limits */}
          <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2>Daily Limit</h2>

              <Button btnType="accent" className="px-2 rounded-md">
                <BsThreeDotsVertical className="size-3.5" />
              </Button>
            </div>
            <div className="w-full space-y-1">
              <div className="flex items-center justify-start gap-1">
                <p className="text font-medium">₦10,000</p>
                <p className="text-xs">Left</p>
              </div>
              <ProgressBar progress={20} />
            </div>
          </div>
          <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2>Weekly Limit</h2>

              <Button btnType="accent" className="px-2 rounded-md">
                <BsThreeDotsVertical className="size-3.5" />
              </Button>
            </div>
            <div className="w-full space-y-1">
              <div className="flex items-center justify-start gap-1">
                <p className="text font-medium">₦60,000</p>
                <p className="text-xs">Left</p>
              </div>
              <ProgressBar progress={70} />
            </div>
          </div>

          {/* Subscriptions  */}
          <div className="border border-bor rounded-xl p-4 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <h2>Active Subscriptions</h2>
            </div>

            <div>
              <div className="flex items-center justify-start gap-2">
                <div className="p-2 rounded-full border border-bor w-fit">
                  <LuCalendarSync className="size-3.5 text-pri" />
                </div>
                <div className="flex items-center justify-between gap-2 w-full">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Spotify</p>
                    <p className="text-[10px]">22/05/2026</p>
                  </div>

                  <div className="flex items-end justify-center flex-col gap-1">
                    <p className="text-sm">₦12,000</p>
                    <div className="py-0.25 px-2.5 bg-pending/20 rounded-full border border-pending w-fit">
                      <p className="text-[10px]">Due</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Savings */}
          <div className="border border-bor rounded-xl p-4 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-pri text-2xl font-medium capitalize">
                Saving Plan
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-sur aspect-square rounded-xl flex items-center justify-center flex-col gap-2">
                <GiReceiveMoney className="size-8" />
                <p>Income</p>
              </div>
              <div className="bg-sur aspect-square rounded-xl flex items-center justify-center flex-col gap-2">
                <GiPayMoney className="size-8" />
                <p>Expense</p>
              </div>
              <div className="bg-sur aspect-square rounded-xl flex items-center justify-center flex-col gap-2">
                <TfiLoop className="size-8" />
                <p>Subscription</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-4 h-fit">
          <StatusCard type="balance" />
          <StatusCard type="income" />
          <StatusCard type="expense" />

          <div className="col-span-3 border border-bor rounded-xl p-4 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-pri text-2xl font-medium capitalize">
                Cashflow
              </h1>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    btnType="accent"
                    className="flex items-center justify-center gap-2 text-xs "
                  >
                    This year
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
            <BarChart />

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
          <div className="col-span-3 border border-bor rounded-xl p-4 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-pri text-2xl font-medium capitalize">
                Recent Transactions
              </h1>

              <NavLink to="/transactions">
                <Button
                  btnType="accent"
                  className="flex items-center justify-center gap-2 text-xs "
                >
                  See all
                </Button>
              </NavLink>
            </div>

            <TransactionTable />
          </div>
        </div>
      </div>
    </main>
  );
}
