import {
  Button,
  ErrorText,
  LoaderSpinner,
  OutcomeModal,
} from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useGetCategories } from "@/features/category/utils";
import { formatCurrency } from "@/utils";
import { useEffect, useState } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import type {
  BudgetItemType,
  BudgetSchemaType,
} from "../schemas";
import {
  useCreateBudget,
  useGetBudgetSuggestions,
  useGetGoals,
  useUpdateBudget,
} from "../utils";

const STEPS = [
  { label: "Income", value: 1 },
  { label: "Categories", value: 2 },
  { label: "Review", value: 3 },
];

const DEFAULT_BUCKET_MAP: Record<string, BudgetItemType> = {
  rent_housing: "FIXED",
  utilities: "FIXED",
  phone_internet: "FIXED",
  health_medical: "FIXED",
  school_education: "FIXED",
  loan_repayment: "FIXED",
  groceries: "FIXED",
  food: "FIXED",
  transport: "FIXED",
  family_support: "FIXED",
  personal_care: "FIXED",
  entertainment: "FLEXIBLE",
  shopping: "FLEXIBLE",
  subscriptions: "FLEXIBLE",
  miscellaneous: "FLEXIBLE",
};

type WizardItem = {
  value: string;
  name: string;
  amount: string;
  type: BudgetItemType;
};

type BudgetSetupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  year: number;
  month: number;
  existingBudget?: BudgetSchemaType | null;
};

