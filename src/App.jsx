import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pageComponents/HomePage";
import AboutPage from "./pageComponents/AboutPage";
import ProjectPage from "./pageComponents/ProjectPage";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "./components/GlobalContext";

function App() {
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const [localPage, setLocalPage] = useState(<HomePage />);

  //map the strings to the page components
  const componentMapping = {
    HomePage: HomePage,
    About: AboutPage,
    Project: ProjectPage,
  };

  //loading spinner management
  useEffect(() => {
    const loader = document.getElementById("loading-screen");
    if (!loader) return;

    //set a timeout so everyone sees the loader
    setTimeout(() => {
      loader.classList.add("hidden");

      // remove loader html after load
      loader.addEventListener("transitionend", () => loader.remove());
    }, 1000);
  }, []);

  //update the current page and force scroll to top effect
  useEffect(() => {
    const PageComponent = componentMapping[globalState.currentPage];
    setLocalPage(<PageComponent />);
    //force page to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    //grab the nav buttons and update their styles
    const allButtons = document.querySelectorAll(".nav-button");

    for (let i = 0; i < allButtons.length; i++) {
      allButtons[i].classList.remove("current-nav-button");
    }

    //ensure the nav button stays selected
    const navButton = document.querySelector(
      `[value="${globalState.currentPage}"]`,
    );
    navButton.classList.add("current-nav-button");
  }, [globalState.currentPage]);

  return (
    <>
      <Navbar />
      {localPage}
      <Footer />
    </>
  );
}

export default App;
