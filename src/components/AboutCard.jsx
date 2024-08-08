import React from "react";
import '../styles/AboutCard.css';

function AboutCard() {

    return(
        <div id="about-card">
            <div id="flex-container">
                <h1 className="title">ABOUT</h1>
                <h2 className="sub-title">ELLENA TZAVELAS</h2>
                <button className="page-button">VIEW</button>
            </div>
            <img src='src\assets\cat.jpg'/>
        </div>
    );
}

export default AboutCard;