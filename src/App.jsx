import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pageComponents/HomePage'
import AboutPage from './pageComponents/AboutPage'
import AcademicPage from './pageComponents/AcademicPage'
import PersonalPage from './pageComponents/PersonalPage'
import { useContext, useEffect, useState } from 'react'
import GlobalContext from './components/GlobalContext';

function App() {

  const {globalState, setGlobalState} = useContext(GlobalContext);

  const [localPage, setLocalPage] = useState(<HomePage/>);

  //map the strings to the page components
  const componentMapping = {
    HomePage: HomePage,
    About: AboutPage,
    Academic: AcademicPage,
    Personal: PersonalPage,
  };

  useEffect(() => {
    const PageComponent = componentMapping[globalState.currentPage];
    setLocalPage(<PageComponent/>);
    //force page to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
  }, [globalState.currentPage]);

  useEffect(() => {
    const allButtons = document.querySelectorAll(".nav-button");

    for(let i=0;i<allButtons.length;i++){
      allButtons[i].classList.remove("current-nav-button");
    }

    //ensure the nav button stays selected
    const navButton = document.querySelector(`[value="${globalState.currentPage}"]`);
    navButton.classList.add("current-nav-button");
  });

  return (
    <>
      <Navbar/>
      {localPage}
      <Footer/>
    </>
  )
}

export default App
