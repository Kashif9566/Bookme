import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const RevenueDonutChart = ({ revenueData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const existingChart = Chart.getChart(chartRef.current);
      if (existingChart) {
        existingChart.destroy();
      }
    }

    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Revenue"],
        datasets: [
          {
            data: [revenueData],
            backgroundColor: ["rgba(255, 99, 132, 0.5)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        cutout: "70%",
        maintainAspectRatio: false,
      },
    });
  }, [revenueData]);

  return (
    <canvas
      ref={chartRef}
      width="400"
      height="200"
      style={{ maxWidth: "100%" }}
    />
  );
};

export default RevenueDonutChart;
