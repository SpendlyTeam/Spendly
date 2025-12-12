"use client";

import "@/shared/lib/chartjs";
import { Pie } from "react-chartjs-2";

export function CategoriesPieChart(props: {
  labels: string[];
  values: number[];
}) {
  const data = {
    labels: props.labels,
    datasets: [{ data: props.values }],
  };

  return <Pie data={data} />;
}
