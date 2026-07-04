import { Button } from "@/components";
import { TransactionTable } from "@/features/transaction/components";
import { useGetTransactions } from "@/features/transaction/utils";
import { cn } from "@/lib/utils";
import { FilterIcon } from "lucide-react";
import { useState } from "react";

export default function Transactions() {
  const [curPage, setCurPage] = useState(1);
  const [isIncome, setIsIncome] = useState<boolean | null>(null);
  const { data } = useGetTransactions({
    page: curPage,
    ...(isIncome !== null && { type: isIncome ? "Income" : "Expense" }),
  });
  const { pagination } = data || {};

  const incomeClick = () => {
    setCurPage(1);
    setIsIncome((val) => {
      if (val === true) return null;
      if (val === false) return true;
      if (val === null) return true;
      return null;
    });
  };
  const expenseClick = () => {
    setCurPage(1);
    setIsIncome((val) => {
      if (val === false) return null;
      if (val === true) return false;
      if (val === null) return false;
      return null;
    });
  };

  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      <div className="col-span-1 border border-bor rounded-xl p-4 flex flex-col gap-6">
        <div className="flex items-start justify-start lg:items-center lg:justify-between gap-4 flex-col lg:flex-row">
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

        <div className="flex max-lg:flex-col gap-4 lg:items-center lg:justify-between p-4">
          <p>
            Page {pagination?.currentPage} of {pagination?.maxPage}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              btnType="secondary"
              disabled={!pagination?.prevPage}
              onClick={() => setCurPage((s) => s - 1)}
            >
              Previous
            </Button>
            <Button
              disabled={!pagination?.nextPage}
              btnType="primary"
              onClick={() => setCurPage((s) => s + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
