import React, { Component } from 'react';
import SettingsPage from './SettingsPage';

export default class NavBar extends Component {


    render(){
        return(
        <div className="nav-main">
            <div className="logo">
                <a className="logo-link" href="/"><h2 className="nav-logo">Home</h2></a>
            </div>
            <div className="links">
                <Link to="/settings">Settings</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/spending">Spending</Link>
                <Link class="link-txt" to="/GraphPage">Graphs</Link>

            </div>
        </div>
        )
    }
}