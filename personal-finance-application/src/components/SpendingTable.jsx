import React, { useState } from "react";
import NavBar from "./NavBar";

export const SpendingTable = ({data, onRemove, onEdit}) => {
    const handleRemove = () => {
        // Call the onRemove function passed as a prop
        onRemove(data);
    };

    const handleEdit = () => {

        onEdit(data);

    }

    return(
        
        <tr>
            <td>{data.name}</td>
            <td>{data.amount}</td>
            <td>{data.date}</td>
            <td>{data.category}</td>

            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleRemove}>Remove</button>

        </tr>
         
    )

}