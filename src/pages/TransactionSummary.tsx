import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  ErrorState,
  LoaderSpinner,
  OutcomeModal,
  Skeleton,
} from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LogTransaction } from "@/features/transaction/components";
import {
  useDeleteTransaction,
  useGetTransaction,
} from "@/features/transaction/utils";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDateTime } from "@/utils";
import { ArrowLeftIcon, PenLineIcon, TrashIcon } from "lucide-react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { toast } from "sonner";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs text-text-mute capitalize">{label}</p>
      <p className="text-sm text-text-pri capitalize">{value}</p>
    </div>
  );
}

export default function TransactionSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending, isError, error, refetch, isFetching } =
    useGetTransaction(id || "");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate, isPending: isDeletePending } = useDeleteTransaction({
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast.success("Transaction deleted successfully");
      navigate("/transactions");
    },
  });

  if (isPending) {
    return (
      <div className="p-4 max-w-2xl mx-auto w-full flex flex-col gap-4">
        <Skeleton className="h-4 w-20" />
        <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-32" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 max-w-2xl mx-auto w-full">
        <ErrorState
          message={error?.message}
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
      </div>
    );
  }

  const {
    name,
    type,
    amount,
    date,
    category,
    description,
    createdAt,
    updatedAt,
    breakdowns,
  } = data;

  return (
    <div className="p-4 max-w-2xl mx-auto w-full grid grid-cols-1 gap-4">
      <button
        onClick={() => navigate("/transactions")}
        className="flex items-center justify-start gap-2 text-xs w-fit text-text-sec hover:text-pri transition-colors cursor-pointer"
      >
        <ArrowLeftIcon className="size-4" />
        Back to transactions
      </button>

      <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
        <div className="w-full flex max-md:items-center items-start justify-center max-md:flex-col md:justify-between gap-4">
          <div className="flex items-center max-md:justify-center max-md:w-full gap-3 max-md:flex-col">
            <div
              className={cn(
                "size-12 rounded-full flex items-center justify-center",
                {
                  "bg-success/10 text-success": type === "Income",
                  "bg-err/10 text-err": type === "Expense",
                },
              )}
            >
              {type === "Income" ? (
                <GiReceiveMoney className="size-6" />
              ) : (
                <GiPayMoney className="size-6" />
              )}
            </div>
            <div>
              <h2 className="text-xl max-md:text-center font-semibold text-text-pri capitalize">
                {name}
              </h2>
              <p className="text-xs max-md:text-center text-text-mute">
                {category.name}
              </p>
            </div>
          </div>
          <p
            className={cn(
              "text-2xl font-semibold max-md:text-center text-right",
              {
                "text-success": type === "Income",
                "text-err": type === "Expense",
              },
            )}
          >
            {type === "Income" ? "+" : "-"}₦{formatCurrency(amount)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-bor pt-4">
          <DetailRow
            label="Date"
            value={`${formatDateTime(date).date} at ${formatDateTime(date).time}`}
          />
          <DetailRow label="Type" value={type} />
          <DetailRow
            label="Created"
            value={`${formatDateTime(createdAt).date} at ${formatDateTime(createdAt).time}`}
          />
          <DetailRow
            label="Last updated"
            value={`${formatDateTime(updatedAt).date} at ${formatDateTime(updatedAt).time}`}
          />
          {description && <DetailRow label="Description" value={description} />}
        </div>

        <div className="flex items-center justify-center gap-4 mt-2">
          <Button
            btnType="primary"
            className="w-full"
            onClick={() => setIsEditOpen(true)}
          >
            <PenLineIcon className="size-4" />
            Edit
          </Button>
          <Button
            btnType="primary"
            className="bg-err w-full"
            onClick={() => setIsDeleteOpen(true)}
          >
            <TrashIcon className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      {breakdowns.length > 0 && (
        <div className="border border-bor rounded-xl p-4 flex flex-col gap-3">
          <h3 className="font-medium text-text-pri">Breakdown</h3>
          <div className="flex flex-col gap-2">
            {breakdowns.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <p className="text-text-pri capitalize">{item.name}</p>
                <p className="text-text-sec">₦{formatCurrency(item.amount)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 text-sm border-t border-bor pt-3">
            <p className="font-medium text-text-pri">Total</p>
            <p
              className={cn("font-semibold", {
                "text-success": type === "Income",
                "text-err": type === "Expense",
              })}
            >
              {type === "Income" ? "+" : "-"}₦{formatCurrency(amount)}
            </p>
          </div>
        </div>
      )}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-2xl bg-bg h-[calc(100dvh-4rem)] overflow-y-auto p-2">
          <LogTransaction
            type={type}
            transaction={data}
            onSuccess={() => {
              setIsEditOpen(false);
              setIsOutcomeModalOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>

      <OutcomeModal
        isOpen={isOutcomeModalOpen}
        setIsOpen={setIsOutcomeModalOpen}
        title={`${type} Updated Successfully`}
        Icon={type === "Income" ? GiReceiveMoney : GiPayMoney}
        description={`Your ${type} has been updated you can now close this now.`}
      />

      <OutcomeModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title={`Are you sure you want to delete transaction?`}
        status="failure"
        description={`Once a transaction is deleted it cannot be restored.`}
      >
        <div className="w-full flex items-center justify-center gap-4 mt-4">
          <Button
            btnType="secondary"
            onClick={() => setIsDeleteOpen(false)}
            disabled={isDeletePending}
            className="w-full"
          >
            Close
          </Button>
          <Button
            btnType="primary"
            className="bg-err w-full"
            onClick={() => mutate(data._id)}
            disabled={isDeletePending}
          >
            {isDeletePending ? <LoaderSpinner className="size-6" /> : "Delete"}
          </Button>
        </div>
      </OutcomeModal>
    </div>
  );
}
