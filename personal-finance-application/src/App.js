import React, { useState } from "react";
import './App.css';
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { LandingPage } from "./components/LandingPage";
import { BrowserRouter } from 'react-router-dom';

import { Spending } from "./components/Spending";


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [submitted, setSubmitted] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const handleFormSubmit = () => {

    setSubmitted(true);
    console.log(submitted);

  }

  return (
    <div className="App">
      {
        submitted ? ( <LandingPage /> ) : (
        currentForm === "login" ? <LoginPage onFormSwitch={toggleForm} onSubmit={handleFormSubmit}/> : <RegisterPage onFormSwitch={toggleForm} onSubmit={handleFormSubmit}/>
        )
      }
    </div>
  );
}

export default App;