import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import type { IconType } from "react-icons/lib";
import { MdError, MdWarning } from "react-icons/md";

type OutcomeModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Icon?: IconType;
  title: string;
  description: string;
  status?: "success" | "failure" | "pending";
};

export default function OutcomeModal({
  isOpen,
  setIsOpen,
  description,
  title,
  Icon,
  status = "success",
}: OutcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm bg-bg z-100">
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <>
            <div
              className={cn(
                "bg-success/20 flex items-center justify-center p-4 w-fit rounded-full",
                {
                  "bg-err/20": status === "failure",
                  "bg-pending/20": status === "pending",
                },
              )}
            >
              <div
                className={cn(
                  "bg-success flex items-center justify-center p-6 w-fit rounded-full",
                  {
                    "bg-err": status === "failure",
                    "bg-pending": status === "pending",
                  },
                )}
              >
                {Icon ? (
                  <Icon className="text-white size-12" />
                ) : (
                  <>
                    {status === "success" && (
                      <CheckIcon className="text-white size-12" />
                    )}
                    {status === "failure" && (
                      <MdError className="text-white size-12" />
                    )}
                    {status === "pending" && (
                      <MdWarning className="text-white size-12" />
                    )}
                  </>
                )}
              </div>
            </div>
          </>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold text-center capitalize">
              {title}
            </h2>
            <p className="text-text-sec mt-2 text-center max-w-[17pc] text-sm">
              {description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
