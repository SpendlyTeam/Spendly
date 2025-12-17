"use client";

import "@lib/chartjs";
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
        backgroundColor: "#7ed957", // logoGreen
        borderRadius: 4,
        hoverBackgroundColor: "#8be064",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
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
        ticks: { color: "#94a3b8" },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8" },
        border: { display: false },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
