import { useContext, useState, useEffect } from "react";
import ThemeController from "./ThemeController.jsx";
import GlobalContext from "./GlobalContext.jsx";
import etIMG from "/et.png";

function Navbar() {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [activeSection, setActiveSection] = useState("banner"); //banner, about, skills, projects, contact

  //change pages when corresponding button is pressed
  // const handleClick = (event) => {

  //   // setGlobalState((prevState) => ({
  //   //   ...prevState,
  //   //   currentPage: event.target.value,
  //   // }));
  // };

  //detect which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      // detect what section is in the middle of the screen
      const scrollPosition = window.scrollY + window.innerHeight / 2 + 200;

      const sections = document.querySelectorAll("section[id]"); //find all section elements with an id

      sections.forEach((section) => {
        const sectionTop = section.offsetTop; //grab the top value of the section
        const sectionHeight = section.offsetHeight; //get the height of the section
        const sectionId = section.id;

        //check if our detection point intersects with the section
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    //run once initially
    handleScroll();

    //destroy on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="sm:no-wrap relative top-0 right-0 left-0 z-2000 flex flex-row flex-wrap items-center justify-center bg-(--nav-color) px-5 py-2 text-white sm:fixed"
      role="navigation"
      aria-label="Main Navigation Bar"
    >
      <img className="m-2 w-[40px]" src={etIMG} alt="Ellena's site logo" />
      <a
        className={`nav-button ${activeSection === "banner" ? "current-nav-button" : ""}`}
        // value="HomePage"
        // onClick={handleClick}
        aria-label="Travel to the Home section"
        href="#banner"
      >
        Home
      </a>
      <a
        className={`nav-button ${activeSection === "about" ? "current-nav-button" : ""}`}
        value="About"
        // onClick={handleClick}
        aria-label="Travel to the About section"
        href="#about"
      >
        About
      </a>
      <a
        className={`nav-button ${activeSection === "skills" ? "current-nav-button" : ""}`}
        value="Skills"
        // onClick={handleClick}
        aria-label="Travel to the Skills section"
        href="#skills"
      >
        Skills
      </a>
      <a
        className={`nav-button ${activeSection === "projects" ? "current-nav-button" : ""}`}
        value="Project"
        // onClick={handleClick}
        aria-label="Travel to the Project section"
        href="#projects"
      >
        Projects &#x25B6;
      </a>
      <a
        className={`nav-button ${activeSection === "contact" ? "current-nav-button" : ""}`}
        value="Contact"
        // onClick={handleClick}
        aria-label="Travel to the Contact section"
        href="#contact"
      >
        Contact
      </a>
      <div className="ml-0 sm:ml-auto">
        <ThemeController />
      </div>
    </nav>
  );
}

export default Navbar;
