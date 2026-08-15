import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogTransaction } from "@/features/transaction/components";
import { Button, OutcomeModal } from "@/components";
import { cn } from "@/lib/utils";

type QuickLogButtonProps = {
  className?: string;
};

export default function QuickLogButton({ className }: QuickLogButtonProps) {
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(true);

  const openLog = (income: boolean) => {
    setIsIncome(income);
    setIsTransactionModalOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            btnType="accent"
            className={cn("text-xs text-nowrap", className)}
          >
            <PlusIcon className="size-4" />
            <span className="hidden sm:inline">Quick Log</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-bg" align="end">
          <DropdownMenuItem asChild>
            <Button
              onClick={() => openLog(true)}
              className="w-full flex items-center justify-start gap-2 hover:bg-black/10!"
            >
              <GiReceiveMoney className="text-success size-4" />
              <p className="text-text-pri">Log Income</p>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              onClick={() => openLog(false)}
              className="w-full flex items-center justify-start gap-2 hover:bg-err/10!"
            >
              <GiPayMoney className="text-err size-4" />
              <p className="text-text-pri">Log Expense</p>
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
    </>
  );
}
