import { ThemeContext } from '../ThemeContext';
import React, { useContext, useState, } from 'react';
import NavBar from "./NavBar";
import {useNavigate} from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const SettingsPage = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [cardName, setCardName] = useState('');
  const [showCardName, setShowCardName] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();
  const handleEditSpendingData = () => {
    navigate("/editSpending");
  };

  const handleSaveData = () => {
    if (navigator.onLine) {
      const currentTime = new Date().toLocaleString();
      setLastSavedTime(currentTime);
      alert("Data saved successfully at time: " + currentTime);
      // Save the user's data here
    } else {
      alert("No internet connection. Data cannot be saved.");
    }
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
    localStorage.setItem('cardName', event.target.value);
  };

  const handleAddSpendingMethod = () => {
    setShowCardName(!showCardName);
  };

  const handleSubmitCardName = () => {
    // Handle card name submission here
    alert("Card name submitted: " + cardName);
    setShowCardName(!showCardName);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation) {
      // Delete the user's account here
      localStorage.clear();
      alert("User account deleted successfully");
      window.location.href = "/";
    } else {
      setDeleteConfirmation(true);
    }
  };

  return (
    <div>
      <NavBar/>
      <h1>Settings</h1>
      <form>
        <h1>
          <button type="button" onClick={handleLogout}>Logout</button>
        </h1>
        <h1>
          {showCardName ? (
            <div>
              <input
                type="text"
                value={cardName}
                onChange={handleCardNameChange}
                placeholder="Enter card name"
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '300px'
                }}
              />
              <button type="button" onClick={handleSubmitCardName}>Submit</button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={handleAddSpendingMethod}>Add Spending Method</button>
                          </div>
          )}
        </h1>
        <h1>
            <button type="button" onClick={handleEditSpendingData}>Edit Spending Information</button>
        </h1>
        <h1>
          <button type="button" onClick={handleSaveData}>Manual backup</button>
        </h1>
        <h1>
          <button type="button" onClick={handleDeleteAccount}>
            {deleteConfirmation ? "Confirm Delete Account" : "Delete Account"}
          </button>
        </h1>
        <button type="button" onClick={toggleTheme}>Toggle Dark Mode</button>
        <h1>
        <button type="button" onClick={handleChangePassword}>Change Password</button>
        <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              style={{
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '300px'
              }}
            />
        <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              style={{
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '300px'
              }}
            />
      </h1>
      </form>
    </div>
  );
};

export default SettingsPage;