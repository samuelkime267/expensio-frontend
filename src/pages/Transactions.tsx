import { Button } from "@/components";
import { TransactionTable } from "@/features/transaction/components";
import { useGetTransactions } from "@/features/transaction/utils";
import { cn } from "@/lib/utils";
import { FilterIcon } from "lucide-react";
import { useState } from "react";

export default function Transactions() {
  const [isIncome, setIsIncome] = useState<boolean | null>(null);
  const { data } = useGetTransactions({
    ...(isIncome !== null && { type: isIncome ? "Income" : "Expense" }),
  });

  const incomeClick = () => {
    setIsIncome((val) => {
      if (val === true) return null;
      if (val === false) return true;
      if (val === null) return true;
      return null;
    });
  };
  const expenseClick = () => {
    setIsIncome((val) => {
      if (val === false) return null;
      if (val === true) return false;
      if (val === null) return false;
      return null;
    });
  };

  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      {/* <div className="w-full max-w-[450px] border border-bor  rounded-xl p-2 flex flex-col gap-4">
        <LogTransaction type="Income" />
      </div>
      <div className="w-full max-w-[450px] border border-bor  rounded-xl p-2 flex flex-col gap-4">
        <LogTransaction type="Expense" />
      </div>
      Income
      <h1>plan</h1>
      <ul>
        <li>Balance left</li>
        <li>total income this week</li>
        <li>quick log form for income</li>
        <li>chart showing income</li>
        <li>table of income</li>
      </ul> */}
      {/* <TransactionTable /> */}

      <div className="col-span-1 border border-bor rounded-xl p-4 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-pri text-2xl font-medium capitalize">
            All Transactions
          </h1>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                btnType="secondary"
                className={cn("text-xs rounded-full", {
                  "bg-pri text-white": isIncome === true,
                })}
                onClick={incomeClick}
              >
                Income
              </Button>
              <Button
                btnType="secondary"
                className={cn("text-xs rounded-full", {
                  "bg-pri text-white": isIncome === false,
                })}
                onClick={expenseClick}
              >
                Expense
              </Button>
            </div>
            <Button
              btnType="accent"
              className="flex items-center justify-center gap-2 text-xs "
            >
              <FilterIcon className="size-3" />
              Filter
            </Button>
          </div>
        </div>

        <TransactionTable data={data} />
      </div>
    </div>
  );
}
