import { useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import InputDropdown from "./InputDropdown";
import {
  createIncomeSchema,
  type CreateIncomeSchemaType,
} from "@/features/income/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useGetCategories } from "@/features/category/utils";
import LoaderSpinner from "./LoaderSpinner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLogIncome } from "@/features/income/utils";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useLogExpense } from "@/features/expense/utils";
import type { CreateExpenseSchemaType } from "@/features/expense/schema";

export default function Log() {
  const [isIncome] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    setError,
    reset,
  } = useForm<CreateIncomeSchemaType>({
    resolver: zodResolver(
      createIncomeSchema,
    ) as unknown as Resolver<CreateIncomeSchemaType>,
  });
  const { data, isLoading, isError } = useGetCategories(isIncome);
  const categories = (data || []).map((item) => ({
    label: item.name,
    value: item.value,
  }));

  const { mutate: mutateIncome, isPending: isIncomePending } = useLogIncome({
    onSuccess: () => {
      setIsOpen(true);
      reset();
    },
  });
  const { mutate: mutateExpense, isPending: isExpensePending } = useLogExpense({
    onSuccess: () => {
      setIsOpen(true);
      reset();
    },
  });

  const overallLoading = isIncomePending || isExpensePending;

  const submit = handleSubmit((bodyData: CreateIncomeSchemaType) => {
    if (!isIncome) {
      if (!bodyData.name || typeof bodyData.name !== "string") {
        setError("name", { message: "Name is required" });
        return;
      }
      console.log("bodyData", bodyData);
      mutateExpense(bodyData as CreateExpenseSchemaType);
      return;
    }
    mutateIncome(bodyData);
  });

  return (
    <>
      <div className="relative p-2 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="">Log {isIncome ? "Income" : "Expense"}</h2>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Input
            required={!isIncome}
            name="name"
            label="name"
            register={register}
            error={errors.name?.message}
          />
          <Input
            required
            name="amount"
            label="amount"
            register={register}
            error={errors.amount?.message}
          />
          <InputDropdown
            required
            items={categories}
            label="Category"
            name="category"
            error={errors.category?.message}
            setValue={setValue}
            setError={setError}
          />
          <Input
            required
            name="date"
            label="date"
            type="date"
            register={register}
            error={errors.date?.message}
          />

          <TextArea
            name="description"
            label="description"
            register={register}
            error={errors.description?.message}
          />
          <Button btnType="primary" disabled={overallLoading}>
            {overallLoading ? <LoaderSpinner className="size-6" /> : "Submit"}
          </Button>
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
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-sm bg-bg z-100">
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <div className="bg-success/20 flex items-center justify-center p-4 w-fit rounded-full">
              <div className="bg-success flex items-center justify-center p-6 w-fit rounded-full">
                {isIncome ? (
                  <GiReceiveMoney className="text-white size-12" />
                ) : (
                  <GiPayMoney className="text-white size-12" />
                )}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-center capitalize">
                {isIncome ? "Income" : "Expense"} Logged Successfully
              </h2>
              <p className="text-text-sec mt-2 text-center max-w-[17pc] text-sm">
                Your {isIncome ? "income" : "expense"} has been logged you can
                now close this window.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
