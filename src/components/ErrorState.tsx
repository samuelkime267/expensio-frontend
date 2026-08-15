import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
};

export default function ErrorState({
  message,
  onRetry,
  isRetrying,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "border w-full border-destructive flex items-center justify-between gap-2 p-2 rounded-sm bg-err/10",
        className,
      )}
    >
      <div className="flex items-center justify-start gap-2">
        <InfoIcon className="size-4 text-destructive" />
        <p className="text-destructive text-sm">
          {message || "Something went wrong"}
        </p>
      </div>
      {onRetry && (
        <Button
          btnType="secondary"
          onClick={onRetry}
          disabled={isRetrying}
          className="w-fit text-xs px-3 py-1"
        >
          {isRetrying ? "Retrying..." : "Retry"}
        </Button>
      )}
    </div>
  );
}
