import '../styles/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import etIMG from '/et.png';

function Footer() {

    const currYear = new Date().getFullYear();

    return (
        <footer className="text-white footer-top">
            <div className="social-bar">
                <h2 className='text-2xl'>CONNECT WITH ME!</h2>
            </div>
            <div className="footer-bottom">
                 <div>
                    <a href="https://github.com/wakandacat" target="blank">
                        <FontAwesomeIcon className='text-4xl icon' icon={faGithub} />
                    </a>
                    <a href="https://www.linkedin.com/in/ellenatzavelas/" target="blank">
                        <FontAwesomeIcon className='text-4xl icon' icon={faLinkedin} />
                    </a>
                    <a href="mailto:wakandacat@gmail.com" target="blank">
                        <FontAwesomeIcon className='text-4xl icon' icon={faEnvelope} />
                    </a>
                </div>
                <hr/>
                <div className="rightsBar">
                    <img className='logo' src={etIMG} alt="Ellena's site logo"/>
                    <h4>Ellena Tzavelas {currYear}</h4>
                </div>
            </div>
        </footer>
    );
}

export default Footer;