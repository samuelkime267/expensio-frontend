import { Button, ProgressBar } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/utils";
import { PenLineIcon, TrashIcon } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Target } from "lucide-react";
import type { GoalSchemaType } from "../schemas";

type GoalCardProps = {
  goal: GoalSchemaType;
  onEdit: (goal: GoalSchemaType) => void;
  onDelete: (goal: GoalSchemaType) => void;
  onContribute: (goal: GoalSchemaType) => void;
};

export default function GoalCard({
  goal,
  onEdit,
  onDelete,
  onContribute,
}: GoalCardProps) {
  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-start gap-2 min-w-0">
          <div className="p-2.5 rounded-md bg-sec/30 shrink-0">
            <Target className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="text-sm font-medium text-text-pri capitalize truncate">
              {goal.name}
            </h2>
            <p className="text-xs text-text-mute capitalize">
              {goal.targetDate.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center justify-center gap-2 p-2">
              <BsThreeDotsVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bg" align="end">
            <DropdownMenuItem asChild>
              <Button
                onClick={() => onEdit(goal)}
                className="w-full flex items-center justify-start gap-2 hover:bg-black/10!"
              >
                <PenLineIcon className="text-text-pri size-4" />
                <p className="text-text-pri">Edit</p>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                onClick={() => onDelete(goal)}
                className="w-full flex items-center justify-start gap-2 hover:bg-err/10!"
              >
                <TrashIcon className="text-err size-4" />
                <p className="text-err">Delete</p>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <ProgressBar progress={goal.progress} />
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-text-pri">
            ₦{formatCurrency(goal.saved)}
          </p>
          <p className="text-xs text-text-mute">
            of ₦{formatCurrency(goal.targetAmount)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-bor pt-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <p className="text-text-sec capitalize">Set aside</p>
          <p className="text-text-pri">
            ₦{formatCurrency(goal.monthlyContribution)}/mo
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-text-sec capitalize">Recommended</p>
          <p className="text-text-pri">
            ₦{formatCurrency(goal.recommendedContribution)}/mo
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-text-sec capitalize">Time left</p>
          <p className="text-text-pri">
            {goal.monthsLeft} {goal.monthsLeft === 1 ? "month" : "months"}
          </p>
        </div>
      </div>

      <Button btnType="primary" onClick={() => onContribute(goal)}>
        Add to goal
      </Button>
    </div>
  );
}
