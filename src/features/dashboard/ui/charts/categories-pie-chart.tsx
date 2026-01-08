"use client";

import "@lib/chartjs";
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
    },
  };

  return (
    <div className="h-[300px] w-full flex items-center justify-center">
      <Pie data={data} options={options} />
    </div>
  );
}
