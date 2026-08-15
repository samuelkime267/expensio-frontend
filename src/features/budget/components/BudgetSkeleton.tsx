import { Skeleton } from "@/components";

export default function BudgetSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-2 w-full" />
        <div className="grid grid-cols-3 gap-4 border-t border-bor pt-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="border border-bor rounded-xl p-4 flex flex-col gap-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-7 w-10" />
          <Skeleton className="h-7 w-10" />
          <Skeleton className="h-7 w-10" />
        </div>
      </div>

      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="border border-bor rounded-xl overflow-hidden">
          <div className="p-4">
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="divide-y divide-bor">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="flex items-center gap-3 p-4">
                <Skeleton className="size-9 rounded-md" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-2 w-24" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
