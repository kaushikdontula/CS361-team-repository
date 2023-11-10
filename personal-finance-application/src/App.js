import React, { useState } from "react";
import './App.css';
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <LoginPage onFormSwitch={toggleForm} /> : <RegisterPage onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;