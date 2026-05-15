import { LuCalendarSync } from "react-icons/lu";

export default function ActiveSubscriptions() {
  return (
    <div className="border border-bor rounded-xl p-4 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2>Active Subscriptions</h2>
      </div>

      <div className="space-y-2">
        <div className="w-full flex items-center justify-start gap-2 transition-colors duration-300 hover:cursor-pointer hover:bg-sur p-2 rounded-md border border-bor">
          <div className="p-2.5 rounded-full border border-bor w-fit">
            <LuCalendarSync className="size-4 text-pri" />
          </div>
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="space-y-1">
              <p className="font-medium text-sm">Spotify</p>
              <p className="text-[10px]">22/05/2026</p>
            </div>

            <div className="flex items-end justify-center flex-col gap-1">
              <p className="text-sm font-medium">₦12,000</p>
              <div className="py-0.25 px-2.5 bg-pending/20 rounded-full border border-pending w-fit">
                <p className="text-[10px]">Due</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-start gap-2 transition-colors duration-300 hover:cursor-pointer hover:bg-sur p-2 rounded-md border border-bor">
          <div className="p-2.5 rounded-full border border-bor w-fit">
            <LuCalendarSync className="size-4 text-pri" />
          </div>
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="space-y-1">
              <p className="font-medium text-sm">Spotify</p>
              <p className="text-[10px]">22/05/2026</p>
            </div>

            <div className="flex items-end justify-center flex-col gap-1">
              <p className="text-sm font-medium">₦12,000</p>
              <div className="py-0.25 px-2.5 bg-pending/20 rounded-full border border-pending w-fit">
                <p className="text-[10px]">Due</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-start gap-2 transition-colors duration-300 hover:cursor-pointer hover:bg-sur p-2 rounded-md border border-bor">
          <div className="p-2.5 rounded-full border border-bor w-fit">
            <LuCalendarSync className="size-4 text-pri" />
          </div>
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="space-y-1">
              <p className="font-medium text-sm">Spotify</p>
              <p className="text-[10px]">22/05/2026</p>
            </div>

            <div className="flex items-end justify-center flex-col gap-1">
              <p className="text-sm font-medium">₦12,000</p>
              <div className="py-0.25 px-2.5 bg-pending/20 rounded-full border border-pending w-fit">
                <p className="text-[10px]">Due</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
