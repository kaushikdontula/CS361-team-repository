
import React from 'react';

const SettingsPage = () => {
  return (
    <div>
      <h1>Settings</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SettingsPage;
