import {
  Button,
  ErrorText,
  LoaderSpinner,
  OutcomeModal,
} from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatCurrency } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { Target } from "lucide-react";
import type { GoalSchemaType } from "../schemas";
import { useCreateGoal, useUpdateGoal } from "../utils";

function getMonthsLeft(targetDate: string): number {
  const target = new Date(targetDate);
  if (Number.isNaN(target.getTime())) return 1;
  const now = new Date();
  return Math.max(
    1,
    (target.getFullYear() - now.getFullYear()) * 12 +
      (target.getMonth() - now.getMonth()),
  );
}

function roundUpToNearest(amount: number, nearest: number): number {
  if (amount <= 0) return 0;
  return Math.max(nearest, Math.ceil(amount / nearest) * nearest);
}

function toLocalDateInput(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
}

type GoalSetupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal?: GoalSchemaType | null;
};

export default function GoalSetupDialog({
  open,
  onOpenChange,
  goal,
}: GoalSetupDialogProps) {
  const [seeded, setSeeded] = useState(false);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [error, setError] = useState("");
  const [isOutcomeOpen, setIsOutcomeOpen] = useState(false);

  const createGoal = useCreateGoal({
    onSuccess: () => {
      onOpenChange(false);
      setIsOutcomeOpen(true);
    },
  });
  const updateGoal = useUpdateGoal({
    onSuccess: () => {
      onOpenChange(false);
      setIsOutcomeOpen(true);
    },
  });

  useEffect(() => {
    if (!open) {
      setSeeded(false);
      setError("");
      return;
    }

    if (seeded) return;

    if (goal) {
      setName(goal.name);
      setTargetAmount(String(goal.targetAmount));
      setTargetDate(toLocalDateInput(goal.targetDate));
      setMonthlyContribution(String(goal.monthlyContribution));
    } else {
      setName("");
      setTargetAmount("");
      setTargetDate("");
      setMonthlyContribution("");
    }

    setSeeded(true);
  }, [open, seeded, goal]);

  const recommended = useMemo(() => {
    const target = Number(targetAmount) || 0;
    if (target <= 0 || !targetDate) return 0;
    const monthsLeft = getMonthsLeft(targetDate);
    const base = goal ? Math.max(target - goal.saved, 0) : target;
    return roundUpToNearest(base / monthsLeft, 1000);
  }, [targetAmount, targetDate, goal]);

  const handleAmountChange = (value: string) => {
    const sanitized = value.replace(/[^\d.]/g, "");
    const parts = sanitized.split(".");
    return parts.length > 2
      ? parts[0] + "." + parts.slice(1).join("")
      : sanitized;
  };

  const handleSubmit = () => {
    setError("");

    const target = Number(targetAmount) || 0;

    if (!name.trim()) {
      setError("Give your goal a name");
      return;
    }

    if (target <= 0) {
      setError("Enter a valid target amount");
      return;
    }

    if (!targetDate) {
      setError("Pick a target date");
      return;
    }

    if (!goal && new Date(targetDate) <= new Date()) {
      setError("Target date must be in the future");
      return;
    }

    if (goal) {
      updateGoal.mutate({
        id: goal._id,
        payload: {
          name: name.trim(),
          targetAmount: target,
          targetDate,
          monthlyContribution: Number(monthlyContribution) || 0,
        },
      });
      return;
    }

    createGoal.mutate({
      name: name.trim(),
      targetAmount: target,
      targetDate,
    });
  };

  const isPending = createGoal.isPending || updateGoal.isPending;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-bg">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-start gap-3">
              <div className="p-2.5 rounded-md bg-sec/30 shrink-0">
                <Target className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h2 className="capitalize">
                  {goal ? "Edit goal" : "New savings goal"}
                </h2>
                <p className="text-xs text-text-mute">
                  Save toward something you really want.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs capitalize">Name</label>
              <div className="w-full flex items-center justify-between border border-neutral-300 rounded-md">
                <input
                  className="w-full text-xs outline-none p-2.5"
                  type="text"
                  placeholder="e.g. New Laptop"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs capitalize">Target amount</label>
                <div className="w-full flex items-center justify-between border border-neutral-300 rounded-md">
                  <input
                    className="w-full text-xs outline-none p-2.5"
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={targetAmount}
                    onChange={(event) =>
                      setTargetAmount(handleAmountChange(event.target.value))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs capitalize">Target date</label>
                <div className="w-full flex items-center justify-between border border-neutral-300 rounded-md">
                  <input
                    className="w-full text-xs outline-none p-2.5"
                    type="date"
                    value={targetDate}
                    onChange={(event) => setTargetDate(event.target.value)}
                  />
                </div>
              </div>
            </div>

            {goal && (
              <div className="flex flex-col gap-1">
                <label className="text-xs capitalize">
                  Monthly contribution
                </label>
                <div className="w-full flex items-center justify-between border border-neutral-300 rounded-md">
                  <input
                    className="w-full text-xs outline-none p-2.5"
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={monthlyContribution}
                    onChange={(event) =>
                      setMonthlyContribution(
                        handleAmountChange(event.target.value),
                      )
                    }
                  />
                </div>
              </div>
            )}

            {recommended > 0 && (
              <p className="text-xs text-text-mute">
                Suggested contribution: ₦
                {formatCurrency(recommended)}/month over{" "}
                {getMonthsLeft(targetDate)}{" "}
                {getMonthsLeft(targetDate) === 1 ? "month" : "months"}
              </p>
            )}

            <ErrorText error={error} />

            <Button
              btnType="primary"
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <LoaderSpinner className="size-6" />
              ) : goal ? (
                "Save changes"
              ) : (
                "Create goal"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <OutcomeModal
        isOpen={isOutcomeOpen}
        setIsOpen={setIsOutcomeOpen}
        Icon={Target}
        title={goal ? "Goal updated" : "Goal created"}
        description="You can start adding money to this goal anytime."
      />
    </>
  );
}
