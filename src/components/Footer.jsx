import React from "react"
import '../styles/Footer.css'

function Footer() {

    return (
        <span id="footer-top">
            <div id="social-bar">
                <h2>FIND ME</h2>
                <div>
                    <a>github logo</a>
                    <a>linkedin logo</a>
                    <a>email logo</a>
                </div>
            </div>
            <div id="footer-bottom">
                <img id='logo' src="/e.png"/>
                <h4>Ellena Tzavelas 2024</h4>
            </div>
        </span>
    );
}

export default Footer;