import { LogTransaction } from "@/features/transaction/components";

export default function Transactions() {
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <div className="w-full max-w-[450px] border border-bor  rounded-xl p-2 flex flex-col gap-4">
        <LogTransaction type="Income" />
      </div>
      <div className="w-full max-w-[450px] border border-bor  rounded-xl p-2 flex flex-col gap-4">
        <LogTransaction type="Expense" />
      </div>
      Income
      <h1>plan</h1>
      <ul>
        <li>Balance left</li>
        <li>total income this week</li>
        <li>quick log form for income</li>
        <li>chart showing income</li>
        <li>table of income</li>
      </ul>
    </div>
  );
}
