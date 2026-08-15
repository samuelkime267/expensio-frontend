import {
  Button,
  EmptyState,
  ErrorState,
  OutcomeModal,
  Skeleton,
} from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { TransactionPaginationSchemaType } from "@/features/transaction/schemas";
import { LogTransaction } from "@/features/transaction/components";
import { formatCurrency, formatDateTime } from "@/utils";
import { cn } from "@/lib/utils";
import { TbReceipt } from "react-icons/tb";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type TransactionListProps = {
  data: TransactionPaginationSchemaType | undefined;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
};

const SKELETON_ROWS = 5;

export default function TransactionList({
  data,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  isRetrying,
}: TransactionListProps) {
  const navigate = useNavigate();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(true);
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);

  const transactions = data?.transactions || [];
  const openLog = (income: boolean) => {
    setIsIncome(income);
    setIsTransactionModalOpen(true);
  };

  return (
    <div className="md:hidden border border-bor rounded-lg overflow-hidden divide-y divide-bor">
      {isLoading &&
        !isError &&
        Array.from({ length: SKELETON_ROWS }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4">
            <Skeleton className="size-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-4 w-16 shrink-0" />
          </div>
        ))}

      {!isLoading &&
        !isError &&
        transactions.map((transaction) => {
          const { _id, name, category, amount, date, type, breakdowns } =
            transaction;
          const itemCount = breakdowns?.length;
          return (
            <button
              key={_id}
              onClick={() => navigate(`/transactions/${_id}`)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-[#ecf5ea]/50 transition-color duration-300 cursor-pointer"
            >
              <div
                className={cn(
                  "size-10 rounded-full flex items-center justify-center shrink-0",
                  {
                    "bg-success/10 text-success": type === "Income",
                    "bg-err/10 text-err": type === "Expense",
                  },
                )}
              >
                {type === "Income" ? (
                  <GiReceiveMoney className="size-5" />
                ) : (
                  <GiPayMoney className="size-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-pri truncate">
                  {name}
                </p>
                <p className="text-xs text-text-mute truncate">
                  {category.name}
                  {itemCount
                    ? ` · ${itemCount} ${itemCount === 1 ? "item" : "items"}`
                    : ""}
                </p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <p
                  className={cn("text-sm font-medium", {
                    "text-success": type === "Income",
                    "text-err": type === "Expense",
                  })}
                >
                  {type === "Income" ? "+" : "-"}₦{formatCurrency(amount)}
                </p>
                <p className="text-xs text-text-mute">
                  {formatDateTime(date).date}
                </p>
              </div>
            </button>
          );
        })}

      {isError && (
        <div className="p-4">
          <ErrorState
            message={errorMessage}
            onRetry={onRetry}
            isRetrying={isRetrying}
          />
        </div>
      )}

      {!isLoading && !isError && transactions.length === 0 && (
        <EmptyState
          Icon={TbReceipt}
          title="No transactions yet"
          description="Log your first income or expense to see it here."
        >
          <div className="flex items-center justify-center gap-2 mt-1">
            <Button
              onClick={() => openLog(true)}
              className="bg-[#ecf4e8] rounded-md flex items-center justify-center gap-2 p-2 px-4"
            >
              <GiReceiveMoney className="size-4" />
              <p className="text-[9px]">Income</p>
            </Button>
            <Button
              onClick={() => openLog(false)}
              className="bg-[#ecf4e8] rounded-md flex items-center justify-center gap-2 p-2 px-4"
            >
              <GiPayMoney className="size-4" />
              <p className="text-[9px]">Expense</p>
            </Button>
          </div>
        </EmptyState>
      )}

      <Dialog
        open={isTransactionModalOpen}
        onOpenChange={setIsTransactionModalOpen}
      >
        <DialogContent className="sm:max-w-2xl bg-bg h-[calc(100dvh-4rem)] overflow-y-auto p-2">
          <LogTransaction
            type={isIncome ? "Income" : "Expense"}
            onSuccess={() => {
              setIsTransactionModalOpen(false);
              setIsOutcomeModalOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>

      <OutcomeModal
        isOpen={isOutcomeModalOpen}
        setIsOpen={setIsOutcomeModalOpen}
        title={`${isIncome ? "Income" : "Expense"} Logged Successfully`}
        Icon={isIncome ? GiReceiveMoney : GiPayMoney}
        description={`Your ${isIncome ? "income" : "expense"} has been logged you can now
                close this now.`}
      />
    </div>
  );
}
