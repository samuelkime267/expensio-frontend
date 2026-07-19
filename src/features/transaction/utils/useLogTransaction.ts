import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useGetCategories } from "@/features/category/utils";
import { useCreateTransaction } from "../utils/useCreateTransaction";
import {
  createTransactionSchema,
  type CreateTransactionSchemaType,
  type TransactionSchemaType,
} from "../schemas";
import { formatAmount } from "@/utils";
import { useUpdateTransaction } from "./useUpdateTransaction";

type UseLogTransactionProps = {
  type: "Income" | "Expense";
  onSuccess?: () => void;
  transaction?: TransactionSchemaType;
};

export default function useLogTransaction({
  type,
  onSuccess,
  transaction,
}: UseLogTransactionProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
  } = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(
      createTransactionSchema,
    ) as unknown as Resolver<CreateTransactionSchemaType>,
  });
  const inputDateRef = useRef<HTMLInputElement>(null);
  const { date, category } = watch();
  const finalDate = new Date(date);

  const [isCustomDate, setIsCustomDate] = useState<boolean>();
  const [amount, setAmount] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isBreakDownModalOpen, setIsBreakDownModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetCategories(type === "Income");
  const [btnClicked, setBtnClicked] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { valueStr, value } = formatAmount(e.target.value);

    setAmount(valueStr);
    setValue("amount", value);
  };

  const categories = (data || []).map((item) => ({
    label: item.name,
    value: item.value,
  }));
  const activeCategory = categories.find(({ value }) => value === category);

  const { mutate, isPending } = useCreateTransaction({
    onSuccess: () => {
      if (onSuccess) onSuccess();
      reset();
      setValue("type", type);
    },
  });

  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateTransaction({
      onSuccess: () => {
        if (onSuccess) onSuccess();
        reset();
        setValue("type", type);
      },
    });

  const overallLoading = isPending || isUpdatePending;

  const submit = handleSubmit((bodyData: CreateTransactionSchemaType) => {
    if (!transaction) {
      mutate(bodyData);
      return;
    }

    updateMutate({ transaction: bodyData, id: transaction._id });
  });

  ///////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////
  useEffect(() => {
    if (!btnClicked) return;
    if (!date || (date as unknown) === "") {
      setIsCustomDate(undefined);
      return;
    }

    if (typeof date === "string") {
      setIsCustomDate(true);
      return;
    }
    if (typeof date === "object") {
      setIsCustomDate(false);
    }
  }, [date]);

  useEffect(() => {
    setValue("type", type);
  }, [type, setValue]);

  // Sets values on edit
  useEffect(() => {
    if (transaction) {
      setValue("name", transaction.name);
      setValue("amount", transaction.amount);
      setAmount(formatAmount(transaction.amount).valueStr);
      setValue("date", transaction.date);
      setValue("category", transaction.category.value);
      setValue("description", transaction.description);
      setValue("type", transaction.type);
    }
  }, [transaction, setValue]);

  return {
    submit,
    overallLoading,
    activeCategory,
    handleAmountChange,
    finalDate,
    errors,
    register,
    inputDateRef,
    date,
    category,
    isCustomDate,
    setIsCustomDate,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    isBreakDownModalOpen,
    setIsBreakDownModalOpen,
    data,
    isLoading,
    isError,
    amount,
    categories,
    setValue,
    setBtnClicked,
  };
}
