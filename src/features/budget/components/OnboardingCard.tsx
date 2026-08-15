import { Button, EmptyState } from "@/components";
import { Wallet } from "lucide-react";

export default function OnboardingCard({ onStart }: { onStart: () => void }) {
  return (
    <div className="border border-bor rounded-xl">
      <EmptyState
        Icon={Wallet}
        title="Let's build your first budget"
        description="Set your monthly income, let us suggest category budgets from your spending, and track it all in one place."
      >
        <Button btnType="primary" className="w-fit px-6" onClick={onStart}>
          Build my budget
        </Button>
      </EmptyState>
    </div>
  );
}
