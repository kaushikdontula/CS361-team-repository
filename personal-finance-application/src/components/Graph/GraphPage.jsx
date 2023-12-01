import React, { useState, useEffect, useRef } from "react";
import NavBar from "../NavBar";
import { Chart } from 'chart.js/auto';
import './Graph.css';
import { localStorageKey } from "../Spending";

//console.log(localStorage.getItem(localStorageKey));



const datapoints = localStorage.getItem(localStorageKey);
const retrievedObject = JSON.parse(datapoints);
console.log(retrievedObject);

const GraphApp = () => {
  // Importing localStorageKey from Spending
  const chartRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("All"); // Default to show all dates
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to show all categories
  const data = [];

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  retrievedObject[0].name = "NAME";
  retrievedObject[0].amount = "AMOUNT";
  retrievedObject[0].date = "DATE";
  retrievedObject[0].category = "CATEGORY";


 

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
  }, [data, selectedDate, selectedCategory]);

  return (
    <div>
      {/* Include NavBar component */}
      <NavBar />

      <div className="Graph">
        <h1>Monthly Expenses</h1>

        {/* Dropdown for Date */}
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

        {/* Dropdown for Category */}
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

        <div className="GraphContainer">
          <canvas ref={chartRef} width="400" height="400" />
        </div>
      </div>
    </div>
  );
};

export default GraphApp;








