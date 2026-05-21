import { TbMoneybag } from "react-icons/tb";
import useGetBalance from "@/features/user/utils/useGetBalance";
import { formatCurrency } from "@/utils";

export default function BalanceStats() {
  const { data } = useGetBalance();
  const amount = data?.balance || 0;

  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-md bg-sec/30 w-fit">
          <TbMoneybag className="size-4" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-neutral-200 w-fit rounded-full flex items-center justify-start gap-1 p-2.5 py-0.75">
          <p className="text-[9px]">-</p>
        </div>
        <div className="space-y-1">
          <p className="text-xl font-medium">₦{formatCurrency(amount)}</p>
          <p className="capitalize text-xs text-text-mute">Total balance</p>
        </div>
      </div>
    </div>
  );
}
