import { Button, Input, LoaderSpinner, TextArea } from "@/components";
import { type TransactionSchemaType } from "../schemas";
import { cn } from "@/lib/utils";
import { formatDateTime, getCurrentLocalDateTime } from "@/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useLogTransaction from "../utils/useLogTransaction";

type LogTransactionProps = {
  type: "Income" | "Expense";
  onSuccess?: () => void;
  className?: string;
  transaction?: TransactionSchemaType;
};

export default function LogTransaction({
  type,
  onSuccess,
  className,
  transaction,
}: LogTransactionProps) {
  const {
    submit,
    overallLoading,
    activeCategory,
    handleAmountChange,
    finalDate,
    errors,
    register,
    inputDateRef,
    category,
    isCustomDate,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    isBreakDownModalOpen,
    setIsBreakDownModalOpen,
    isLoading,
    isError,
    amount,
    categories,
    setValue,
    setBtnClicked,
  } = useLogTransaction({ type, onSuccess, transaction });

  return (
    <div
      className={cn(
        "w-full relative p-2 gap-8 h-full flex flex-col items-start justify-start",
        className,
      )}
    >
      <div className="w-full flex items-center justify-between gap-4">
        <h2 className="">
          {transaction ? "Edit" : "Log"} {type}
        </h2>
      </div>

      <form
        onSubmit={submit}
        className="space-y-4 w-full h-full flex flex-col items-start justify-between gap-4"
      >
        <div className="w-full space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Input
                required
                name="name"
                placeholder="Enter name"
                register={register}
                error={errors.name?.message}
                className="border-y-0 border-x-0 rounded-none px-0"
                inputClassName="text-base py-1 px-0"
              />
              <div className="flex flex-col items-end justify-end gap-1">
                <Button
                  btnType="accent"
                  className={cn("text-xs text-nowrap", {
                    "border-success text-success": activeCategory,
                  })}
                  type="button"
                  onClick={() => setIsCategoryModalOpen(true)}
                >
                  {activeCategory ? activeCategory.label : "Select Category"}
                </Button>
                {errors.category?.message && (
                  <p className="text-destructive text-xs">
                    {errors.category?.message}
                  </p>
                )}
              </div>
            </div>

            <Input
              required
              name="amount"
              type="text"
              inputMode="numeric"
              placeholder="Enter Amount"
              value={amount}
              onChange={handleAmountChange}
              error={errors.amount?.message}
              className="border-0"
              inputClassName="text-center text-3xl p-0 font-medium"
              containerClassName="border-y border-dashed border-black/20 py-4"
            />
            <Button
              btnType="accent"
              className={cn("text-xs text-nowrap hidden!")}
              type="button"
              onClick={() => setIsBreakDownModalOpen(true)}
            >
              Use Breakdown
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm">
                  Date & Time <span className="text-red-500">*</span>
                </p>
                <p className="text-sm">
                  {!isNaN(finalDate.getTime())
                    ? `${formatDateTime(finalDate).date} at ${formatDateTime(finalDate).time}`
                    : "Pick Date"}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 relative">
                <Button
                  btnType="accent"
                  className={cn("text-xs", {
                    "border-success text-success": isCustomDate === false,
                  })}
                  type="button"
                  onClick={() => {
                    if (inputDateRef.current) {
                      setBtnClicked(true);
                      const { date, localDateTime } = getCurrentLocalDateTime();
                      inputDateRef.current.value = localDateTime;
                      setValue("date", date);
                    }
                  }}
                >
                  Now
                </Button>
                <div>
                  <Button
                    btnType="accent"
                    className={cn("text-xs", {
                      "border-success text-success": isCustomDate === true,
                    })}
                    type="button"
                    onClick={() => {
                      if (inputDateRef.current) {
                        setBtnClicked(true);
                        inputDateRef.current.showPicker();
                      }
                    }}
                  >
                    Custom
                  </Button>
                  <Input
                    ref={inputDateRef}
                    required
                    name="date"
                    type="datetime-local"
                    register={register}
                    error={errors.date?.message}
                    inputClassName="absolute top-1/2 left-0 w-0 h-0 overflow-hidden"
                    containerClassName="absolute top-1/2 left-0 w-0 h-0 overflow-hidden"
                  />
                </div>
              </div>
              {errors.date?.message && (
                <p className="text-destructive text-xs">
                  {errors.date?.message}
                </p>
              )}
            </div>

            <TextArea
              name="description"
              label="description"
              register={register}
              error={errors.description?.message}
            />
          </div>
        </div>
        <div className="w-full">
          <Button btnType="primary" disabled={overallLoading}>
            {overallLoading ? <LoaderSpinner className="size-6" /> : "Submit"}
          </Button>
        </div>
      </form>

      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-bg/50 flex items-center justify-center backdrop-blur-xs">
          <LoaderSpinner className="size-10 text-pri" />
        </div>
      )}

      {isError && (
        <div className="absolute top-0 left-0 w-full h-full bg-bg/50 flex items-center justify-center backdrop-blur-xs flex-col gap-2">
          <p>Something went wrong</p>
          <p>Reload the page</p>
        </div>
      )}

      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent className="sm:max-w-xl bg-bg overflow-y-auto p-2 max-h-[calc(100dvh-6rem)]">
          <div
            className={cn(
              "w-full relative p-2 gap-6 h-full flex flex-col items-start justify-start",
              className,
            )}
          >
            <div className="w-full flex items-center justify-between gap-4">
              <h2 className="">Select Category</h2>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {categories.map(({ label, value }, i) => (
                <Button
                  key={i}
                  className={cn(
                    "border border-bor p-2 text-center text-xs w-full aspect-square rounded-md",
                    {
                      "border-pri text-pri": category === value,
                    },
                  )}
                  onClick={() => {
                    setValue("category", value);
                    setIsCategoryModalOpen(false);
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isBreakDownModalOpen}
        onOpenChange={setIsBreakDownModalOpen}
      >
        <DialogContent className="sm:max-w-xl bg-bg overflow-y-auto p-2 max-h-[calc(100dvh-6rem)]">
          <div
            className={cn(
              "w-full relative p-2 gap-6 h-full flex flex-col items-start justify-start",
              className,
            )}
          >
            <div className="w-full flex items-center justify-between gap-4">
              <h2 className="">Price Breakdown</h2>
            </div>

            <div>
              <div>
                <Input type="name" placeholder="Item Name" />
                <Input type="number" placeholder="Amount" />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
