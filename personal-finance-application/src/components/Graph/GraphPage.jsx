import React, { useState, useEffect, useRef } from "react";
import NavBar from "../NavBar";
import { Chart } from 'chart.js/auto';
import './Graph.css';

const GraphApp = () => {
  const chartRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    const storedData = localStorage.getItem('graphData');

    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const uniqueDates = [...new Set(data.map(item => item.date))];
  const uniqueCategories = [...new Set(data.map(item => item.category))];

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
  
    // Destroy the previous Chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
  
    // Filter data based on selected date and category
    const filteredData = data.filter(item => {
      return (
        (selectedDate === "All" || item.date === selectedDate) &&
        (selectedCategory === "All" || item.category === selectedCategory)
      );
    });
  
    // Create a new Chart instance
    chartRef.current.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: filteredData.map(item => item.name),
        datasets: [
          {
            data: filteredData.map(item => item.amount),
            backgroundColor: filteredData.map(item => item.color || getRandomColor()),
          },
        ],
      },
    });
  }, [data, selectedDate, selectedCategory]);

};  // <--- Moved the export statement to the correct position

export default GraphApp;
