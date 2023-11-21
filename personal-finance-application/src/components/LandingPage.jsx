import React, { useState } from "react";
import NavBar from "./NavBar";

export const LandingPage = (props) => {


    return(
        <div>
            <NavBar/>
            <div>hello {localStorage.getItem('name')}</div>
        {/* // addd more things from other stuff */}
        </div>
    )



}