import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime } from "@/utils";
import type { TransactionPaginationSchemaType } from "../schemas";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PenLineIcon, TrashIcon } from "lucide-react";

type TransactionTableProps = {
  data: TransactionPaginationSchemaType | undefined;
};

export default function TransactionTable({ data }: TransactionTableProps) {
  return (
    <div className="border border-bor rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#ecf5ea] hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableHead className="text-text-pri py-5 font-medium px-4">
              Name
            </TableHead>
            <TableHead className="text-text-pri py-5 font-medium px-4">
              Category
            </TableHead>
            <TableHead className="text-text-pri py-5 font-medium px-4">
              Amount
            </TableHead>
            <TableHead className="text-text-pri py-5 font-medium px-4">
              Type
            </TableHead>
            <TableHead className="text-text-pri py-5 font-medium px-4">
              Date
            </TableHead>
            <TableHead className="text-text-pri py-5 font-medium px-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.transactions.map(
            ({ name, category, amount, date, type }, i) => (
              <TableRow
                key={i}
                className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor"
              >
                <TableCell className="font-medium p-4">{name}</TableCell>
                <TableCell className="p-4">{category.name}</TableCell>
                <TableCell
                  className={cn("p-4", {
                    "text-success": type === "Income",
                    "text-err": type === "Expense",
                  })}
                >
                  {type === "Income" ? "+" : "-"}₦{formatCurrency(amount)}
                </TableCell>
                <TableCell className="p-4">{type}</TableCell>
                <TableCell className="p-4 space-y-0.5">
                  <p>{formatDateTime(date).date}</p>
                  <p className="text-[10px]">{formatDateTime(date).time}</p>
                </TableCell>
                <TableCell className="p-4 space-y-0.5 h-full flex items-center justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex items-center justify-center gap-2 h-full p-2">
                        <BsThreeDotsVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-bg" align="end">
                      <DropdownMenuItem asChild>
                        <Button
                          className={
                            "w-full flex items-center justify-start gap-2 hover:bg-black/10!"
                          }
                        >
                          <PenLineIcon className="text-text-pri size-4" />
                          <p className="text-text-pri">Edit</p>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Button
                          className={
                            "w-full flex items-center justify-start gap-2 hover:bg-err/10!"
                          }
                        >
                          <TrashIcon className="text-err size-4" />
                          <p className="text-err">Delete</p>
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
