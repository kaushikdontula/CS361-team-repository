import React, { useState } from "react";
import NavBar from "./NavBar";

export const SpendingTable = ({data}) => {


    return(
        
        <tr>
            <td>{data.name}</td>
            <td>{data.amount}</td>
            <td>{data.date}</td>
            <td>{data.category}</td>

            <button>Edit</button>

        </tr>
         
    )



}