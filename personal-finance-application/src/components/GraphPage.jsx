import React, { useState } from "react";
import NavBar from "./NavBar";
import { PieChart, Pie, Tooltip } from "recharts";

const GraphApp = () => {

    const data = [

        {name: "Utilities", value: 300},
        {name: "Rent", value: 1200},
        {name: "Groceries", value: 600},
        {name: "Insurance", value: 300},
        {name: "Insurance", value: 300},
        {name: "subscription", value: 230},


    ];
    

    return(
        
        <div className="Graph">
            <h1>Monthly Expenses</h1>
            <div className="GraphContainer">
                    <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Pie dataKey="value" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                <Tooltip />
                </PieChart>
                <ul className="ExpenseList">
                    {data.map((entry) => (
                        <li key={entry.name}>
                            {entry.name}: {entry.value}
                        </li>
                    ))}
                </ul>
        </div>
    </div>
    )
};

export default GraphApp;
