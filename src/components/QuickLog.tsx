import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LogTransaction } from "@/features/transaction/components";
import { Button, OutcomeModal } from "@/components";

export default function QuickLog() {
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(true);
  const openLogIncome = () => {
    setIsTransactionModalOpen(true);
    setIsIncome(true);
  };
  const openLogExpense = () => {
    setIsTransactionModalOpen(true);
    setIsIncome(false);
  };

  return (
    <>
      <div className="border border-bor  rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="">Quick Log</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <Button
            onClick={openLogIncome}
            className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1"
          >
            <GiReceiveMoney className="size-4" />
            <p className="text-[9px]">Income</p>
          </Button>
          <Button
            onClick={openLogExpense}
            className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1"
          >
            <GiPayMoney className="size-4" />
            <p className="text-[9px]">Expense</p>
          </Button>
          {/* <Button className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
            <TfiLoop className="size-4" />
            <p className="text-[9px]">Recurring</p>
          </Button>
          <Button className="bg-[#ecf4e8] aspect-square rounded-md flex items-center justify-center flex-col gap-1">
            <MdOutlineSavings className="size-4" />
            <p className="text-[9px]">Savings</p>
          </Button> */}
        </div>
      </div>

      <Dialog
        open={isTransactionModalOpen}
        onOpenChange={setIsTransactionModalOpen}
      >
        <DialogContent className="sm:max-w-xl bg-bg max-h-[calc(100dvh-4rem)] overflow-y-auto p-2">
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
