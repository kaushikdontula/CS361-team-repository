import { ThemeContext } from '../ThemeContext';
import React, { useContext, useState } from 'react';
import NavBar from "./NavBar";
import secureLocalStorage from 'react-secure-storage';

const SettingsPage = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [cardName, setCardName] = useState('');
  const [showCardName, setShowCardName] = useState(false);

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
    localStorage.setItem('cardName', cardName);
  };

  const handleAddSpendingMethod = () => {
    setShowCardName(!showCardName);
  };

const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    const storedPassword = secureLocalStorage.getItem('pass');
    console.log('Password change initiated');
    if (currentPassword !== storedPassword) {
      alert('Current password does not match stored password');
      return;
    }
    if (newPassword.length < 8) {
      alert('New password must be at least 8 characters long');
      return;
    }
  secureLocalStorage.setItem('pass', newPassword);
  alert('Password changed successfully');
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
          ) : (
            <button type="button" onClick={handleAddSpendingMethod}>Add Spending Method</button>
          )}
        </h1>
        <h1>
          <button type="button" onClick={handleSaveData}>Manual backup</button>
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