import { Button, Cashflow, QuickLog, StatusCard } from "@/components";
import { NavLink } from "react-router-dom";
import { ActiveSubscription } from "@/features/subscription/components";
import { LimitCard, TransactionTable } from "@/features/transaction/components";
import { SavingsPlanCard } from "@/features/savings/components";
import { useWindowSize } from "@/utils";
import { useGetTransactions } from "@/features/transaction/utils";

export default function Dashboard() {
  const { width } = useWindowSize();
  const { data } = useGetTransactions();

  if (width === 0) return;

  if (width < 768)
    return (
      <main className="w-full p-4 relative">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
          <div className="w-full space-y-4 h-fit sticky bottom-0 left-0">
            <QuickLog />
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

              <TransactionTable data={data} />
            </div>
          </div>
        </div>
      </main>
    );

  return (
    <main className="w-full p-4 relative">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
        <div className="w-full space-y-4 h-fit sticky bottom-0 left-0">
          <QuickLog />
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

            <TransactionTable data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
