import React, { useState, useEffect, useRef } from "react";
import NavBar from "../NavBar";
import { Chart } from 'chart.js/auto';
import './Graph.css';
import { localStorageKey } from "../Spending";

const GraphApp = () => {
  // Importing localStorageKey from Spending
  const chartRef = useRef(null);
  const barChartRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("All"); // Default to show all dates
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to show all categories
  // pust the below code in a function 
  let  datapoints = localStorage.getItem(localStorageKey);
  let retrievedObject = JSON.parse(datapoints);

  

  const data = [];

  useEffect(() => {

    let timerID = setTimeout(() => {
      datapoints = localStorage.getItem(localStorageKey);
      retrievedObject = JSON.parse(datapoints);

    }, 2000);

    return () => {
      clearTimeout(timerID);
    }


  }, [retrievedObject]);

  

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  for (let i = 0; i < retrievedObject.length; i++) {
    data[i] = 
      { 
        name: retrievedObject[i].name,
        value: retrievedObject[i].amount, 
        date: retrievedObject[i].date,
        category: retrievedObject[i].category
      };
  }

  for (let i = 0; i < retrievedObject.length; i++) {
    console.log("Name:" + data[i].name);
    console.log("Amount:" + data[i].amount);
    console.log("Date:" + data[i].date);
    console.log("Category:" + data[i].category);
     
  }
  
  const uniqueDates = [...new Set(data.map(item => item.date))];
  const uniqueCategories = [...new Set(data.map(item => item.category))];

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
  
    // Destroy the previous Chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
    if (barChartRef.current.chart) {
      barChartRef.current.chart.destroy();
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
        labels: filteredData.map(item => item.category), // Use category as labels
        datasets: [
          {
            data: filteredData.map(item => item.value),
            backgroundColor: filteredData.map(item => item.color || getRandomColor()),
          },
        ],
      },
    });

    const barCtx = barChartRef.current.getContext("2d");
    barChartRef.current.chart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: filteredData.map(item => item.category),
        datasets: [
          {
            label: "Amount",
            data: filteredData.map(item => item.value),
            backgroundColor: filteredData.map(() => getRandomColor()),
          },
        ],
      },
    });
  }, [data, selectedDate, selectedCategory]);

  return (
    <div>
      {/* Include NavBar component */}
      <NavBar />

      <div className="PageContainer">
        {/* Dropdowns on the left side */}
        <div className="Dropdown">
          <label htmlFor="dateDropdown">Select Date: </label>
          <select
            id="dateDropdown"
            onChange={(e) => setSelectedDate(e.target.value)}
            value={selectedDate}
          >
            <option value="All">All</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>

          <label htmlFor="categoryDropdown">Select Category: </label>
          <select
            id="categoryDropdown"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="All">All</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Main content container */}
        <div className="MainContent">
          {/* Charts */}
          <div className="GraphContainer">
            <div className="ChartContainer">
              <canvas ref={chartRef} width="400" height="400" />
            </div>
            <div className="ChartContainer">
              <canvas ref={barChartRef} width="400" height="400" />
            </div>
          </div>

          {/* Additional content goes here if needed */}
        </div>
      </div>
    </div>
  );
};

export default GraphApp;