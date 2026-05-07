import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type InlineLoaderProps = {
  className?: string;
  isLoading?: boolean;
};

export default function InlineLoader({
  className,
  isLoading = true,
}: InlineLoaderProps) {
  if (!isLoading) return null;

  return (
    <LoaderCircleIcon
      className={cn("text-bg size-6 animate-spin", className)}
    />
  );
}
