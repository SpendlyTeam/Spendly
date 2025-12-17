import type { TransactionUI } from "@/features/transactions/model/types";
import { formatDate, formatMoneyCents } from "@lib/formatters";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export function TransactionsTable(props: { items: TransactionUI[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">Date</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">Description</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">Category</TableHead>
            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {props.items.map((t) => (
            <TableRow key={t.id} className="border-white/5 transition-colors hover:bg-white/5">
              <TableCell className="whitespace-nowrap font-medium text-slate-300">
                {formatDate(t.date)}
              </TableCell>
              <TableCell className="max-w-[420px] truncate text-slate-200">
                {t.description ?? <span className="text-slate-600 italic">No description</span>}
              </TableCell>
              <TableCell>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 transition-colors hover:bg-white/10">
                  <span 
                    className="h-1.5 w-1.5 rounded-full" 
                    style={{ backgroundColor: t.category.color || "#94a3b8" }}
                  />
                  <span className="text-xs font-medium text-slate-200">{t.category.name}</span>
                </div>
              </TableCell>
              <TableCell className={`text-right font-mono font-semibold ${t.amountCents > 0 ? "text-slate-50" : "text-emerald-400"}`}>
                {formatMoneyCents(t.amountCents)}
              </TableCell>
            </TableRow>
          ))}

          {props.items.length === 0 && (
            <TableRow className="border-transparent hover:bg-transparent">
              <TableCell colSpan={4} className="py-16 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                  <p className="text-sm">No transactions found in this period.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
