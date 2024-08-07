import React from "react";
import '../styles/Navbar.css'
import ThemeController from './ThemeController.jsx';

function Navbar() {

    return (
        <span>
            <div id="left-buttons">
                <img id='logo' src="/e.png"/>
                <button>home</button>
                <button>academic</button>
                <button>personal</button>
                <button>about</button>
            </div>
            <div id="right-buttons">
                <ThemeController/>
            </div>
        </span>
    );
}

export default Navbar