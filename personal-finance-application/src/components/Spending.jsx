import React, { useState } from "react";
import NavBar from "./NavBar";
import { SpendingTable } from "./SpendingTable";

export const Spending = (props) => {

    const rows = [];
    let numrows=5;
    for (let i = 0; i < numrows; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(<SpendingTable key={i} />);
    }

    return(
        <div>
            <NavBar/>
            <div class="input-spending-container">
                <h2>Input Spending Data</h2>
            </div>
            <div class="main-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name?</th>
                            <th>Amount</th>
                            <th>Date</th>
                            {/* <th>Edit</  th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    )



}