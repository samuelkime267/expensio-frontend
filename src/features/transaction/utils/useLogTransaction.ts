import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useGetCategories } from "@/features/category/utils";
import { useCreateTransaction } from "../utils/useCreateTransaction";
import {
  createTransactionSchema,
  type BreakdownType,
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
  const [isBreakDownMode, setIsBreakDownMode] = useState(false);
  const [breakdowns, setBreakdowns] = useState<BreakdownType[]>([]);
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

  const saveBreakdowns = (items: BreakdownType[]) => {
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    const { valueStr, value } = formatAmount(total);

    setBreakdowns(items);
    setAmount(valueStr);
    setValue("amount", value);
    setIsBreakDownMode(true);
    setIsBreakDownModalOpen(false);
  };

  const clearBreakdowns = () => {
    setBreakdowns([]);
    setIsBreakDownMode(false);
  };

  const submit = handleSubmit((bodyData: CreateTransactionSchemaType) => {
    const payload = { ...bodyData, breakdowns };
    if (!transaction) {
      mutate(payload);
      return;
    }

    updateMutate({ transaction: payload, id: transaction._id });
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
      const items = transaction.breakdowns || [];
      setBreakdowns(items);
      setIsBreakDownMode(items.length > 0);
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
    isBreakDownMode,
    breakdowns,
    saveBreakdowns,
    clearBreakdowns,
    data,
    isLoading,
    isError,
    amount,
    categories,
    setValue,
    setBtnClicked,
  };
}
