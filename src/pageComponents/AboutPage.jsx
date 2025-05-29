import React from "react";
import '../styles/Cards.css';
import '../styles/ProjectPages.css';

function AboutPage() {

    return (
        <>
            <div className="page-top card">
                <div className="flex-container">
                    <h1 className="title">ABOUT</h1>
                    <h2 className="sub-title">ELLENA TZAVELAS</h2>
                    <h3 className="blurb">Hello! I’m Ellena Tzavelas, a fourth year student of the joint Carleton-Algonquin Bachelor of Information Technology Interactive Multimedia and Design stream. This fantastic program gave me the opportunity to dabble in a plethora of multimedia topics from illustration and design, 3D modeling and physics based animation, software design, audio and video, and human-computer interactions. My academic experiences have ignited my passion for software, web and game development. <br/><br/>I completed a year of university co-op placements at Nokia and Irdeto which allowed me to put my education into practice and helped me to broaden my skills in many technologies (and soft skills too!). <br/><br/>In my spare time, I enjoy playing video games, reading sci-fi fantasy, gardening and cooking. <br/><br/>Feel free to check out some of the projects I’ve worked on as well as my resume!</h3>
                </div>
                <img src='src\assets\cat.jpg'/>
            </div>
            <div className="page-bottom card">
                <div className="flex-container">
                    <h2 className="sub-title">RESUME</h2>
                    <h3 className="blurb">hey guys its me this is temp text okkkkkkk teehee skjhgjk hjk hjkjkhjkhjhjjh fdbh gfhn fghn sg fg nfg hfgs hgfhn fgtsh gfhn gh gfh</h3>
                    <iframe className="pdf" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"></iframe>
                </div>
            </div>
        </>
    );
}

export default AboutPage;