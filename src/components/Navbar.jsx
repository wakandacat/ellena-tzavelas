import { useContext, useState, useEffect, useRef } from "react";
import ThemeController from "./ThemeController.jsx";
import GlobalContext from "./GlobalContext.jsx";
import etIMG from "/et.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [activeSection, setActiveSection] = useState("banner"); //banner, about, skills, projects, contact
  const [isOpen, setIsOpen] = useState(0);
  const dropdownRef = useRef(null); //grab a reference to the dropdown to close it when the user clicks away
  const buttonRef = useRef(null); //reference to the dropdown button
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); //hamburger menu state
  const navRef = useRef(null); //for mobile state
  const [mobileView, setMobileView] = useState(false); //flag for if we're in mobile view

  //go back to the homepage from other pages if we click on the homepage scrollspy options
  const handleNavClick = (event, sectionID) => {
    if (sectionID === "projects") {
      if (mobileView === false) {
        //if we are desktop view
        event.preventDefault(); //don't use the href default behaviour
        setIsOpen((prev) => !prev); //toggle the open state
      }
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

    //close mobile menu after clicking
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // close the dropdown if the user clicks outside or scrolling
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        //close mobile menu after clicking off or scrolling
        setMobileMenuOpen(false);
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

  //ensure the mobile menu is closed when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      //close the menu
      if (window.innerWidth >= 768) {
        //greater than md breakpoint
        setMobileView(false);
        setMobileMenuOpen(false);
      } else {
        setMobileView(true);
      }
    };

    // add event listener
    window.addEventListener("resize", handleResize);
    //run once initially
    handleResize();

    // cleanup on dismount
    return () => window.removeEventListener("resize", handleResize);
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
      id="navbar"
      className={`sm:no-wrap fixed top-0 right-0 left-0 z-50 flex items-center justify-center bg-(--nav-color) px-5 py-2 text-white ${mobileMenuOpen ? "flex-col" : "flex-row"}`}
      role="navigation"
      aria-label="Main Navigation Bar"
      ref={navRef}
    >
      <div className="flex w-full items-center justify-between md:w-fit">
        <img className="m-2 w-[40px]" src={etIMG} alt="Ellena's site logo" />
        {/* hamburger menu button */}
        <a
          className="nav-button flex-inline text-end md:hidden"
          aria-label="Open navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FontAwesomeIcon
            className="button-transition px-2 py-1 text-2xl hover:text-(--detail-color)"
            icon={mobileMenuOpen ? faX : faBars}
          />
        </a>
      </div>
      <a
        className={`nav-button ${activeSection === "banner" ? "current-nav-button" : ""} ${mobileMenuOpen ? "flex" : "hidden"} md:flex`}
        aria-label="Travel to the Home section"
        href="#banner"
        onClick={(e) => handleNavClick(e, "banner")}
      >
        Home
      </a>
      <a
        className={`nav-button ${activeSection === "about" ? "current-nav-button" : ""} ${mobileMenuOpen ? "flex" : "hidden"} md:flex`}
        aria-label="Travel to the About section"
        href="#about"
        onClick={(e) => handleNavClick(e, "about")}
      >
        About
      </a>
      <a
        className={`nav-button ${activeSection === "skills" ? "current-nav-button" : ""} ${mobileMenuOpen ? "flex" : "hidden"} md:flex`}
        aria-label="Travel to the Skills section"
        href="#skills"
        onClick={(e) => handleNavClick(e, "skills")}
      >
        Skills
      </a>
      <div className="relative">
        <a
          className={`nav-button flex ${activeSection === "projects" ? "current-nav-button" : ""} ${mobileMenuOpen ? "flex" : "hidden"} md:flex`}
          value="Project"
          href="#projects" /* to allow scrolling in mobile view */
          ref={buttonRef}
          onClick={(e) => handleNavClick(e, "projects")}
          aria-label="Travel to the Project section"
        >
          <p className="md:pr-4">Projects</p>
          {!mobileView && (isOpen ? <p>&#x25BC;</p> : <p>&#x25B6;</p>)}
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
        className={`nav-button ${activeSection === "contact" ? "current-nav-button" : ""} ${mobileMenuOpen ? "flex" : "hidden"} md:flex`}
        value="Contact"
        aria-label="Travel to the Contact section"
        href="#contact"
        // onClick={(e) => handleNavClick(e, "contact")}
      >
        Contact
      </a>
      <div className="ml-0 md:ml-auto">
        <ThemeController
          navClass={`${mobileMenuOpen ? "flex" : "hidden"} md:flex`}
          mobileMenuOpen={mobileMenuOpen}
        />
      </div>
    </nav>
  );
}

export default Navbar;
