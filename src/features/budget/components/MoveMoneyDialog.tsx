import { Button, ErrorText, LoaderSpinner, OutcomeModal } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { formatCurrency } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import type { BudgetSchemaType } from "../schemas";
import { useMoveMoney } from "../utils";

type MoveMoneyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget: BudgetSchemaType | null;
  defaultFromValue?: string | null;
};

export default function MoveMoneyDialog({
  open,
  onOpenChange,
  budget,
  defaultFromValue,
}: MoveMoneyDialogProps) {
  const [fromValue, setFromValue] = useState<string | null>(null);
  const [toValue, setToValue] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isOutcomeOpen, setIsOutcomeOpen] = useState(false);

  const moveMutation = useMoveMoney({
    onSuccess: () => {
      setAmount("");
      setIsOutcomeOpen(true);
    },
  });

  const items = budget?.items ?? [];

  const fromOptions = useMemo(
    () =>
      items
        .filter((item) => item.amount > 0)
        .map((item) => ({
          label: item.category.name,
          value: item.category.value,
          amount: item.amount,
        })),
    [items],
  );

  const toOptions = useMemo(
    () =>
      items
        .filter((item) => item.category.value !== fromValue)
        .map((item) => ({
          label: item.category.name,
          value: item.category.value,
        })),
    [items, fromValue],
  );

  const activeFrom = fromOptions.find((option) => option.value === fromValue);
  const activeTo = toOptions.find((option) => option.value === toValue);

  useEffect(() => {
    if (open) {
      setFromValue(defaultFromValue ?? fromOptions[0]?.value ?? null);
      setToValue(null);
      setAmount("");
      setError("");
    }
  }, [open, defaultFromValue, fromOptions]);

  if (!budget) return null;

  const handleAmountChange = (value: string) => {
    const sanitized = value.replace(/[^\d.]/g, "");
    const parts = sanitized.split(".");
    const next =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized;
    setAmount(next);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const value = Number(amount);

    if (!activeFrom || !activeTo) {
      setError("Select both categories");
      return;
    }

    if (!value || value <= 0) {
      setError("Enter a valid amount");
      return;
    }

    if (value > activeFrom.amount) {
      setError(
        `Only ₦${formatCurrency(activeFrom.amount)} left in ${activeFrom.label}`,
      );
      return;
    }

    setError("");
    moveMutation.mutate({
      id: budget._id,
      payload: {
        fromValue: activeFrom.value,
        toValue: activeTo.value,
        amount: value,
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-bg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2>Move money</h2>

            <div className="flex flex-col gap-1">
              <label className="text-xs capitalize">From</label>
              <Combobox
                items={fromOptions}
                value={activeFrom}
                onValueChange={(val) => {
                  setFromValue(val?.value ?? null);
                  setToValue(null);
                }}
              >
                <ComboboxInput
                  className="w-full border border-neutral-300"
                  placeholder="Select a category"
                />
                <ComboboxContent className="bg-bg text-text-pri border border-bor">
                  <ComboboxEmpty>No categories.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem
                        key={item.value}
                        value={item}
                        className="hover:!bg-pri"
                      >
                        <span className="capitalize">{item.label}</span>
                        <span className="ml-auto text-xs text-text-mute">
                          ₦{formatCurrency(item.amount)}
                        </span>
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs capitalize">To</label>
              <Combobox
                items={toOptions}
                value={activeTo}
                onValueChange={(val) => setToValue(val?.value ?? null)}
              >
                <ComboboxInput
                  className="w-full border border-neutral-300"
                  placeholder="Select a category"
                />
                <ComboboxContent className="bg-bg text-text-pri border border-bor">
                  <ComboboxEmpty>No categories.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem
                        key={item.value}
                        value={item}
                        className="hover:!bg-pri"
                      >
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
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
                  onChange={(event) => handleAmountChange(event.target.value)}
                />
              </div>
            </div>

            <ErrorText error={error} />

            <Button
              btnType="primary"
              type="submit"
              disabled={moveMutation.isPending}
            >
              {moveMutation.isPending ? (
                <LoaderSpinner className="size-6" />
              ) : (
                "Move"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <OutcomeModal
        isOpen={isOutcomeOpen}
        setIsOpen={setIsOutcomeOpen}
        Icon={GiReceiveMoney}
        title="Money moved"
        description="Your budget has been updated successfully."
      />
    </>
  );
}
