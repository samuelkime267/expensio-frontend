import { useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import { expenseCategories } from "@/data/category.data";
import InputDropdown from "./InputDropdown";
import {
  createIncomeSchema,
  type CreateIncomeSchemaType,
} from "@/features/income/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";

export default function Log() {
  const [isIncome, setIsIncome] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    setError,
  } = useForm<CreateIncomeSchemaType>({
    resolver: zodResolver(
      createIncomeSchema,
    ) as unknown as Resolver<CreateIncomeSchemaType>,
  });

  const submit = handleSubmit((bodyData: CreateIncomeSchemaType) => {
    if (!isIncome && !bodyData.name) {
      setError("name", { message: "Name is required" });
      return;
    }

    console.log(bodyData);
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="">Log</h2>
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
          items={expenseCategories}
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
          onChange={(e) => {
            console.log("changes");
            console.log(e.target.value);
          }}
          register={register}
          error={errors.date?.message}
        />

        <TextArea
          name="description"
          label="description"
          register={register}
          error={errors.description?.message}
        />
        <Button btnType="primary">Submit</Button>
      </form>
    </div>
  );
}
