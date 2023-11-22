import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {


    render(){
        return(
        <div class="nav-main">
            <div class="logo">
                <a class="logo-link" href="/"><h2 class="nav-logo">Home</h2></a>
            </div>
            <div class="links">
                <Link class="link-txt" to="/settings">Settings</Link>
                <Link class="link-txt" to="/GraphPage">Graphs</Link>
                <Link class="link-txt" to="/transaction">Transactions</Link>
            </div>
        </div>
        )
    }
}

export default NavBar;