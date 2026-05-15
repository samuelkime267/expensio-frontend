import { Button, BarChart } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Cashflow() {
  return (
    <div className="md:col-span-2 lg:col-span-3 border border-bor rounded-xl p-4 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-pri text-2xl font-medium capitalize">Cashflow</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              btnType="accent"
              className="flex items-center justify-center gap-2 text-xs "
            >
              This year
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bg" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <p>Day</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <p>Week</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <p>Month</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <p>Year</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <BarChart />

      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center justify-start gap-2">
          <div className="bg-[#baf49d] size-4 rounded-full" />
          <p className="text-sm">Income</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="bg-[#1e483f] size-4 rounded-full" />
          <p>Expense</p>
        </div>
      </div>
    </div>
  );
}
