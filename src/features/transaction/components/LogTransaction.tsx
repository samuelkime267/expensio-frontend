import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useGetCategories } from "@/features/category/utils";
import {
  Button,
  Input,
  InputDropdown,
  LoaderSpinner,
  TextArea,
} from "@/components";
import { useCreateTransaction } from "../utils/useCreateTransaction";
import {
  createTransactionSchema,
  type CreateTransactionSchemaType,
} from "../schemas";

type LogTransactionProps = {
  type: "Income" | "Expense";
  onSuccess?: () => void;
};

export default function LogTransaction({
  type,
  onSuccess,
}: LogTransactionProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    setError,
    reset,
  } = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(
      createTransactionSchema,
    ) as unknown as Resolver<CreateTransactionSchemaType>,
  });
  const { data, isLoading, isError } = useGetCategories(type === "Income");
  const categories = (data || []).map((item) => ({
    label: item.name,
    value: item.value,
  }));

  const { mutate, isPending } = useCreateTransaction({
    onSuccess: () => {
      if (onSuccess) onSuccess();
      reset();
      setValue("type", type);
    },
  });

  const overallLoading = isPending;

  const submit = handleSubmit((bodyData: CreateTransactionSchemaType) => {
    mutate(bodyData);
  });

  useEffect(() => {
    setValue("type", type);
  }, [type, setValue]);

  return (
    <div className="relative p-2 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="">Log {type}</h2>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Input
          required
          name="name"
          label="name"
          placeholder="Enter name"
          register={register}
          error={errors.name?.message}
        />
        <Input
          required
          name="amount"
          label="amount"
          placeholder="Enter amount"
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
  );
}
