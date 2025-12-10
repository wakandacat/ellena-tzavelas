import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import etIMG from "/et.png";

function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <footer className="absolute bottom-0 flex flex-col text-white">
      <div className="w-screen bg-(--detail-color)">
        <h4 className="py-2 text-3xl">CONNECT WITH ME!</h4>
      </div>
      <div className="h-[165px] bg-(--background-color-3) py-4">
        <div>
          <a href="https://github.com/wakandacat" target="blank">
            <FontAwesomeIcon
              className="icon px-4 py-2 text-4xl"
              icon={faGithub}
              aria-label="GitHub account"
            />
            <span className="sr-only">Github</span>
          </a>
          <a href="https://www.linkedin.com/in/ellenatzavelas/" target="blank">
            <FontAwesomeIcon
              className="icon px-4 py-2 text-4xl"
              icon={faLinkedin}
              aria-label="LinkedIn profile"
            />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:ellena.tzavelas@gmail.com" target="blank">
            <FontAwesomeIcon
              className="icon px-4 py-2 text-4xl"
              icon={faEnvelope}
              aria-label="Email account"
            />
            <span className="sr-only">Email</span>
          </a>
        </div>
        <hr className="m-auto my-2 w-4/5 border-1 border-(--background-color-2)" />
        <div className="rightsBar flex items-center justify-center">
          <img className="m-2 w-[40px]" src={etIMG} alt="Ellena's site logo" />
          <h5>Ellena Tzavelas {currYear}</h5>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
