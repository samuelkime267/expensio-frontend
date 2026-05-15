import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";

export default function Log() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="">Log</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" label="name" />
        <Input name="amount" label="amount" />
        <TextArea name="description" label="description" />
        <Button btnType="primary">Submit</Button>
      </form>
    </div>
  );
}
