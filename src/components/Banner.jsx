import React from "react"
import '../styles/Banner.css'

function Banner() {
    
    return(
    <section>
        <img id="banner" src='src\assets\flower.png'/>
        <div id="main-content">
            <h1 id="name">ELLENA TZAVELAS</h1>
            <h2 className="banner-sub">Web Dev // Game Dev</h2>
        </div>
    </section>);
}

export default Banner;