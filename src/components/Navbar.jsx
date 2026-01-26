import { useContext, useState, useEffect, useRef } from "react";
import ThemeController from "./ThemeController.jsx";
import GlobalContext from "./GlobalContext.jsx";
import etIMG from "/et.png";

function Navbar() {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [activeSection, setActiveSection] = useState("banner"); //banner, about, skills, projects, contact
  const [isOpen, setIsOpen] = useState(0);
  const dropdownRef = useRef(null); //grab a reference to the dropdown to close it when the user clicks away
  const buttonRef = useRef(null); //reference to the dropdown button

  //go back to the homepage from other pages if we click on the homepage scrollspy options
  const handleNavClick = (event, sectionID) => {
    if (sectionID === "projects") {
      setIsOpen((prev) => !prev); //toggle the open state of the projects dropdown
    }
    if (globalState.currentPage !== "HomePage") {
      event.preventDefault(); //stop default behaviour of hrefs
      setGlobalState((prevState) => ({
        ...prevState,
        currentPage: "HomePage",
      }));
      setTimeout(() => {
        //after page loads, scroll to section
        document
          .getElementById(sectionID)
          .scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // close the dropdown if the user clicks outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    // attach listener when mounted
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);

    // cleanup when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    };
  }, []);

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
        aria-label="Travel to the Home section"
        href="#banner"
        onClick={(e) => handleNavClick(e, "banner")}
      >
        Home
      </a>
      <a
        className={`nav-button ${activeSection === "about" ? "current-nav-button" : ""}`}
        aria-label="Travel to the About section"
        href="#about"
        onClick={(e) => handleNavClick(e, "about")}
      >
        About
      </a>
      <a
        className={`nav-button ${activeSection === "skills" ? "current-nav-button" : ""}`}
        aria-label="Travel to the Skills section"
        href="#skills"
        onClick={(e) => handleNavClick(e, "skills")}
      >
        Skills
      </a>
      <div className="relative">
        <a
          className={`nav-button flex ${activeSection === "projects" ? "current-nav-button" : ""}`}
          value="Project"
          // onClick={handleClick}
          ref={buttonRef}
          onClick={(e) => handleNavClick(e, "projects")}
          aria-label="Travel to the Project section"
        >
          {isOpen ? <p>Projects &#x25BC;</p> : <p>Projects &#x25B6;</p>}
        </a>
        {isOpen ? (
          <aside>
            <div
              className="absolute flex flex-col rounded-xl border-2 bg-(--nav-color) capitalize"
              ref={dropdownRef}
            >
              <a
                href="#projects"
                className="nav-button flex justify-center rounded-xl border-0 bg-(--nav-color) capitalize"
              >
                {" "}
                <h5 className="px-4 whitespace-nowrap">
                  {"Featured Projects"}
                </h5>
              </a>
              <button
                className="nav-button flex justify-center rounded-xl border-0 bg-(--nav-color) capitalize"
                onClick={() => {
                  setIsOpen(false);
                  setGlobalState((prevState) => ({
                    ...prevState,
                    currentPage: "Project",
                  }));
                }}
                aria-label={"Go to the All Projects page"}
              >
                <h5 className="px-4 whitespace-nowrap">{"All Projects"}</h5>
              </button>
            </div>
          </aside>
        ) : (
          ""
        )}
      </div>
      <a
        className={`nav-button ${activeSection === "contact" ? "current-nav-button" : ""}`}
        value="Contact"
        aria-label="Travel to the Contact section"
        href="#contact"
        // onClick={(e) => handleNavClick(e, "contact")}
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
