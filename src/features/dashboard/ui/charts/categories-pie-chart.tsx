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
        borderColor: "#020617", // slate-950 to match background
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={data} />;
}
