import { useContext } from "react";
import ThemeController from "./ThemeController.jsx";
import GlobalContext from "./GlobalContext.jsx";
import etIMG from "/et.png";

function Navbar() {
  const { globalState, setGlobalState } = useContext(GlobalContext);

  //change pages when corresponding button is pressed
  const handleClick = (event) => {
    setGlobalState((prevState) => ({
      ...prevState,
      currentPage: event.target.value,
    }));
  };

  return (
    <nav
      className="sm:no-wrap relative top-0 right-0 left-0 z-2000 flex flex-row flex-wrap items-center justify-center bg-(--nav-color) px-5 py-2 text-white sm:fixed"
      role="navigation"
      aria-label="Main Navigation Bar"
    >
      <img className="m-2 w-[40px]" src={etIMG} alt="Ellena's site logo" />
      <button
        className="nav-button"
        value="HomePage"
        onClick={handleClick}
        aria-label="Travel to the Homepage"
      >
        HOME
      </button>
      <button
        className="nav-button"
        value="Project"
        onClick={handleClick}
        aria-label="Travel to the Project page"
      >
        PROJECTS
      </button>
      <button
        className="nav-button"
        value="About"
        onClick={handleClick}
        aria-label="Travel to the About page"
      >
        ABOUT
      </button>
      <div className="ml-0 sm:ml-auto">
        <ThemeController />
      </div>
    </nav>
  );
}

export default Navbar;
