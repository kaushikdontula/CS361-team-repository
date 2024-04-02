

# Personal Financial Tracking App

## Introduction
The Personal Financial Tracking App is a React-based application designed to help users monitor their spending habits, manage their finances, and maintain their budget effectively. With features including transaction input, spending category filtration, account registration, and login, this app provides a comprehensive tool for personal financial management.

## Features

- **User Authentication**: Secure login and registration process to personalize the experience.
- **Spending Data Input**: Users can input their spending data including the name, amount, date, and category of each transaction.
- **Data Visualization**: Includes a placeholder for graph page integration to visualize spending habits.
- **Spending Categories**: Users can filter their transactions based on categories to better understand their spending patterns.
- **Graphs Visulization**: Users can filter their graphs with transactions based on categories and months to better understand their spending patterns. The graph can toggle between Chart type and bar chart
- **Secure Data Storage**: Utilizes `react-secure-storage` for secure storage of sensitive information like passwords.

## Installation

Before starting, ensure you have `npm` and `React` installed on your system.

1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/kaushikdontula/CS361-team-repository.git
   ```
2. Navigate to the cloned directory and install the necessary packages:
   ```sh
   cd personal-finance-application
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```
   The app should now be running on `localhost:3000`.

## Usage

- **Registering a New Account**: Navigate to the registration page via the link on the login page. Enter your full name, email, and password (minimum 8 characters) to create a new account.
- **Logging In**: Enter your registered email and password on the login page to access your dashboard.
- **Adding Transactions**: Click on the '+New' button to input spending data. Enter the transaction name, amount, date, and category.
- **Viewing Transactions**: Transactions are displayed in a table format where you can filter them by categories.
- **Editing Transactions**: Click the 'Edit' button next to a transaction to modify its details.
- **Deleting Transactions**: Click the 'Remove' button next to a transaction to delete it.
- **Changing Password**: Navigate to the settings page to change your password or toggle dark mode.

## Project Structure

- `App.js`: Main application component that handles routing and theme context.
- `components/`: Directory containing reusable React components including:
  - `Graph/`: Directory containing the components for the graphs page:
    - `Graph.css`: styling for Graphs page.
    - `GraphPage.jsx`: components for visulization for graphs page.
  - `LandingPage.jsx`: The home page component after successful login.
  - `LoginPage.jsx`: Handles user login.
  - `RegisterPage.jsx`: Manages new user registration.
  - `SettingsPage.jsx`: Allows users to modify app settings.
  - `Spending.jsx`: Enables users to input and view their spending data.
- `constant.jsx`: Contains constants used across the application.
- `App.css`: Global stylesheet for the application.
