import React, { useState, useEffect, useRef } from "react";
import NavBar from "../NavBar";
import { Chart } from 'chart.js/auto';
import './Graph.css';
import { localStorageKey } from "../constant";

const GraphApp = () => {
  const chartRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("All"); // Default to show all dates
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to show all categories
  const [chartType, setChartType] = useState("pie");
  
  let  datapoints = localStorage.getItem(localStorageKey);
  let retrievedObject = JSON.parse(datapoints);
  if(retrievedObject === null){
    retrievedObject = [];
  }
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

  retrievedObject.forEach((item) => {
    const existingItem = data.find((dataItem) => dataItem.category === item.category);
    if (existingItem) {
      existingItem.value += item.amount;
    } else {
      data.push({
        name: item.name,
        value: item.amount,
        date: item.date,
        category: item.category,
      });
    }
  });


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

    const formatMonth = (date) => {
    const [year, month] = date.split('-');
    const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' });
    return `${monthName} ${year}`;
  };

  const uniqueDates = [...new Set(data.map(item => formatMonth(item.date)))];
  const uniqueCategories = [...new Set(data.map(item => item.category))];

  const toggleChartType = () => {
    setChartType(prevChartType => (prevChartType === "pie" ? "bar" : "pie"));
  };

  // UseEffect to load data and update charts
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
  
    // Destroy existing charts before creating new ones
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
  
    // Filter data based on selected options
    const filteredData = data.filter(item => {
    const selectedMonthYear = selectedDate === "All" ? "" : selectedDate;
    const itemMonthYear = formatMonth(item.date);
    return (
      (selectedDate === "All" || itemMonthYear === selectedMonthYear) &&
      (selectedCategory === "All" || item.category === selectedCategory)
      );
    });
  
    // Create new chart based on the selected chart type
    chartRef.current.chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: filteredData.map(item => item.category),
        datasets: [
          {
            data: filteredData.map(item => item.value),
            backgroundColor: filteredData.map(item => item.color || getRandomColor()),
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const item = filteredData[context.dataIndex];
                const name = item.name || ''; // Item name
                const value = item.value || 0; // Item value
                const date = item.date || ''; // Item date
                return `${name}: $${value} (${date})`;
              },
            },
          },
        },
      },
    });
  }, [data, selectedDate, selectedCategory, chartType]);  

  return (
    <div>
      <NavBar />

      <div className="PageContainer">
        {/* Dropdowns on the left side */}
      <div className="Dropdown">
        <div className="dateDropdown">
          <label htmlFor="dateDropdown">Select Month: </label>
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
          </div>
          <div className="button">
            <button onClick={toggleChartType}>
            Toggle Chart Type ({chartType === "pie" ? "Bar" : "Pie"})
            </button>
          </div>
          <div className="CategoryDropdown">
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
      </div>
      
        

       
        {/* Main content container */}
        <div className="MainContent">
          
          {/* Charts */}
          <div className="GraphContainer">
            <canvas ref={chartRef} width="400" height="400" />
          </div>

        </div>
        <div className="TransactionHistory">
            <h2>Transaction History</h2>
            <ul>
              {retrievedObject.map((transaction, index) => (
                <li key={index}>
                  <strong>{transaction.name}</strong>
                  <p>Amount: ${transaction.amount}</p>
                  <p>Date: {transaction.date}</p>
                  <p>Category: {transaction.category}</p>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
};

export default GraphApp;

