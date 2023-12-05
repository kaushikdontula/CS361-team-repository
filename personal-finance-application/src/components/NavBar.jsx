import React, { Component } from 'react';
import SettingsPage from './SettingsPage';
import {Link} from 'react-router-dom';

export default class NavBar extends Component {


    render(){
        return(
        <div className="nav-main">
            <div className="logo">
                <a className="logo-link" href="/"><h2 className="nav-logo">Home</h2></a>
            </div>
            <div className="links">
                <Link class="link-txt" to="/settings">Settings</Link>
                <Link class="link-txt" to="/spending">Spending</Link>
                <Link class="link-txt" to="/GraphPage">Graphs</Link>

            </div>
        </div>
        )
    }
}