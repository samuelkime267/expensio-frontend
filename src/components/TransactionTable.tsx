import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TransactionTable() {
  return (
    <div className="border border-bor rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#ecf5ea] hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableHead className="text-text-pri">Name</TableHead>
            <TableHead className="text-text-pri">Category</TableHead>
            <TableHead className="text-text-pri">Amount</TableHead>
            <TableHead className="text-text-pri">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
          <TableRow className="hover:bg-[#ecf5ea]/50 transition-color duration-300">
            <TableCell className="font-medium">Egusi Soup</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₦100,000</TableCell>
            <TableCell>12-05-2026</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
