import React, { useState } from "react";
import NavBar from "./NavBar";
import { SpendingTable } from "./SpendingTable";

export const Spending = (props) => {

    const rows = [];
    let numrows=5;
    for (let i = 0; i < numrows; i++) {
        rows.push(<SpendingTable key={i} />);
    }

    
    function createTransaction() {
       
    }

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const Modal = ({ isOpen, onClose }) => {
        return (
            <>
            {isOpen && (
                <div className="overlay" onClick={onClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Input Data</h2>
                    <label for="name">Name</label>
                    <input type="text" id="Name"></input>
                    
                    <label for="name">Amount</label>
                    <input type="number" id="amount"></input>

                    <label for="name">Date</label>
                    <input type="date" id="date"></input>

                    <label for="name">Category</label>
                    <input type="text" id="Category"></input>
                    
                    
                </div>
                </div>
            )}
            </>
        );
    };

    return(
        <div>
            <NavBar/>
            <div class="input-spending-container">
                <h2>Input Spending Data</h2>
                <button class="new-transaction" onClick={openModal}>+New</button>
                <Modal isOpen={isModalOpen} onClose={closeModal} />

            </div>
            <div class="main-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name?</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Category</th>

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