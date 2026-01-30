"use client";

import "@lib/chartjs";
import { TooltipItem } from "chart.js";
import { Bar } from "react-chartjs-2";

export function MonthlyLineChart(props: {
  labels: string[];
  values: number[];
}) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Spending",
        data: props.values,
        backgroundColor: "#7ed957",
        borderRadius: 4,
        hoverBackgroundColor: "#8be064",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label +=
                context.parsed.y.toLocaleString("pl-PL", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " zł";
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#ffffff10" },
        ticks: { color: "#94a3b8", maxTicksLimit: 6 },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8", maxRotation: 45, minRotation: 0 },
        border: { display: false },
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
