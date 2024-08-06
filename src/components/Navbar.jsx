import React from "react";
import '../styles/Navbar.css'

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
                <button>make this a cycle button for theme</button>
            </div>
        </span>
    );
}

export default Navbar