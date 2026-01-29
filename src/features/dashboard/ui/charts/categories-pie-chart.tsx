"use client";

import "@lib/chartjs";
import { TooltipItem } from "chart.js";
import { Pie } from "react-chartjs-2";

export function CategoriesPieChart(props: {
  labels: string[];
  values: number[];
  colors: string[];
}) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.values,
        backgroundColor: props.colors,
        borderColor: "#020617",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#94a3b8",
          padding: 20,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            const label = context.label || "";
            const value = context.parsed;
            return ` ${label}: ${value.toLocaleString("pl-PL", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} zł`;
          },
        },
      },
    },
  };

  return (
    <div className="h-[300px] w-full flex items-center justify-center">
      <Pie data={data} options={options} />
    </div>
  );
}
