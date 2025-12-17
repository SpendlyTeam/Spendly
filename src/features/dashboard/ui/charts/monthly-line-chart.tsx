"use client";

import "@lib/chartjs";
import { Line } from "react-chartjs-2";

export function MonthlyLineChart(props: {
  labels: string[];
  values: number[];
}) {
  const data = {
    labels: props.labels,
    datasets: [{ data: props.values }],
  };

  return <Line data={data} />;
}
