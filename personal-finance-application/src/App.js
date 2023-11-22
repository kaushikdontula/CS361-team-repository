import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {LandingPage} from './components/LandingPage'
import {LoginPage} from './components/LoginPage';
import {RegisterPage} from './components/RegisterPage';
import  GraphPage  from "./components/GraphPage";



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
<Router>
{submitted ? (
<Routes>
<Route path="/" element={<LandingPage />} />
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
);
}


export default App;