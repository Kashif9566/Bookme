import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const ReservationsChart = ({ reservationsData }) => {
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
      type: "bar",
      data: {
        labels: Array.from({ length: 31 }, (_, i) => i + 1),
        datasets: [
          {
            label: "Reservations",
            data: reservationsData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 10,
            beginAtZero: true,
          },
        },
      },
    });
  }, [reservationsData]);

  return (
    <canvas
      ref={chartRef}
      width="400"
      height="200"
      style={{ maxWidth: "100%" }}
    />
  );
};

export default ReservationsChart;
