import React, { Component } from 'react';
import SettingsPage from './SettingsPage';
import {Link} from 'react-router-dom';

export default class NavBar extends Component {


    render(){
        return(
        <div class="nav-main">
            <div class="logo">
                <a class="logo-link" href="/"><h2 class="nav-logo">Home</h2></a>
            </div>
            <div class="links">
                <Link to="/settings">Settings</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

            </div>
        </div>
        )
    }
}