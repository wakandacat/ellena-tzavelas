import React from "react"
import '../styles/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {

    return (
        <span id="footer-top">
            <div id="social-bar">
                <h2>CONNECT WITH ME</h2>
                <div>
                    <a href="https://github.com/wakandacat" target="blank">
                        <FontAwesomeIcon className='icon' icon={faGithub} />
                    </a>
                    <a href="https://www.linkedin.com/in/ellenatzavelas/" target="blank">
                        <FontAwesomeIcon className='icon' icon={faLinkedin} />
                    </a>
                    <a href="mailto:wakandacat@gmail.com" target="blank">
                        <FontAwesomeIcon className='icon' icon={faEnvelope} />
                    </a>
                </div>
            </div>
            <div id="footer-bottom">
                <img id='logo' src="/e.png"/>
                <hr/>
                <h4>Ellena Tzavelas 2024</h4>
            </div>
        </span>
    );
}

export default Footer;