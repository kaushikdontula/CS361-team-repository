import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { SpendingTable } from "./SpendingTable";

export const Spending = (props) => {
  const localStorageKey = "transactionsData";

  // state to manage rows of transaction data
  const [rows, setRows] = useState([]);

  // state for managing model
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("Add Transaction");

  const [editingTransaction, setEditingTransaction] = useState(null);


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
          <SpendingTable key={index} data={transaction} onRemove={removeTransaction} onEdit={editTransaction}/>
        ))
      );
    }
  }, []);

  const addTransactionToTable = () => {

    //need to do this bc if not whneevber you try to add transaction it loads that last one
    setTransactionData({
      name: "",
      amount: 0,
      date: "",
      category: "",
    });

    let updatedTransactions;
  
    if (editingTransaction) {
      // If editing, replace the old transaction with the new updated one
      updatedTransactions = transactionsData.map((transaction) =>
        transaction === editingTransaction ? { ...transactionData } : transaction
      );
      setEditingTransaction(null);
    } else {
      // If not editing, add a new transaction
      updatedTransactions = [...transactionsData, { ...transactionData }];
    }
  
    // Update the transactionsData state
    setTransactionsData(updatedTransactions);
  
    // Update the rows for the table
    setRows(
      updatedTransactions.map((transaction, index) => (
        <SpendingTable key={index} data={transaction} onRemove={removeTransaction} onEdit={editTransaction} />
      ))
    );
  
    // Update local storage
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTransactions));
  
    closeModal();
  };
  const removeTransaction = (transactionToRemove) => {
    const updatedTransactions = transactionsData.filter(
      (transaction) => transaction !== transactionToRemove
    );
  
    setTransactionsData(updatedTransactions);
  
    const updatedRows = updatedTransactions.map((transaction, index) => (
      <SpendingTable key={index} data={transaction} onRemove={removeTransaction} />
    ));
  
    setRows(updatedRows);
  
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTransactions));
  };

  const editTransaction = (transactionToEdit) => {
    console.log(transactionToEdit);
    setEditingTransaction(transactionToEdit);
    setTransactionData({
      name: transactionToEdit.name,
      amount: transactionToEdit.amount,
      date: transactionToEdit.date,
      category: transactionToEdit.category,
    });
    setModalAction("Done Editing");
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalAction("Add Transaction");
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
                Cancel
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

              <button onClick={addTransactionToTable}>{modalAction}</button>
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
          <tbody>{rows.map((row, index) => React.cloneElement(row, { key: index, onRemove: removeTransaction, onEdit: editTransaction}))}</tbody>
        </table>
      </div>

    </div>
  );
};