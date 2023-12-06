import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {LandingPage} from './components/LandingPage'
import {LoginPage} from './components/LoginPage';
import {RegisterPage} from './components/RegisterPage';
import SettingsPage from './components/SettingsPage';
import {Spending} from './components/Spending';
import  GraphPage  from './components/Graph/GraphPage';
import { ThemeContext } from './ThemeContext';

function App() {
const [currentForm, setCurrentForm] = useState('login');
// const [submitted, setSubmitted] = useState(false);
const [theme, setTheme] = useState('light');

const [submitted, setSubmitted] = useState(() => {
  // Retrieve the login status from local storage on component mount
  const storedLoggedIn = localStorage.getItem('submitted');
  return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
});


// Save the login status to local storage whenever it changes
useEffect(() => {

  localStorage.setItem('submitted', JSON.stringify(submitted));
}, [submitted]);



const toggleForm = (formName) => {
setCurrentForm(formName);
}


  const handleFormSubmit = () => {
    setSubmitted(true);
    console.log(submitted);
  }
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`App ${theme}`}>
        <Router>
          {submitted ? (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/spending" element={<Spending />} />
              <Route path="/GraphPage" element={<GraphPage />} />
            </Routes>
          ) : (
            currentForm === "login" ? 
              <LoginPage onFormSwitch={toggleForm} onSubmit={handleFormSubmit}/> 
              : 
              <RegisterPage onFormSwitch={toggleForm} onSubmit={handleFormSubmit}/>
          )}
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}


export default App;