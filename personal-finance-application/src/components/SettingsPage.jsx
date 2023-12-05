import { ThemeContext } from '../ThemeContext';
import React, { useContext, useState, } from 'react';
import NavBar from "./NavBar";
import {useNavigate} from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const SettingsPage = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [cardName, setCardName] = useState('');
  const [changedCardName, setChangedCardName] = useState('');
  const [showCardName, setShowCardName] = useState(false);
  const [editCardName, setEditCardName] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notificationsOn, setNotificationsOn] = useState(true);

  const handleEditSpendingData = () => {
    setEditCardName(!editCardName);
  };

  const handleSubmitCardChange = (event) => {
    setChangedCardName(event.target.value);
  };

  const handleSubmitCardNameChange = (event) => {
    alert("Updated card name submitted: " + changedCardName);
    localStorage.setItem('cardName', changedCardName);
    setEditCardName(!editCardName);
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
  };

  const handleAddSpendingMethod = () => {
    setShowCardName(!showCardName);
  };

  const handleSubmitCardName = (event) => {
    // Handle card name submission here
    alert("Card name submitted: " + cardName);
    localStorage.setItem('cardName', cardName);
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

  const handleChangePassword = () => {
    const storedPassword = secureLocalStorage.getItem('pass');

    if (storedPassword !== currentPassword) {
      alert("passwords do not match");
    }

    if (newPassword.length < 8) {
      alert("password must be at least 8 characters");
    }
    if (storedPassword === currentPassword && newPassword.length >= 8) {
      alert("password changed successfully");
      secureLocalStorage.setItem('pass', newPassword);
    }
  }

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
              <button type='button' onClick={handleAddSpendingMethod}>Cancel</button>
              <button type="button" onClick={handleSubmitCardName}>Submit</button>
            </div>
          ) : (
              <button type="button" onClick={handleAddSpendingMethod}>Add Spending Method</button>
          )}
          {editCardName ? (
            <div>
              <input
                type="text"
                value={changedCardName}
                onChange={handleSubmitCardChange}
                placeholder={`Current card name: ${localStorage.getItem('cardName')}`}
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '300px'
                }}
              />
              <button type='button' onClick={handleEditSpendingData}>Cancel</button>
              <button type="button" onClick={handleSubmitCardNameChange}>Submit</button>
            </div>
          ) : (
            <button type="button" onClick={handleEditSpendingData}>Edit Spending Information</button>
            )}
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
        </h1>
        <h1>
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
      </h1>
      <h1>
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
      <h1>
      <button onClick={(e) => {
  e.preventDefault();
  setNotificationsOn(!notificationsOn);
}}>
  {notificationsOn ? 'Turn off notifications' : 'Turn on notifications'}
      </button>
      </h1>
        
      </form>
    </div>
  );
};

export default SettingsPage;