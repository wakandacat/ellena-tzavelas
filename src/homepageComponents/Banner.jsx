import React from "react"
import '../styles/Banner.css'

function Banner() {
    
    return(
    <section>
        <img id="banner" src='src\assets\cat.jpg'/>
        <div id="main-content">
            <h1 id="name">ELLENA TZAVELAS</h1>
            <h2 className="sub-title">Web Dev // Game Dev // other stufff</h2>
        </div>
    </section>);
}

export default Banner;