import { cn } from "@/lib/utils";

type Props = {
  progress?: number;
  max?: number;
  currentVal?: number;
  className?: string;
};

export default function ProgressBar({
  progress,
  max,
  currentVal,
  className,
}: Props) {
  const fraction = currentVal || 0 / (max || 0);
  const percentage = fraction === Infinity ? 0 : Math.floor(fraction * 100);
  const finalPercentage = progress ? progress : percentage;

  return (
    <div className={cn("w-full relative h-2 rounded-full bg-sec", className)}>
      <div
        className="absolute top-0 left-0 h-full rounded-full bg-pri"
        style={{ width: `${finalPercentage}%` }}
      ></div>
    </div>
  );
}
