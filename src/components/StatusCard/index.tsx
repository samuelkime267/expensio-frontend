import IncomeStats from "./sub/IncomeStats";
import ExpenseStats from "./sub/ExpenseStats";
import BalanceStats from "./sub/BalanceStats";

type StatusCardProps = {
  type: "income" | "expense" | "balance";
};

export default function StatusCard({ type }: StatusCardProps) {
  return (
    <>
      {type === "income" && <IncomeStats />}
      {type === "expense" && <ExpenseStats />}
      {type === "balance" && <BalanceStats />}
    </>
  );
}
