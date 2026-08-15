import {
  Button,
  ErrorText,
  LoaderSpinner,
  OutcomeModal,
} from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useGetBalance from "@/features/user/utils/useGetBalance";
import { formatCurrency } from "@/utils";
import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import type { GoalSchemaType } from "../schemas";
import { useContributeToGoal } from "../utils";

type ContributeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: GoalSchemaType | null;
};

export default function ContributeDialog({
  open,
  onOpenChange,
  goal,
}: ContributeDialogProps) {
  const { data: balanceData } = useGetBalance();
  const [seeded, setSeeded] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isOutcomeOpen, setIsOutcomeOpen] = useState(false);

  const contribute = useContributeToGoal({
    onSuccess: () => {
      setAmount("");
      onOpenChange(false);
      setIsOutcomeOpen(true);
    },
  });

  const balance = balanceData?.balance;

  useEffect(() => {
    if (!open) {
      setSeeded(false);
      setError("");
      return;
    }

    if (seeded || !goal) return;

    setAmount(String(goal.recommendedContribution || 0));
    setSeeded(true);
  }, [open, seeded, goal]);

  const handleAmountChange = (value: string) => {
    const sanitized = value.replace(/[^\d.]/g, "");
    const parts = sanitized.split(".");
    const next =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized;
    setAmount(next);
  };

  const handleSubmit = () => {
    setError("");

    const value = Number(amount) || 0;

    if (!goal) return;

    if (value <= 0) {
      setError("Enter a valid amount");
      return;
    }

    if (balance !== undefined && value > balance) {
      setError(`You only have ₦${formatCurrency(balance)} in your balance`);
      return;
    }

    contribute.mutate({ id: goal._id, amount: value });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-bg">
          {goal && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-start gap-3">
                <div className="p-2.5 rounded-md bg-sec/30 shrink-0">
                  <Target className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h2 className="capitalize">Add to {goal.name}</h2>
                  <p className="text-xs text-text-mute">
                    This is logged as an expense toward your goal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border border-bor rounded-md p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-text-pri">
                    ₦{formatCurrency(goal.saved)}
                  </p>
                  <p className="capitalize text-xs text-text-mute">Saved</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-text-pri">
                    ₦{formatCurrency(goal.remaining)}
                  </p>
                  <p className="capitalize text-xs text-text-mute">To go</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-text-pri">
                    ₦{formatCurrency(balance ?? 0)}
                  </p>
                  <p className="capitalize text-xs text-text-mute">Balance</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs capitalize">Amount</label>
                <div className="w-full flex items-center justify-between border border-neutral-300 rounded-md">
                  <input
                    className="w-full text-xs outline-none p-2.5"
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={amount}
                    onChange={(event) =>
                      handleAmountChange(event.target.value)
                    }
                  />
                </div>
                <p className="text-xs text-text-mute">
                  Suggested: ₦{formatCurrency(goal.recommendedContribution)}
                </p>
              </div>

              <ErrorText error={error} />

              <Button
                btnType="primary"
                type="button"
                onClick={handleSubmit}
                disabled={contribute.isPending}
              >
                {contribute.isPending ? (
                  <LoaderSpinner className="size-6" />
                ) : (
                  "Add to goal"
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <OutcomeModal
        isOpen={isOutcomeOpen}
        setIsOpen={setIsOutcomeOpen}
        Icon={Target}
        title="Contribution added"
        description="Money moved to your goal and logged as an expense."
      />
    </>
  );
}
