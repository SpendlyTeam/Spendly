import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function formatDate(isoOrDate: string | Date): string {
  const d = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export type DashboardPdfSummary = {
  totalCents: number;
  count: number;
  top3: { name: string; cents: number; color: string | null }[];
  monthly: { month: string; cents: number }[];
  pie: { name: string; cents: number; color: string | null }[];
};

export type DashboardPdfTransaction = {
  date: string;
  description: string | null;
  categoryName: string;
  amountCents: number;
};

export type GenerateDashboardPdfOptions = {
  periodLabel: string;
  summary: DashboardPdfSummary;
  transactions: DashboardPdfTransaction[];
};

export function generateDashboardPdf(
  options: GenerateDashboardPdfOptions,
): void {
  const { periodLabel, summary, transactions } = options;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let y = 18;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Spendly Dashboard Report", 14, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Period: ${periodLabel}`, 14, y);
  doc.setTextColor(0, 0, 0);
  y += 14;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Summary", 14, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Total spend: ${formatMoney(summary.totalCents)}`, 14, y);
  y += 6;
  doc.text(`Transactions: ${summary.count}`, 14, y);
  y += 10;

  if (summary.top3.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Top categories", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: y,
      head: [["Category", "Amount"]],
      body: summary.top3.map((c) => [c.name, formatMoney(c.cents)]),
      theme: "striped",
      headStyles: { fillColor: [41, 41, 41], textColor: [255, 255, 255] },
      margin: { left: 14 },
    });
    const lastTable = (doc as jsPDF & { lastAutoTable?: { finalY: number } })
      .lastAutoTable;
    y = (lastTable?.finalY ?? y) + 10;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Transactions", 14, y);
  y += 6;
  doc.setFont("helvetica", "normal");

  autoTable(doc, {
    startY: y,
    head: [["Date", "Category", "Description", "Amount"]],
    body: transactions.map((t) => [
      formatDate(t.date),
      t.categoryName,
      t.description ?? "—",
      formatMoney(t.amountCents),
    ]),
    theme: "striped",
    headStyles: { fillColor: [41, 41, 41], textColor: [255, 255, 255] },
    margin: { left: 14 },
    columnStyles: {
      0: { cellWidth: 28 },
      1: { cellWidth: 35 },
      2: { cellWidth: "auto" },
      3: { cellWidth: 28 },
    },
  });

  doc.save(`Spendly-dashboard-${periodLabel.replace(/\s+/g, "-")}.pdf`);
}
