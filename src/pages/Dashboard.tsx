import { Button, Cashflow, StatusCard, TransactionTable } from "@/components";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { TfiLoop } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { MdOutlineSavings } from "react-icons/md";
import { ActiveSubscription } from "@/features/subscription/components";
import { LimitCard } from "@/features/transaction/components";
import { SavingsPlanCard } from "@/features/savings/components";
import { useWindowSize } from "@/utils";

export default function Dashboard() {
  const { width } = useWindowSize();

  if (width === 0) return;

  if (width < 768)
    return (
      <main className="w-full p-4 relative">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
          <div className="w-full space-y-4 h-fit sticky bottom-0 left-0">
            {/* Quick log */}
            <div className="border border-bor  rounded-xl p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="">Quick Log</h2>
              </div>

              <div className="grid grid-cols-4 gap-1">
                <div className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
                  <GiReceiveMoney className="size-4" />
                  <p className="text-[9px]">Income</p>
                </div>
                <div className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
                  <GiPayMoney className="size-4" />
                  <p className="text-[9px]">Expense</p>
                </div>
                <div className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
                  <TfiLoop className="size-4" />
                  <p className="text-[9px]">Recurring</p>
                </div>
                <div className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
                  <MdOutlineSavings className="size-4" />
                  <p className="text-[9px]">Savings</p>
                </div>
              </div>
            </div>
            <StatusCard type="balance" />
            <StatusCard type="income" />
            <StatusCard type="expense" />
            <LimitCard />
            <LimitCard isWeekly />
            <SavingsPlanCard />
            <ActiveSubscription />
          </div>
          <div className="w-full md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
            <Cashflow />

            <div className="md:col-span-2 lg:col-span-3 border border-bor rounded-xl p-4 flex flex-col gap-6">
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

  return (
    <main className="w-full p-4 relative">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
        <div className="w-full space-y-4 h-fit sticky bottom-0 left-0">
          {/* Quick log */}
          <div className="border border-bor  rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="">Quick Log</h2>
            </div>

            <div className="grid grid-cols-4 gap-1">
              <div className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
                <GiReceiveMoney className="size-4" />
                <p className="text-[9px]">Income</p>
              </div>
              <div className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
                <GiPayMoney className="size-4" />
                <p className="text-[9px]">Expense</p>
              </div>
              <div className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
                <TfiLoop className="size-4" />
                <p className="text-[9px]">Recurring</p>
              </div>
              <div className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
                <MdOutlineSavings className="size-4" />
                <p className="text-[9px]">Savings</p>
              </div>
            </div>
          </div>
          <LimitCard />
          <LimitCard isWeekly />
          <ActiveSubscription />
          <SavingsPlanCard />
        </div>
        <div className="w-full md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
          <StatusCard type="balance" />
          <StatusCard type="income" />
          <StatusCard type="expense" />

          <Cashflow />

          <div className="md:col-span-2 lg:col-span-3 border border-bor rounded-xl p-4 flex flex-col gap-6">
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
