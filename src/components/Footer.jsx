import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import etIMG from "/et.png";

function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <footer className="border-box absolute bottom-0 flex w-screen flex-col gap-5 bg-(--nav-color) px-2 py-2 text-white">
      <p className="pt-4 text-2xl md:text-3xl">Let's Connect</p>

      <div className="flex items-center justify-center gap-2">
        <a
          href="https://github.com/wakandacat"
          target="blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="button-transition px-4 py-2 text-4xl hover:text-(--detail-color)"
            icon={faGithub}
            aria-label="GitHub account"
          />
          <span className="sr-only">Github</span>
        </a>
        <a
          href="https://www.linkedin.com/in/ellenatzavelas/"
          target="blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="button-transition px-4 py-2 text-4xl hover:text-(--detail-color)"
            icon={faLinkedin}
            aria-label="LinkedIn profile"
          />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a href="mailto:ellena.tzavelas@gmail.com" target="blank">
          <FontAwesomeIcon
            className="button-transition px-4 py-2 text-4xl hover:text-(--detail-color)"
            icon={faEnvelope}
            aria-label="Email account"
          />
          <span className="sr-only">Email</span>
        </a>
      </div>

      <div className="flex items-center justify-center gap-2">
        <img className="m-2 w-[30px]" src={etIMG} alt="Ellena's site logo" />
        <h5>© {currYear} Ellena Tzavelas</h5>
      </div>
    </footer>
  );
}

export default Footer;
