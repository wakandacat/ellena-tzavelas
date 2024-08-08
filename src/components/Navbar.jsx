import React from "react";
import '../styles/Navbar.css'
import ThemeController from './ThemeController.jsx';

function Navbar() {

    return (
        <span>
            <div id="left-buttons">
                <img id='logo' src="/e.png"/>
                <button className="nav-button">HOME</button>
                <button className="nav-button">ACADEMIC</button>
                <button className="nav-button">PERSONAL</button>
                <button className="nav-button">ABOUT</button>
            </div>
            <div id="right-buttons">
                <ThemeController/>
            </div>
        </span>
    );
}

export default Navbar