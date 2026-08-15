import { Button } from "@/components";
import {
  TransactionFilterDialog,
  TransactionList,
  TransactionTable,
} from "@/features/transaction/components";
import { useGetTransactions } from "@/features/transaction/utils";
import type { TransactionQueries } from "@/features/transaction/services";
import { cn } from "@/lib/utils";
import { FilterIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function Transactions() {
  const [curPage, setCurPage] = useState(1);
  const [isIncome, setIsIncome] = useState<boolean | null>(null);
  const [filters, setFilters] = useState<TransactionQueries>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetTransactions({
    page: curPage,
    ...(isIncome !== null && { type: isIncome ? "Income" : "Expense" }),
    ...(filters?.search && { search: filters.search }),
    ...(filters?.category && { category: filters.category }),
    ...(filters?.startDate && { startDate: filters.startDate }),
    ...(filters?.endDate && { endDate: filters.endDate }),
    ...(filters?.minAmount && { minAmount: filters.minAmount }),
    ...(filters?.maxAmount && { maxAmount: filters.maxAmount }),
    ...(filters?.sort && { sort: filters.sort }),
  });
  const { pagination } = data || {};

  const activeFilterCount = useMemo(() => {
    if (!filters) return 0;
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.startDate || filters.endDate) count++;
    if (filters.minAmount || filters.maxAmount) count++;
    if (filters.sort && filters.sort !== "desc") count++;
    return count;
  }, [filters]);

  const hasTransactions = Boolean(data && data.transactions.length > 0);
  const showPagination = isError || hasTransactions;

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

  const applyFilters = (newFilters: TransactionQueries) => {
    setCurPage(1);
    setFilters(newFilters);
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
              className={cn(
                "flex items-center justify-center gap-2 text-xs ",
                {
                  "border-pri text-pri": activeFilterCount > 0,
                },
              )}
              onClick={() => setIsFilterOpen(true)}
            >
              <FilterIcon className="size-3" />
              Filter
              {activeFilterCount > 0 && (
                <span className="bg-pri text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="hidden md:block">
          <TransactionTable
            data={data}
            isLoading={isPending}
            isError={isError}
            errorMessage={error?.message}
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        </div>

        <TransactionList
          data={data}
          isLoading={isPending}
          isError={isError}
          errorMessage={error?.message}
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />

        {showPagination && (
          <div className="flex max-lg:flex-col gap-4 lg:items-center lg:justify-between p-4">
            <p>
              {isError
                ? `Page ${curPage}`
                : `Page ${pagination?.currentPage ?? curPage} of ${pagination?.maxPage ?? "..."}`}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                btnType="secondary"
                disabled={isError || isPending || !pagination?.prevPage}
                onClick={() => setCurPage((s) => s - 1)}
              >
                Previous
              </Button>
              <Button
                disabled={isError || isPending || !pagination?.nextPage}
                btnType="primary"
                onClick={() => setCurPage((s) => s + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <TransactionFilterDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        onApply={applyFilters}
        initialFilters={filters}
      />
    </div>
  );
}
