import { Skeleton } from "@/components";

export default function StatusCardSkeleton() {
  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Skeleton className="size-9 rounded-md" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-6 w-14 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
