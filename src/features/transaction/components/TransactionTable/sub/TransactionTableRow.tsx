import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDateTime } from "@/utils";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, LoaderSpinner, OutcomeModal } from "@/components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PenLineIcon, TrashIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { TransactionSchemaType } from "@/features/transaction/schemas";
import { LogTransaction } from "@/features/transaction/components";

import { useState } from "react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useDeleteTransaction } from "@/features/transaction/utils";
import { toast } from "sonner";

type TransactionTableProps = {
  data: TransactionSchemaType;
};

export default function TransactionTableRow({ data }: TransactionTableProps) {
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] =
    useState(false);

  const { name, category, amount, date, type, _id } = data;
  const { mutate, isPending } = useDeleteTransaction({
    onSuccess: () => {
      setIsDeleteTransactionModalOpen(false);
      toast.success("Transaction deleted successfully");
    },
  });

  return (
    <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
      <TableCell className="font-medium p-4">{name}</TableCell>
      <TableCell className="p-4">{category.name}</TableCell>
      <TableCell
        className={cn("p-4", {
          "text-success": type === "Income",
          "text-err": type === "Expense",
        })}
      >
        {type === "Income" ? "+" : "-"}₦{formatCurrency(amount)}
      </TableCell>
      <TableCell className="p-4">{type}</TableCell>
      <TableCell className="p-4 space-y-0.5">
        <p>{formatDateTime(date).date}</p>
        <p className="text-[10px]">{formatDateTime(date).time}</p>
      </TableCell>
      <TableCell className="p-4 space-y-0.5 h-full flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center justify-center gap-2 h-full p-2">
              <BsThreeDotsVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bg" align="end">
            <DropdownMenuItem asChild>
              <Button
                onClick={() => setIsTransactionModalOpen(true)}
                className={
                  "w-full flex items-center justify-start gap-2 hover:bg-black/10!"
                }
              >
                <PenLineIcon className="text-text-pri size-4" />
                <p className="text-text-pri">Edit</p>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                className={
                  "w-full flex items-center justify-start gap-2 hover:bg-err/10!"
                }
                // onClick={() => mutate(_id)}
                onClick={() => setIsDeleteTransactionModalOpen(true)}
              >
                <TrashIcon className="text-err size-4" />
                <p className="text-err">Delete</p>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog
          open={isTransactionModalOpen}
          onOpenChange={setIsTransactionModalOpen}
        >
          <DialogContent className="sm:max-w-2xl bg-bg h-[calc(100dvh-4rem)] overflow-y-auto p-2">
            <LogTransaction
              type={type}
              transaction={data}
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
          title={`${type} Updated Successfully`}
          Icon={type === "Income" ? GiReceiveMoney : GiPayMoney}
          description={`Your ${type} has been updated you can now
                close this now.`}
        />

        <OutcomeModal
          isOpen={isDeleteTransactionModalOpen}
          setIsOpen={setIsDeleteTransactionModalOpen}
          title={`Are you sure you want to delete transaction?`}
          status="failure"
          description={`Once a transaction is deleted it cannot be restored.`}
        >
          <div className="w-full flex items-center justify-center gap-4 mt-4">
            <Button
              btnType="secondary"
              onClick={() => setIsDeleteTransactionModalOpen(false)}
              disabled={isPending}
              className="w-full"
            >
              Close
            </Button>
            <Button
              btnType="primary"
              className="bg-err w-full"
              onClick={() => mutate(_id)}
              disabled={isPending}
            >
              {isPending ? <LoaderSpinner className="size-6" /> : "Delete"}
            </Button>
          </div>
        </OutcomeModal>
      </TableCell>
    </TableRow>
  );
}
