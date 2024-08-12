import Navbar from './generalComponents/Navbar'
import Footer from './generalComponents/Footer'
import HomePage from './pageComponents/HomePage'
import AboutPage from './pageComponents/AboutPage'
import { useContext, useEffect, useState } from 'react'
import GlobalContext from './generalComponents/GlobalContext';

function App() {

  const {globalState, setGlobalState} = useContext(GlobalContext);

  const [localPage, setLocalPage] = useState(<HomePage/>);

  //map the strings to the page components
  const componentMapping = {
    HomePage: HomePage,
    About: AboutPage,
  };

  useEffect(() => {
    const PageComponent = componentMapping[globalState.currentPage];
    setLocalPage(<PageComponent/>);
  }, [globalState.currentPage]);

  return (
    <>
      <Navbar/>
      {localPage}
      <Footer/>
    </>
  )
}

export default App
