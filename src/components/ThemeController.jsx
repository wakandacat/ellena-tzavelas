import { useEffect, useState, useRef } from "react";

function ThemeController() {
  //local theme state
  const [localTheme, setLocalTheme] = useState("light");

  //to add a new theme: add the name here, then in styles.css create a new data-theme with the identical name
  const themeOptions = ["light", "dark", "pink", "green"];
  const [isOpen, setIsOpen] = useState(0);
  const [dropdownOps, setDropdownOps] = useState([]);
  const dropdownRef = useRef(null); //grab a reference to the dropdown to close it when the user clicks away

  //change modes manually with the button
  const handleClick = () => {
    setIsOpen(true); //toggle the open state
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
    document.querySelector("html").setAttribute("data-theme", currentTheme);
  }, []);

  //everytime the local theme changes, update the dropdown options
  useEffect(() => {
    const newOps = themeOptions
      .filter((theme) => theme !== localTheme)
      .map((theme) => (
        <button
          className="nav-button flex justify-center rounded-xl border-0 bg-(--background-color-3) uppercase"
          onClick={() => handleChangeTheme(theme)}
          key={theme}
          aria-label={`${theme} theme`}
        >
          <h5 className="px-4">{theme}</h5>
        </button>
      ));
    setDropdownOps(newOps);
  }, [localTheme]);

  useEffect(() => {
    function handleClickOutside(event) {
      // close the dropdown if the user clicks outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  return (
    <>
      <button
        className="nav-button flex rounded-xl border-0 bg-(--background-color-3) uppercase"
        onClick={handleClick}
        value={localTheme}
        aria-label={`Button that says ${localTheme} theme. Click to open a dropdown to select a different site theme.`}
      >
        <h5 className="px-4">{localTheme}</h5>
        {isOpen ? <p>&#x25BC;</p> : <p>&#x25B6;</p>}
      </button>
      {isOpen ? (
        <aside>
          <div
            className="absolute flex flex-col rounded-xl border-2 bg-(--background-color-3) uppercase"
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
