import React, { useEffect, useRef } from "react";
import NavBar from "../NavBar";
import { Chart } from 'chart.js/auto';
import './Graph.css';

const GraphApp = () => {
  const chartRef = useRef(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const data = [
    { name: "Utilities", value: 300 },
    { name: "Rent", value: 1200, color: "#2196f3" },
    { name: "Groceries", value: 600 },
    { name: "Insurance", value: 300 },
    { name: "Insurance", value: 300 },
    { name: "subscription", value: 230 },
  ];

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous Chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create a new Chart instance
    chartRef.current.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map(item => item.name),
        datasets: [
          {
            data: data.map(item => item.value),
            backgroundColor: data.map(item => item.color || getRandomColor()),
          },
        ],
      },
    });
  }, [data]);

  return (
    <div>
      {/* Include NavBar component */}
      <NavBar />

      <div className="Graph">
        <h1>Monthly Expenses</h1>
        <div className="GraphContainer">
          <canvas ref={chartRef} width="400" height="400" />
        </div>
      </div>
    </div>
  );
};

export default GraphApp;
