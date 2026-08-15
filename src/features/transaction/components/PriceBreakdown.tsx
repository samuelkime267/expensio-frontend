import { useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Button, Input } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { BreakdownType } from "@/features/transaction/schemas";
import { formatAmount } from "@/utils";

type DraftItem = {
  id: number;
  name: string;
  amount: string;
  amountValue: number;
};

type PriceBreakdownProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialItems?: BreakdownType[];
  onSave: (items: BreakdownType[]) => void;
};

export default function PriceBreakdown({
  open,
  onOpenChange,
  initialItems,
  onSave,
}: PriceBreakdownProps) {
  const [items, setItems] = useState<DraftItem[]>([]);

  useEffect(() => {
    if (open) {
      setItems(
        (initialItems || []).map((item, i) => ({
          id: i,
          name: item.name,
          amount: formatAmount(item.amount).valueStr,
          amountValue: item.amount,
        })),
      );
    }
  }, [open, initialItems]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: "", amount: "", amountValue: 0 },
    ]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateName = (id: number, name: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item)),
    );
  };

  const updateAmount = (id: number, raw: string) => {
    const { valueStr, value } = formatAmount(raw);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, amount: valueStr, amountValue: value }
          : item,
      ),
    );
  };

  const total = items.reduce((sum, item) => sum + item.amountValue, 0);
  const hasInvalid =
    items.length === 0 ||
    items.some((item) => !item.name.trim() || item.amountValue <= 0);

  const save = () => {
    const clean = items
      .filter((item) => item.name.trim() && item.amountValue > 0)
      .map((item) => ({ name: item.name.trim(), amount: item.amountValue }));

    if (clean.length === 0) return;
    onSave(clean);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-bg">
        <div className="flex flex-col gap-4">
          <h2 className="">Price Breakdown</h2>

          <div className="flex flex-col gap-2 max-h-[50dvh] overflow-y-auto pr-1">
            {items.length === 0 && (
              <p className="text-sm text-text-mute text-center py-4">
                No items yet. Add the items that make up this transaction.
              </p>
            )}
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <div className="w-full grid grid-cols-[1fr_0.6fr] gap-2">
                  <Input
                    name="name"
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) => updateName(item.id, e.target.value)}
                    containerClassName="w-auto flex-1"
                  />
                  <Input
                    name="amount"
                    placeholder="0"
                    inputMode="numeric"
                    value={item.amount}
                    onChange={(e) => updateAmount(item.id, e.target.value)}
                    containerClassName="w-28"
                    inputClassName="text-right"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-err p-2 hover:bg-err/10 rounded-md transition-colors cursor-pointer"
                >
                  <TrashIcon className="size-4" />
                </button>
              </div>
            ))}
          </div>

          <Button
            btnType="accent"
            type="button"
            onClick={addItem}
            className="w-fit text-xs"
          >
            <PlusIcon className="size-4" />
            Add item
          </Button>

          <div className="flex items-center justify-between gap-4 border-t border-bor pt-3">
            <p className="text-sm text-text-mute">Total</p>
            <p className="text-xl font-medium text-text-pri">
              {formatAmount(total).valueStr}
            </p>
          </div>

          <Button
            btnType="primary"
            type="button"
            onClick={save}
            disabled={hasInvalid}
            className="w-full"
          >
            Save breakdown
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
