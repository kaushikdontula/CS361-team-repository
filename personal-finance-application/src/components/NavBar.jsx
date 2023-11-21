import React, { Component } from 'react';

class NavBar extends Component {


    render(){
        return(
        <div class="nav-main">
            <div class="logo">
                <a class="logo-link" href="/"><h2 class="nav-logo">Home</h2></a>
            </div>
            <div class="links">
                <a class="link-txt" href="/graphs">Graphs</a>
                <a class="link-txt" href="/spending">Spending</a>
            </div>
        </div>
        )
    }
}

export default NavBar;