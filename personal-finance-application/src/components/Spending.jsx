import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { SpendingTable } from "./SpendingTable";

export const Spending = (props) => {
  const localStorageKey = "transactionsData";

  // state to manage rows of transaction data
  const [rows, setRows] = useState([]);

  // state for managing model
  const [isModalOpen, setModalOpen] = useState(false);

  // state to manage transaction input data
  const [transactionData, setTransactionData] = useState({
    name: "",
    amount: 0,
    date: "",
    category: "",
  });

  // state to manage array of transaction objects
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    // Load transactions data from local storage on component mount
    const storedTransactions = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedTransactions) {
      setTransactionsData(storedTransactions);
      setRows(
        storedTransactions.map((transaction, index) => (
          <SpendingTable key={index} data={transaction} />
        ))
      );
    }
  }, []);

  // adding a transaction to the table
  const addTransactionToTable = () => {
    // create a new transaction object
    const newTransaction = { ...transactionData };

    // add the transaction object to the array of transactions
    setTransactionsData((prevTransactions) => [...prevTransactions, newTransaction]);

    // update the rows for the table
    setRows((prevRows) => [
      ...prevRows,
      <SpendingTable key={prevRows.length} data={newTransaction} />,
    ]);

    // update local storage
    localStorage.setItem(localStorageKey, JSON.stringify([...transactionsData, newTransaction]));

    closeModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // modal component to input transaction data
  const Modal = ({ isOpen, onClose }) => {
    return (
      <>
        {isOpen && (
          <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={onClose}>
                &times;
              </span>
              <h2>Input Data</h2>

              {/* name input */}
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="Name"
                value={transactionData.name}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    name: e.target.value,
                  })
                }
              />

              {/* amount input */}
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={transactionData.amount}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    amount: e.target.value !== "" ? Number(e.target.value) : 0,
                  })
                }
              />

              {/* date input */}
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={transactionData.date}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    date: e.target.value,
                  })
                }
              />

              {/* category input */}
              <label htmlFor="Category">Category</label>
              <input
                type="text"
                id="Category"
                value={transactionData.category}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    category: e.target.value,
                  })
                }
              />

              <button onClick={addTransactionToTable}>Add Transaction</button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="input-spending-container">
        <h2>Input Spending Data</h2>
        <button className="new-transaction" onClick={openModal}>
          +New
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>

      <div className="main-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>

          {/* outputs rows of transactions */}
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};