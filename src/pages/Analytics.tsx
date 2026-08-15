import {
  BarChart,
  Button,
  DonutChart,
  EmptyState,
  ErrorState,
  ProgressBar,
} from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AnalyticsSkeleton,
  AnalyticsStatCard,
  useGetAnalytics,
} from "@/features/analytics";
import { durations, type duration } from "@/data/durations.data";
import { formatCurrency } from "@/utils";
import { cn } from "@/lib/utils";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineSavings } from "react-icons/md";
import { TbReceipt } from "react-icons/tb";
import { CalendarDays, Flame, Scale, Sparkles, Wallet } from "lucide-react";
import { useState } from "react";

const ANALYTICS_PALETTE = [
  "#1e483f",
  "#baf49d",
  "#4a7c6f",
  "#d8eedd",
  "#7fb8a0",
  "#e6f4ea",
];

export default function Analytics() {
  const [duration, setDuration] = useState<duration>("month");
  const durationLabel =
    durations.find(({ value }) => value === duration)?.label || "";

  const { data, isPending, isError, error, refetch, isFetching } =
    useGetAnalytics(duration);

  const hasData = Boolean(data && (data.income > 0 || data.expense > 0));

  const topBreakdown = data?.spendingBreakdown.slice(0, 6) || [];
  const topTrends = data?.spendingTrends.slice(0, 6) || [];
  const maxTrend = Math.max(...topTrends.map((t) => t.amount), 0);

  const cashflowData = data
    ? {
        labels: ["Income", "Expenses"],
        datasets: [
          {
            label: "Cash Flow",
            data: [data.income, data.expense],
            backgroundColor: ["#baf49d", "#1e483f"],
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      }
    : undefined;

  const donutData = topBreakdown.length
    ? {
        labels: topBreakdown.map((item) => item.name),
        datasets: [
          {
            data: topBreakdown.map((item) => item.amount),
            backgroundColor: topBreakdown.map(
              (_, i) => ANALYTICS_PALETTE[i % ANALYTICS_PALETTE.length],
            ),
            borderWidth: 0,
          },
        ],
      }
    : undefined;

  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      <div className="flex items-start justify-start lg:items-center lg:justify-between gap-4 flex-col lg:flex-row">
        <h1 className="text-pri text-2xl font-medium capitalize">Analytics</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              btnType="accent"
              className="flex items-center justify-center gap-2 text-xs "
            >
              {duration !== "all-time" && "This"} {durationLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bg" align="end">
            <DropdownMenuGroup>
              {durations.map(({ label, value }, i) => {
                if (value === "day") return;
                return (
                  <DropdownMenuItem
                    asChild
                    key={i}
                    onClick={() => setDuration(value)}
                  >
                    <p>{label}</p>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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

      {isPending && <AnalyticsSkeleton />}

      {!isPending && !isError && !hasData && (
        <div className="border border-bor rounded-xl p-4">
          <EmptyState
            Icon={TbReceipt}
            title="No data for this period"
            description="Log income or expenses to see your analytics here."
          />
        </div>
      )}

      {!isPending && !isError && hasData && data && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnalyticsStatCard
              label="Income"
              value={`₦${formatCurrency(data.income)}`}
              icon={<GiReceiveMoney className="size-4" />}
            />
            <AnalyticsStatCard
              label="Expenses"
              value={`₦${formatCurrency(data.expense)}`}
              icon={<GiPayMoney className="size-4" />}
            />
            <AnalyticsStatCard
              label="Net"
              value={`${data.net >= 0 ? "+" : "-"}₦${formatCurrency(
                Math.abs(data.net),
              )}`}
              icon={<Scale className="size-4" />}
              valueClassName={cn({
                "text-success": data.net >= 0,
                "text-err": data.net < 0,
              })}
            />
            <AnalyticsStatCard
              label="Savings"
              value={`${data.savingsRate}%`}
              icon={<MdOutlineSavings className="size-4" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-bor rounded-xl p-4 flex flex-col gap-6 md:col-span-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium text-text-pri capitalize">
                  Cash Flow
                </h2>
                <p className="text-xs text-text-mute">Income vs Expenses</p>
              </div>

              <BarChart data={cashflowData!} />

              <div className="flex items-center justify-end gap-4">
                <div className="flex items-center justify-start gap-2">
                  <div className="bg-[#baf49d] size-4 rounded-full" />
                  <p className="text-sm">Income</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="bg-[#1e483f] size-4 rounded-full" />
                  <p>Expense</p>
                </div>
              </div>
            </div>

            <div className="border border-bor rounded-xl p-4 flex flex-col gap-6">
              <h2 className="text-lg font-medium text-text-pri capitalize">
                Spending Breakdown
              </h2>

              {donutData && <DonutChart data={donutData} />}

              <div className="flex flex-col gap-3">
                {topBreakdown.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center justify-start gap-2">
                      <div
                        className="size-3 rounded-full shrink-0"
                        style={{
                          background:
                            ANALYTICS_PALETTE[i % ANALYTICS_PALETTE.length],
                        }}
                      />
                      <p className="text-sm text-text-pri capitalize">
                        {item.name}
                      </p>
                    </div>
                    <p className="text-sm text-text-sec">
                      ₦{formatCurrency(item.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
              <h2 className="text-lg font-medium text-text-pri capitalize">
                Spending Trends
              </h2>

              <div className="flex flex-col gap-4">
                {topTrends.map((item) => {
                  const isUp =
                    item.percentageChange !== null &&
                    item.percentageChange > 0;
                  return (
                    <div key={item.name} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-text-pri capitalize">
                          {item.name}
                        </p>

                        {item.percentageChange !== null && (
                          <div
                            className={cn(
                              "bg-sec/80 w-fit rounded-full flex items-center justify-start gap-1 p-2.5 py-0.75",
                              {
                                "bg-destructive/80": !isUp && item.percentageChange !== 0,
                                "bg-neutral-200": item.percentageChange === 0,
                              },
                            )}
                          >
                            {item.percentageChange !== 0 &&
                              (isUp ? (
                                <FaArrowTrendUp className="size-2.5" />
                              ) : (
                                <FaArrowTrendDown className="size-2.5" />
                              ))}
                            <p className="text-[9px]">
                              {isUp ? "+" : ""}
                              {item.percentageChange}%
                            </p>
                          </div>
                        )}
                      </div>

                      <ProgressBar
                        progress={
                          maxTrend > 0 ? (item.amount / maxTrend) * 100 : 0
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
              <h2 className="text-lg font-medium text-text-pri capitalize">
                Money Habits
              </h2>

              <div className="flex flex-col gap-4">
                {data.habits.biggestIncrease && (
                  <div className="flex items-start justify-start gap-3">
                    <div className="p-2.5 rounded-md bg-sec/30 shrink-0">
                      <Flame className="size-4" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-pri capitalize">
                        Biggest increase
                      </p>
                      <p className="text-xs text-text-mute">
                        {data.habits.biggestIncrease.name} +
                        {data.habits.biggestIncrease.percentageChange}%
                      </p>
                    </div>
                  </div>
                )}

                {data.habits.smallPurchases.count > 0 && (
                  <div className="flex items-start justify-start gap-3">
                    <div className="p-2.5 rounded-md bg-sec/30 shrink-0">
                      <Wallet className="size-4" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-pri capitalize">
                        Small purchases
                      </p>
                      <p className="text-xs text-text-mute">
                        {data.habits.smallPurchases.count} purchases → ₦
                        {formatCurrency(data.habits.smallPurchases.total)}
                      </p>
                    </div>
                  </div>
                )}

                {data.habits.weekendSpend.differencePercent !== null && (
                  <div className="flex items-start justify-start gap-3">
                    <div className="p-2.5 rounded-md bg-sec/30 shrink-0">
                      <CalendarDays className="size-4" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-pri capitalize">
                        Weekend spending
                      </p>
                      <p className="text-xs text-text-mute">
                        {Math.abs(data.habits.weekendSpend.differencePercent)}%
                        {data.habits.weekendSpend.differencePercent > 0
                          ? " higher"
                          : " lower"}{" "}
                        than weekdays
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border border-bor rounded-xl p-4 flex flex-col gap-3">
              <h2 className="text-lg font-medium text-text-pri capitalize">
                Where Did Your Money Go?
              </h2>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <p className="text-text-pri capitalize">Income</p>
                  <p className="text-success">
                    +₦{formatCurrency(data.whereMoneyWent.income)}
                  </p>
                </div>

                {data.whereMoneyWent.categories.slice(0, 5).map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <p className="text-text-pri capitalize">{item.name}</p>
                    <p className="text-text-sec">
                      -₦{formatCurrency(item.amount)}
                    </p>
                  </div>
                ))}

                <div className="flex items-center justify-between gap-4 text-sm border-t border-bor pt-3">
                  <p className="font-medium text-text-pri">Remaining</p>
                  <p
                    className={cn("font-semibold", {
                      "text-success": data.whereMoneyWent.remaining >= 0,
                      "text-err": data.whereMoneyWent.remaining < 0,
                    })}
                  >
                    {data.whereMoneyWent.remaining >= 0 ? "+" : "-"}₦
                    {formatCurrency(Math.abs(data.whereMoneyWent.remaining))}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-bor rounded-xl p-4 flex flex-col gap-4 md:col-span-2">
              <h2 className="text-lg font-medium text-text-pri capitalize">
                Expensio Review
              </h2>

              <div className="flex items-start justify-start gap-3">
                <div className="p-2.5 rounded-md bg-sec/30 shrink-0">
                  <Sparkles className="size-4" />
                </div>
                <p className="text-sm text-text-sec leading-relaxed">
                  "{data.review}"
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
