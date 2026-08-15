import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useGetCategories } from "@/features/category/utils";
import type { TransactionQueries } from "@/features/transaction/services";

const transactionFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minAmount: z.string().optional(),
  maxAmount: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
});

type TransactionFiltersFormType = z.infer<typeof transactionFiltersSchema>;

const SORT_OPTIONS: { label: string; value: "asc" | "desc" }[] = [
  { label: "Newest first", value: "desc" },
  { label: "Oldest first", value: "asc" },
];

function toLocalDateTimeInput(epoch?: number) {
  if (!epoch) return "";
  const d = new Date(epoch);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

function toEpoch(dateTimeLocal?: string) {
  if (!dateTimeLocal) return undefined;
  const time = new Date(dateTimeLocal).getTime();
  return Number.isNaN(time) ? undefined : time;
}

type TransactionFilterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: TransactionQueries) => void;
  initialFilters?: TransactionQueries;
};

export default function TransactionFilterDialog({
  open,
  onOpenChange,
  onApply,
  initialFilters,
}: TransactionFilterDialogProps) {
  const { data: categoriesData } = useGetCategories();
  const categories = (categoriesData || []).map((item) => ({
    label: item.name,
    value: item.value,
  }));

  const defaultValues = useMemo<TransactionFiltersFormType>(
    () => ({
      search: initialFilters?.search ?? "",
      category: initialFilters?.category ?? "",
      startDate: toLocalDateTimeInput(initialFilters?.startDate),
      endDate: toLocalDateTimeInput(initialFilters?.endDate),
      minAmount: initialFilters?.minAmount
        ? String(initialFilters.minAmount)
        : "",
      maxAmount: initialFilters?.maxAmount
        ? String(initialFilters.maxAmount)
        : "",
      sort: initialFilters?.sort ?? "desc",
    }),
    [initialFilters],
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<TransactionFiltersFormType>({
    resolver: zodResolver(
      transactionFiltersSchema,
    ) as unknown as Resolver<TransactionFiltersFormType>,
    defaultValues,
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open, defaultValues, reset]);

  const category = watch("category");
  const sort = watch("sort");
  const activeCategory =
    categories.find(({ value }) => value === category) ?? null;
  const activeSort =
    SORT_OPTIONS.find(({ value }) => value === sort) ?? SORT_OPTIONS[0];

  const submit = handleSubmit((values) => {
    const minAmount = values.minAmount ? Number(values.minAmount) : undefined;
    const maxAmount = values.maxAmount ? Number(values.maxAmount) : undefined;
    const startDate = toEpoch(values.startDate);
    const endDate = toEpoch(values.endDate);

    const filters: TransactionQueries = {
      ...(values.search?.trim() && { search: values.search.trim() }),
      ...(values.category && { category: values.category }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(minAmount !== undefined && !Number.isNaN(minAmount) && { minAmount }),
      ...(maxAmount !== undefined && !Number.isNaN(maxAmount) && { maxAmount }),
      ...(values.sort && values.sort !== "desc" && { sort: values.sort }),
    };

    onApply(filters);
    onOpenChange(false);
  });

  const clearFilters = () => {
    reset(defaultValues);
    onApply({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-bg">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <h2 className="">Filter Transactions</h2>

          <Input
            name="search"
            label="Name"
            placeholder="Search by name"
            register={register}
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs capitalize">Category</label>
            <Combobox
              items={categories}
              value={activeCategory}
              onValueChange={(val) => {
                setValue("category", val?.value ?? "");
              }}
            >
              <ComboboxInput
                className="w-full border border-neutral-300"
                placeholder="All categories"
              />
              <ComboboxContent className={"bg-bg text-text-pri border border-bor"}>
                <ComboboxEmpty>No matching category.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      key={item.value}
                      value={item}
                      className={"hover:!bg-pri"}
                    >
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="startDate"
              label="From"
              type="datetime-local"
              register={register}
            />
            <Input
              name="endDate"
              label="To"
              type="datetime-local"
              register={register}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="minAmount"
              label="Min amount"
              type="text"
              inputMode="numeric"
              placeholder="0"
              register={register}
            />
            <Input
              name="maxAmount"
              label="Max amount"
              type="text"
              inputMode="numeric"
              placeholder="No limit"
              register={register}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs capitalize">Sort</label>
            <Combobox
              items={SORT_OPTIONS}
              value={activeSort}
              onValueChange={(val) => setValue("sort", val?.value ?? "desc")}
            >
              <ComboboxInput
                className="w-full border border-neutral-300"
                placeholder="Newest first"
              />
              <ComboboxContent className={"bg-bg text-text-pri border border-bor"}>
                <ComboboxEmpty>No options.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      key={item.value}
                      value={item}
                      className={"hover:!bg-pri"}
                    >
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="w-full flex items-center justify-center gap-4">
            <Button
              btnType="secondary"
              type="button"
              onClick={clearFilters}
              className="w-full"
            >
              Clear all
            </Button>
            <Button btnType="primary" type="submit" className="w-full">
              Apply filters
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
