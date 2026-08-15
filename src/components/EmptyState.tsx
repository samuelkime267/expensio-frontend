import { cn } from "@/lib/utils";
import type { IconType } from "react-icons/lib";

type EmptyStateProps = {
  Icon?: IconType;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function EmptyState({
  Icon,
  title,
  description,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center gap-3 p-8 text-center",
        className,
      )}
    >
      {Icon && (
        <div className="bg-sur flex items-center justify-center p-4 w-fit rounded-full">
          <Icon className="size-6 text-text-mute" />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-text-mute">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
