import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTransactions } from "@/features/transaction/utils";
import { formatCurrency, formatDateTime } from "@/utils";

export default function TransactionTable() {
  const { data } = useGetTransactions();
  const transactions = data || [];

  return (
    <div className="border border-bor rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#ecf5ea] hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableHead className="text-text-pri">Name</TableHead>
            <TableHead className="text-text-pri">Category</TableHead>
            <TableHead className="text-text-pri">Amount</TableHead>
            <TableHead className="text-text-pri">Type</TableHead>
            <TableHead className="text-text-pri">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(({ name, category, amount, date, type }, i) => (
            <TableRow
              key={i}
              className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor"
            >
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{category}</TableCell>
              <TableCell>₦{formatCurrency(amount)}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell>{formatDateTime(date).date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
