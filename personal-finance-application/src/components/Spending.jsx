import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { SpendingTable } from "./SpendingTable";
import Select from 'react-select'

import { localStorageKey } from "./constant";

  // modal component to input transaction data
const Modal = ({ isOpen, onClose, transactionData, setTransactionData, addTransactionToTable, modalAction }) => {
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



const CategorySelect = ({categories, filterByCategory}) => {
  // const [selectedOptions, setSelectedOptions] = useState([])
  var selectedOptions = ["All"];
  
  // Sample array of options
  const optionsArr = ["All", ...categories];

  const options = optionsArr.map((cat) => ({
    value: cat, // You can use a different logic to generate the value
    label: cat,
  }));


  const handleChange = (data) => {
    // console.log(data)
    var tempArr = []
    for(let i = 0; i < data.length; i++){
      // break
      tempArr.push(data[i]['value'])
      // setSelectedOptions(tempArr);

    }
    selectedOptions = tempArr 
    if(selectedOptions.length > 0)
      filterByCategory(selectedOptions)
    else{
      filterByCategory(["All"])
    }
  }

  return (
    <div>
      <label htmlFor="multiSelect">Select Categories:</label>
    
      <Select 
        options={options}
        isMulti='true' 
        onChange={handleChange}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '#5a2d9c',
            primary: 'black',
            color:'black'
          },
        })}
        styles={{
          option: provided => ({
            ...provided,
            color: 'black'
          }),
          control: provided => ({
            ...provided,
            color: 'black'
          }),
          singleValue: provided => ({
            ...provided,
            color: 'black'
          })
        }}
        />
    </div>
  );
};

export const Spending = (props) => {
  const localStorageKey = "transactionsData";

  // state to manage rows of transaction data
  const [rows, setRows] = useState([]);

  //categories included in filter
  const [categories, setCategories] = useState([]);

  // state for managing model
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("Add Transaction");

  const [editingTransaction, setEditingTransaction] = useState(null);


  // state to manage transaction input data
  const [transactionData, setTransactionData] = useState({
    name: "",
    amount: null,
    date: "",
    category: "",
  });

  //set categories that're available
  const setCategoriesFun = (data) =>{
    var cats = categories;
    for(let i = 0; i < data.length; i++){
      if(categories.includes(data[i]['category'])){
        continue;
      }
      cats.push(data[i]['category'])
    }
    setCategories(cats);
  }

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
      setCategoriesFun(storedTransactions);

    }
  }, []);

  //filter to include only chosen categories
  const filterByCategory = (category) => {
    var transactions = [];
    const storedTransactions = JSON.parse(localStorage.getItem(localStorageKey));
    var showAll=false;
    for(let counter = 0; counter < category.length; counter++){
      if(category[counter] === "All"){
        transactions = storedTransactions;
        setRows(
          transactions.map((transaction, index) => (
            <SpendingTable key={index} data={transaction} onRemove={removeTransaction} onEdit={editTransaction}/>
          ))
        );
        return;
      }
    }

    for(let i = 0; i < storedTransactions.length; i++){
      for(let j = 0; j < category.length; j++){
        if(storedTransactions[i]['category'] === category[j] || category[j] === "All"){
          transactions.push(storedTransactions[i]); 
          continue;
        }
      }
      
    }

    setRows(
      transactions.map((transaction, index) => (
        <SpendingTable key={index} data={transaction} onRemove={removeTransaction} onEdit={editTransaction}/>
      ))
    );
  }

  const addTransactionToTable = () => {

    //need to do this bc if not whneevber you try to add transaction it loads that last one
    setTransactionData({
      name: "",
      amount: null,
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
    setCategoriesFun(updatedTransactions)
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



  return (
    <div>
      <NavBar />
      <div className="input-spending-container">
        <h2>Input Spending Data</h2>
        <button className="new-transaction" onClick={openModal}>
          +New
        </button>
        <CategorySelect
          categories={categories}
          filterByCategory={filterByCategory}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          transactionData={transactionData}
          setTransactionData={setTransactionData}
          addTransactionToTable={addTransactionToTable}
          modalAction={modalAction}
        />
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