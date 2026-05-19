import { cn } from "@/lib/utils";
import { ImSpinner10 } from "react-icons/im";

type LoaderSpinnerProps = {
  className?: string;
};

export default function LoaderSpinner({ className }: LoaderSpinnerProps) {
  return <ImSpinner10 className={cn("animate-spin", className)} />;
}
