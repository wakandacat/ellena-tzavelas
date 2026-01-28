import { useEffect, useState, useRef } from "react";

function ThemeController(props) {
  //define the themes and their --detail-color and --background-color values to use in the navbar dropdown
  const THEME_COLORS = {
    light: { name: "Light Mode", detail: "#25a0a8", background: "#ffffff" },
    dark: { name: "Dark Mode", detail: "#25a0a8", background: "#16222c" },
    pink: { name: "Pink Mode", detail: "#e0223b", background: "#dacfd1" },
    green: { name: "Green Mode", detail: "#226914", background: "#e3fade" },
  };

  //local theme state
  const [localTheme, setLocalTheme] = useState("light");

  //to add a new theme: add the name here, then in styles.css create a new data-theme with the identical name
  const themeOptions = ["light", "dark", "pink", "green"];
  const [isOpen, setIsOpen] = useState(0);
  const [dropdownOps, setDropdownOps] = useState([]);
  const dropdownRef = useRef(null); //grab a reference to the dropdown to close it when the user clicks away
  const buttonRef = useRef(null); //reference to the dropdown button
  const [mobileView, setMobileView] = useState(false); //flag for if we're in mobile view

  //change modes manually with the button
  const handleClick = () => {
    setIsOpen((prev) => !prev); //toggle the open state
  };

  const handleChangeTheme = (clickedTheme) => {
    setIsOpen(false); //close
    setLocalTheme(clickedTheme);

    //update the theme in localstorage
    localStorage.setItem("pagetheme", clickedTheme);

    document.querySelector("html").setAttribute("data-theme", clickedTheme);
  };

  //check internal computer theme state
  useEffect(() => {
    // //only light or dark modes
    // const currentTheme = window.matchMedia("(prefers-color-scheme: dark)")
    //   .matches
    //   ? "dark"
    //   : "light";

    let currentTheme = "light";

    //check localstorage for saved theme
    if (localStorage.getItem("pagetheme")) {
      currentTheme = localStorage.getItem("pagetheme");
    }

    setLocalTheme(currentTheme);
    document.querySelector("html").setAttribute("data-theme", currentTheme); //use the corresponding "theme" from the css
  }, []);

  //everytime the local theme changes, update the dropdown options
  useEffect(() => {
    const newOps = themeOptions.map((theme) => (
      <button
        className="nav-button flex justify-center rounded-xl border-0 bg-(--nav-color) capitalize"
        onClick={() => handleChangeTheme(theme)}
        key={theme}
        aria-label={`${THEME_COLORS[theme].name} theme`}
      >
        <a
          className="mr-2 h-5 w-5 rounded-full border-2"
          style={{
            borderColor: THEME_COLORS[theme].background,
            backgroundColor: THEME_COLORS[theme].detail,
          }}
        />
        {!mobileView && <p className="px-4">{THEME_COLORS[theme].name}</p>}

        {theme === localTheme && <p>✓</p>}
      </button>
    ));
    setDropdownOps(newOps);
  }, [localTheme, mobileView]);

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

  //check if we are in mobile view so we can change the structure of the element
  useEffect(() => {
    const handleResize = () => {
      //close the menu
      if (window.innerWidth >= 768) {
        //greater than md breakpoint
        setMobileView(false);
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

  return (
    <>
      {!mobileView && (
        <>
          <button
            className={`nav-button flex items-center rounded-xl border-0 capitalize ${props.navClass}`}
            onClick={handleClick}
            ref={buttonRef}
            value={localTheme}
            aria-label={`Button that says ${localTheme} theme. Click to open a dropdown to select a different site theme.`}
          >
            <a
              className="mr-2 h-5 w-5 rounded-full border-2"
              style={{
                borderColor: THEME_COLORS[localTheme].background,
                backgroundColor: THEME_COLORS[localTheme].detail,
              }}
            />
            <p className="px-4">{THEME_COLORS[localTheme].name}</p>
            {!mobileView && (isOpen ? <p>&#x25BC;</p> : <p>&#x25B6;</p>)}
          </button>
        </>
      )}

      {(!mobileView && isOpen) || (mobileView && props.mobileMenuOpen) ? (
        <aside>
          <div
            className="relative flex flex-row rounded-xl bg-(--nav-color) capitalize md:absolute md:flex-col md:border-2"
            ref={dropdownRef}
          >
            {dropdownOps}
          </div>
        </aside>
      ) : (
        ""
      )}
    </>
  );
}

export default ThemeController;
