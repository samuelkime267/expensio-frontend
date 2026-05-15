import { Button, ProgressBar } from "@/components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Plus } from "lucide-react";
import { MdOutlineSavings } from "react-icons/md";

export default function SavingsPlanCard() {
  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2>Saving Plan</h2>

        <Button className="text-[10px] text-nowrap flex items-center justify-center gap-1">
          <Plus className="size-3" />
          Add Plans
        </Button>
      </div>

      <div className="space-y-2">
        <div className="w-full flex flex-col gap-4 transition-colors duration-300 hover:cursor-pointer hover:bg-sur p-2 rounded-md border border-bor">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-full border border-bor w-fit">
                <MdOutlineSavings className="size-4 text-pri" />
              </div>
              <p className="text-xs font-medium">Emergency Funds</p>
            </div>

            <Button btnType="accent" className="px-2 rounded-md">
              <BsThreeDotsVertical className="size-3.5" />
            </Button>
          </div>
          <div className="w-full space-y-2">
            <ProgressBar progress={10} />
            <div className="w-full flex items-center justify-between gap-2">
              <div className="flex items-start justify-center flex-col">
                <p className="text-[10px]">Saved(10%)</p>
                <p className="text-sm font-medium">₦10,000</p>
              </div>
              <div className="flex items-end justify-center flex-col">
                <p className="text-[10px]">Target</p>
                <p className="text-sm font-medium">₦100,000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 transition-colors duration-300 hover:cursor-pointer hover:bg-sur p-2 rounded-md border border-bor">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-full border border-bor w-fit">
                <MdOutlineSavings className="size-4 text-pri" />
              </div>
              <p className="text-xs font-medium">Emergency Funds</p>
            </div>

            <Button btnType="accent" className="px-2 rounded-md">
              <BsThreeDotsVertical className="size-3.5" />
            </Button>
          </div>
          <div className="w-full space-y-2">
            <ProgressBar progress={10} />
            <div className="w-full flex items-center justify-between gap-2">
              <div className="flex items-start justify-center flex-col">
                <p className="text-[10px]">Saved(10%)</p>
                <p className="text-sm font-medium">₦10,000</p>
              </div>
              <div className="flex items-end justify-center flex-col">
                <p className="text-[10px]">Target</p>
                <p className="text-sm font-medium">₦100,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
