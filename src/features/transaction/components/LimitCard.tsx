import { Button, ProgressBar } from "@/components";
import { BsThreeDotsVertical } from "react-icons/bs";

type LimitCardProps = {
  isWeekly?: boolean;
};

export default function LimitCard({ isWeekly }: LimitCardProps) {
  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2>{isWeekly ? "Weekly" : "Daily"} Limit</h2>

        <Button btnType="accent" className="px-2 rounded-md">
          <BsThreeDotsVertical className="size-3.5" />
        </Button>
      </div>
      <div className="w-full space-y-1">
        <div className="flex items-center justify-start gap-1">
          <p className="text font-medium">₦10,000</p>
          <p className="text-xs">Left</p>
        </div>
        <ProgressBar progress={20} />
      </div>
    </div>
  );
}