export default function BudgetSetupDialog({
  open,
  onOpenChange,
  year,
  month,
  existingBudget,
}: BudgetSetupDialogProps) {
  const { data: suggestionsData, isPending: isSuggestionsPending } =
    useGetBudgetSuggestions(year, month);
  const { data: goalsData, isPending: isGoalsPending } = useGetGoals();
  const { data: categoriesData } = useGetCategories(false);

  const [seeded, setSeeded] = useState(false);
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState("");
  const [items, setItems] = useState<WizardItem[]>([]);
  const [error, setError] = useState("");
  const [isOutcomeOpen, setIsOutcomeOpen] = useState(false);

  const createBudget = useCreateBudget({
    onSuccess: () => {
      onOpenChange(false);
      setIsOutcomeOpen(true);
    },
  });
  const updateBudget = useUpdateBudget({
    onSuccess: () => {
      onOpenChange(false);
      setIsOutcomeOpen(true);
    },
  });

  useEffect(() => {
    if (!open) {
      setSeeded(false);
      setStep(1);
      setError("");
      return;
    }

    if (seeded) return;

    if (existingBudget) {
      setIncome(String(existingBudget.income));
      setItems(
        existingBudget.items.map((item) => ({
          value: item.category.value,
          name: item.category.name,
          amount: String(item.amount),
          type: item.type,
        })),
      );
      setSeeded(true);
      return;
    }

    if (
      suggestionsData &&
      goalsData &&
      (suggestionsData.categories.length > 0 || categoriesData)
    ) {
      const goalAmount = goalsData.reduce(
        (sum, goal) => sum + goal.monthlyContribution,
        0,
      );
      let nextItems = suggestionsData.categories.map((category) => ({
        value: category.value,
        name: category.name,
        amount: String(category.suggested || 0),
        type: category.bucket,
      }));

      if (nextItems.length === 0 && categoriesData) {
        nextItems = categoriesData.map((category) => ({
          value: category.value,
          name: category.name,
          amount: "0",
          type: DEFAULT_BUCKET_MAP[category.value] || "FLEXIBLE",
        }));
      }

      if (goalAmount > 0) {
        nextItems.push({
          value: "savings",
          name: "Goals",
          amount: String(goalAmount),
          type: "GOAL",
        });
      }

      setIncome(String(suggestionsData.incomeEstimate || 0));
      setItems(nextItems);
      setSeeded(true);
    }
  }, [
    open,
    seeded,
    existingBudget,
    suggestionsData,
    goalsData,
    categoriesData,
  ]);

  const isSeeding = open && !existingBudget && !seeded;

  const handleAmountChange = (value: string) => {
    const sanitized = value.replace(/[^\d.]/g, "");
    const parts = sanitized.split(".");
    return parts.length > 2
      ? parts[0] + "." + parts.slice(1).join("")
      : sanitized;
  };

  const totalPlanned = items.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0,
  );
  const incomeValue = Number(income) || 0;
  const leftover = incomeValue - totalPlanned;

  const handleNext = () => {
    setError("");

    if (step === 1) {
      if (!incomeValue || incomeValue <= 0) {
        setError("Enter a valid monthly income");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      const hasBudget = items.some((item) => Number(item.amount) > 0);
      if (!hasBudget) {
        setError("Give at least one category a budget");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    setError("");

    const payloadItems = items
      .filter((item) => Number(item.amount) > 0)
      .map((item) => ({
        category: item.value,
        amount: Number(item.amount),
        type: item.type,
      }));

    if (payloadItems.length === 0) {
      setError("Give at least one category a budget");
      return;
    }

    if (existingBudget) {
      updateBudget.mutate({
        id: existingBudget._id,
        payload: { income: incomeValue, items: payloadItems },
      });
      return;
    }

    createBudget.mutate({
      year,
      month,
      income: incomeValue,
      items: payloadItems,
    });
  };

  const isPending = createBudget.isPending || updateBudget.isPending;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg bg-bg">
          {isSeeding || isSuggestionsPending || isGoalsPending ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10">
              <LoaderSpinner className="size-8 text-pri" />
              <p className="text-sm text-text-mute">
                Preparing suggestions from your spending…
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="capitalize">
                  {existingBudget ? "Edit budget" : "Set up budget"}
                </h2>
                <p className="text-xs text-text-mute capitalize">
                  {new Date(year, month - 1, 1).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2">
                {STEPS.map(({ label, value }) => (
                  <div
                    key={value}
                    className={cn(
                      "flex-1 text-center text-[11px] capitalize p-2 rounded-md bg-sec/30",
                      {
                        "bg-pri text-bg": step === value,
                        "bg-sec/60": value < step,
                      },
                    )}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs capitalize">Monthly income</label>
                  <div className="w-full flex items-center justify-between border border-neutral-300 rounded-md">
                    <input
                      className="w-full text-xs outline-none p-2.5"
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={income}
                      onChange={(event) =>
                        setIncome(handleAmountChange(event.target.value))
                      }
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => {
                    const isGoal = item.type === "GOAL";
                    return (
                      <div
                        key={item.value}
                        className="flex items-center justify-between gap-3 border border-bor rounded-md p-2"
                      >
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <p className="text-sm text-text-pri capitalize truncate">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-text-mute uppercase">
                            {item.type}
                          </p>
                        </div>
                        <div className="w-32 flex items-center justify-between border border-neutral-300 rounded-md">
                          <input
                            className="w-full text-xs outline-none p-2.5 text-right"
                            type="text"
                            inputMode="numeric"
                            placeholder="0"
                            readOnly={isGoal}
                            value={item.amount}
                            onChange={(event) =>
                              setItems((prev) =>
                                prev.map((prevItem) =>
                                  prevItem.value === item.value
                                    ? {
                                        ...prevItem,
                                        amount: handleAmountChange(
                                          event.target.value,
                                        ),
                                      }
                                    : prevItem,
                                ),
                              )
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-3 gap-4 border border-bor rounded-md p-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-pri">
                        ₦{formatCurrency(incomeValue)}
                      </p>
                      <p className="capitalize text-xs text-text-mute">
                        Income
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-pri">
                        ₦{formatCurrency(totalPlanned)}
                      </p>
                      <p className="capitalize text-xs text-text-mute">
                        Planned
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p
                        className={cn("text-sm font-medium", {
                          "text-success": leftover >= 0,
                          "text-err": leftover < 0,
                        })}
                      >
                        {leftover >= 0 ? "" : "-"}₦
                        {formatCurrency(Math.abs(leftover))}
                      </p>
                      <p className="capitalize text-xs text-text-mute">
                        Left over
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
                    {items
                      .filter((item) => Number(item.amount) > 0)
                      .map((item) => (
                        <div
                          key={item.value}
                          className="flex items-center justify-between gap-3 border border-bor rounded-md p-2"
                        >
                          <p className="text-sm text-text-pri capitalize">
                            {item.name}
                          </p>
                          <p className="text-sm text-text-sec">
                            ₦{formatCurrency(Number(item.amount))}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <ErrorText error={error} />

              <div className="w-full flex items-center justify-center gap-4">
                {step > 1 && (
                  <Button
                    btnType="secondary"
                    className="w-full"
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    disabled={isPending}
                  >
                    Back
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    btnType="primary"
                    className="w-full"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
                {step === 3 && (
                  <Button
                    btnType="primary"
                    className="w-full"
                    type="button"
                    onClick={handleSubmit}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <LoaderSpinner className="size-6" />
                    ) : existingBudget ? (
                      "Save changes"
                    ) : (
                      "Create budget"
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <OutcomeModal
        isOpen={isOutcomeOpen}
        setIsOpen={setIsOutcomeOpen}
        Icon={GiReceiveMoney}
        title="Budget saved"
        description="Your budget has been set up successfully."
      />
    </>
  );
}
