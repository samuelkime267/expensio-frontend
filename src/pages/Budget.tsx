import {
  Button,
  EmptyState,
  ErrorState,
  LoaderSpinner,
  OutcomeModal,
} from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BudgetDetailDialog,
  BudgetGroup,
  BudgetHealth,
  BudgetOverview,
  BudgetSetupDialog,
  BudgetSkeleton,
  GoalsSection,
  MoveMoneyDialog,
  OnboardingCard,
  type BudgetItemSchemaType,
} from "@/features/budget";
import { useDeleteBudget, useGetBudget } from "@/features/budget";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Filter = "all" | "on-track" | "watch" | "over";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "On track", value: "on-track" },
  { label: "Watch", value: "watch" },
  { label: "Over", value: "over" },
];

const matchesFilter = (item: BudgetItemSchemaType, filter: Filter) => {
  if (filter === "all") return true;
  if (filter === "on-track")
    return item.status === "UNDER_BUDGET" || item.status === "ON_TRACK";
  if (filter === "watch") return item.status === "NEAR_LIMIT";
  return item.status === "OVER_BUDGET";
};

export default function Budget() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedItem, setSelectedItem] =
    useState<BudgetItemSchemaType | null>(null);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isMoveMoneyOpen, setIsMoveMoneyOpen] = useState(false);
  const [moveFromValue, setMoveFromValue] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);

  const { data, isPending, isError, error, refetch, isFetching } =
    useGetBudget(year, month);
  const budget = data?.budget ?? null;

  const deleteBudget = useDeleteBudget({
    onSuccess: () => {
      setIsDeleteOpen(false);
      setIsDeleteSuccessOpen(true);
    },
  });

  const monthLabel = `${MONTHS[month - 1]} ${year}`;

  const goPrev = () => {
    setSelectedItem(null);
    if (month === 1) {
      setYear((prev) => prev - 1);
      setMonth(12);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const goNext = () => {
    setSelectedItem(null);
    if (month === 12) {
      setYear((prev) => prev + 1);
      setMonth(1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const visibleItems = budget?.items.filter((item) =>
    matchesFilter(item, filter),
  );

  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      <div className="flex items-start justify-start lg:items-center lg:justify-between gap-4 flex-col lg:flex-row">
        <h1 className="text-pri text-2xl font-medium capitalize">Budget</h1>

        <div className="flex items-center justify-start gap-2">
          <Button
            btnType="accent"
            className="p-2"
            onClick={goPrev}
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button btnType="accent" className="text-xs">
                {monthLabel}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-bg max-h-80 overflow-y-auto" align="end">
              <DropdownMenuGroup>
                {MONTHS.map((label, index) => (
                  <DropdownMenuItem
                    asChild
                    key={label}
                    onClick={() => {
                      setSelectedItem(null);
                      setMonth(index + 1);
                    }}
                  >
                    <p className={cn({ "text-pri font-medium": index + 1 === month })}>
                      {label} {year}
                    </p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            btnType="accent"
            className="p-2"
            onClick={goNext}
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </Button>

          {budget && (
            <>
              <Button
                btnType="accent"
                className="text-xs"
                onClick={() => setIsSetupOpen(true)}
              >
                Edit
              </Button>
              <Button
                btnType="accent"
                className="text-xs text-err"
                onClick={() => setIsDeleteOpen(true)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {isError && (
        <div className="border border-bor rounded-xl p-4 flex flex-col">
          <ErrorState
            message={error?.message}
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        </div>
      )}

      {isPending && <BudgetSkeleton />}

      {!isPending && !isError && !budget && (
        <OnboardingCard
          onStart={() => {
            setSelectedItem(null);
            setIsSetupOpen(true);
          }}
        />
      )}

      {!isPending && !isError && budget && (
        <>
          <div className="flex items-center justify-start gap-2 flex-wrap">
            {FILTERS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={cn(
                  "w-fit rounded-full flex items-center justify-center gap-1 p-2.5 py-0.75 text-[11px] transition-colors duration-300",
                  {
                    "bg-pri text-bg": filter === value,
                    "bg-sec/30 text-text-pri hover:bg-sec/60":
                      filter !== value,
                  },
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <BudgetOverview budget={budget} />
          <BudgetHealth items={budget.items} />

          <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-start gap-2">
              <div className="p-2.5 rounded-md bg-sec/30">
                <Wallet className="size-4" />
              </div>
              <h2 className="text-lg font-medium text-text-pri capitalize">
                Safe to spend
              </h2>
            </div>
            <p className="text-xl font-medium text-text-pri">
              ₦{formatCurrency(budget.overview.safeToSpend)}
            </p>
            <p className="text-xs text-text-mute">
              ₦{formatCurrency(budget.overview.weeklySafe)}/week until the end
              of the month
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <BudgetGroup
              title="Essentials"
              subtitle="Fixed monthly costs"
              icon={<Home className="size-4" />}
              items={visibleItems?.filter((item) => item.type === "FIXED") ?? []}
              onSelect={setSelectedItem}
            />
            <BudgetGroup
              title="Lifestyle"
              subtitle="Flexible spending"
              icon={<Sparkles className="size-4" />}
              items={
                visibleItems?.filter((item) => item.type === "FLEXIBLE") ?? []
              }
              onSelect={setSelectedItem}
            />
            <BudgetGroup
              title="Goals"
              subtitle="Set aside for savings"
              icon={<Target className="size-4" />}
              items={visibleItems?.filter((item) => item.type === "GOAL") ?? []}
              onSelect={setSelectedItem}
            />
          </div>

          {visibleItems?.length === 0 && (
            <div className="border border-bor rounded-xl">
              <EmptyState
                Icon={Wallet}
                title="Nothing to show"
                description="No categories match this filter."
              />
            </div>
          )}

          <GoalsSection />
        </>
      )}

      <BudgetSetupDialog
        open={isSetupOpen}
        onOpenChange={setIsSetupOpen}
        year={year}
        month={month}
        existingBudget={budget}
      />

      {budget && (
        <>
          <BudgetDetailDialog
            open={!!selectedItem}
            onOpenChange={(open) => {
              if (!open) setSelectedItem(null);
            }}
            item={selectedItem}
            budget={budget}
            onEdit={() => {
              setSelectedItem(null);
              setIsSetupOpen(true);
            }}
            onMoveMoney={(item) => {
              setSelectedItem(null);
              setMoveFromValue(item.category.value);
              setIsMoveMoneyOpen(true);
            }}
          />

          <MoveMoneyDialog
            open={isMoveMoneyOpen}
            onOpenChange={setIsMoveMoneyOpen}
            budget={budget}
            defaultFromValue={moveFromValue}
          />
        </>
      )}

      <OutcomeModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        status="failure"
        title="Delete this budget?"
        description="This will remove the budget for this month. This cannot be undone."
      >
        <div className="w-full flex items-center justify-center gap-4 mt-4">
          <Button
            btnType="secondary"
            className="w-full"
            onClick={() => setIsDeleteOpen(false)}
            disabled={deleteBudget.isPending}
          >
            Close
          </Button>
          <Button
            btnType="primary"
            className="bg-err w-full"
            onClick={() => budget && deleteBudget.mutate(budget._id)}
            disabled={deleteBudget.isPending}
          >
            {deleteBudget.isPending ? (
              <LoaderSpinner className="size-6" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </OutcomeModal>

      <OutcomeModal
        isOpen={isDeleteSuccessOpen}
        setIsOpen={setIsDeleteSuccessOpen}
        title="Budget deleted"
        description="You can build a new budget for this month anytime."
      />
    </div>
  );
}
