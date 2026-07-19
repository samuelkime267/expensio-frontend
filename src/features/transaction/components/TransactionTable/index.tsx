import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TransactionPaginationSchemaType } from "@/features/transaction/schemas";
import TransactionTableRow from "./sub/TransactionTableRow";
import { transactionTableHeaders } from "@/data/transactions.data";

type TransactionTableProps = {
  data: TransactionPaginationSchemaType | undefined;
};

export default function TransactionTable({ data }: TransactionTableProps) {
  return (
    <div className="border border-bor rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#ecf5ea] hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            {transactionTableHeaders.map((header, i) => (
              <TableHead
                key={i}
                className="text-text-pri py-5 font-medium px-4"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.transactions.map((transaction, i) => {
            return <TransactionTableRow key={i} data={transaction} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
}
