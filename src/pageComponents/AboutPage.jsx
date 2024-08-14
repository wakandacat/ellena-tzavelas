import React from "react";
import '../styles/Cards.css';
import '../styles/AboutPage.css';

function AboutPage() {

    return (
        <>
            <div className="page-top card">
                <div id="flex-container">
                    <h1 className="title">ABOUT</h1>
                    <h2 className="sub-title">ELLENA TZAVELAS</h2>
                    <h3 className="blurb">hey guys its me this is temp text okkkkkkk teehee skjhgjk hjk hjkjkhjkhjhjjh fdbh gfhn fghn sg fg nfg hfgs hgfhn fgtsh gfhn gh gfh</h3>
                </div>
                <img src='src\assets\cat.jpg'/>
            </div>
            <div className="page-bottom card">
                <div id="flex-container">
                    <h2 className="sub-title">RESUME</h2>
                    <h3 className="blurb">hey guys its me this is temp text okkkkkkk teehee skjhgjk hjk hjkjkhjkhjhjjh fdbh gfhn fghn sg fg nfg hfgs hgfhn fgtsh gfhn gh gfh</h3>
                </div>
            </div>
        </>
    );
}

export default AboutPage;