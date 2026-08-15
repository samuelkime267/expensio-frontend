import {
  Button,
  EmptyState,
  ErrorState,
  LoaderSpinner,
  OutcomeModal,
  Skeleton,
} from "@/components";
import { useState } from "react";
import { Target, Trash2 } from "lucide-react";
import type { GoalSchemaType } from "../schemas";
import { useDeleteGoal, useGetGoals } from "../utils";
import ContributeDialog from "./ContributeDialog";
import GoalCard from "./GoalCard";
import GoalSetupDialog from "./GoalSetupDialog";

export default function GoalsSection() {
  const { data: goals, isPending, isError, error, refetch, isFetching } =
    useGetGoals();

  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<GoalSchemaType | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [contributingGoal, setContributingGoal] =
    useState<GoalSchemaType | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<GoalSchemaType | null>(null);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);

  const deleteGoal = useDeleteGoal({
    onSuccess: () => {
      setDeletingGoal(null);
      setIsDeleteSuccessOpen(true);
    },
  });

  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium text-text-pri capitalize">
            Savings goals
          </h2>
          <p className="text-xs text-text-mute">
            Track your savings targets
          </p>
        </div>
        <Button
          btnType="accent"
          className="text-xs"
          onClick={() => setIsSetupOpen(true)}
        >
          <Target className="size-3" />
          New goal
        </Button>
      </div>

      {isError && (
        <ErrorState
          message={error?.message}
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
      )}

      {isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border border-bor rounded-xl p-4 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center justify-start gap-2">
                  <Skeleton className="size-9 rounded-md" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="size-6" />
              </div>
              <Skeleton className="h-2 w-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      )}

      {!isPending && !isError && goals && goals.length === 0 && (
        <EmptyState
          Icon={Target}
          title="No savings goals yet"
          description="Set a target, and add money to it whenever you can."
        />
      )}

      {!isPending && !isError && goals && goals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onEdit={(item) => {
                setEditingGoal(item);
                setIsEditOpen(true);
              }}
              onDelete={setDeletingGoal}
              onContribute={setContributingGoal}
            />
          ))}
        </div>
      )}

      <GoalSetupDialog open={isSetupOpen} onOpenChange={setIsSetupOpen} />

      <GoalSetupDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        goal={editingGoal}
      />

      <ContributeDialog
        open={!!contributingGoal}
        onOpenChange={(open) => {
          if (!open) setContributingGoal(null);
        }}
        goal={contributingGoal}
      />

      <OutcomeModal
        isOpen={!!deletingGoal}
        setIsOpen={(open) => {
          if (!open) setDeletingGoal(null);
        }}
        status="failure"
        title="Delete this goal?"
        description="This will remove the goal and unlink its transactions. This cannot be undone."
      >
        <div className="w-full flex items-center justify-center gap-4 mt-4">
          <Button
            btnType="secondary"
            className="w-full"
            onClick={() => setDeletingGoal(null)}
            disabled={deleteGoal.isPending}
          >
            Close
          </Button>
          <Button
            btnType="primary"
            className="bg-err w-full"
            onClick={() => deletingGoal && deleteGoal.mutate(deletingGoal._id)}
            disabled={deleteGoal.isPending}
          >
            {deleteGoal.isPending ? (
              <LoaderSpinner className="size-6" />
            ) : (
              <Trash2 className="size-4" />
            )}
            Delete
          </Button>
        </div>
      </OutcomeModal>

      <OutcomeModal
        isOpen={isDeleteSuccessOpen}
        setIsOpen={setIsDeleteSuccessOpen}
        title="Goal deleted"
        description="The goal and its transactions have been removed."
      />
    </div>
  );
}
