import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import etIMG from '/et.png';

function Footer() {

    const currYear = new Date().getFullYear();

    return (
        <footer className="text-white absolute flex flex-col bottom-0">
            <div className="bg-(--detail-color) w-screen">
                <h2 className='text-3xl'>CONNECT WITH ME!</h2>
            </div>
            <div className="bg-(--background-color-3) py-4 h-[175px]">
                 <div>
                    <a href="https://github.com/wakandacat" target="blank">
                        <FontAwesomeIcon className='text-4xl px-4 py-2 icon' icon={faGithub} />
                    </a>
                    <a href="https://www.linkedin.com/in/ellenatzavelas/" target="blank">
                        <FontAwesomeIcon className='text-4xl px-4 py-2 icon' icon={faLinkedin} />
                    </a>
                    <a href="mailto:wakandacat@gmail.com" target="blank">
                        <FontAwesomeIcon className='text-4xl px-4 py-2 icon' icon={faEnvelope} />
                    </a>
                </div>
                <hr className='m-auto w-4/5 border-1 border-(--background-color-2)'/>
                <div className="flex items-center justify-center rightsBar">
                    <img className='w-[40px] m-2' src={etIMG} alt="Ellena's site logo"/>
                    <h4>Ellena Tzavelas {currYear}</h4>
                </div>
            </div>
        </footer>
    );
}

export default Footer;