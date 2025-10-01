import { useContext } from "react";
import ThemeController from './ThemeController.jsx';
import GlobalContext from "./GlobalContext.jsx";
import etIMG from '/et.png';

function Navbar() {

    const {globalState, setGlobalState} = useContext(GlobalContext);

    //change pages when corresponding button is pressed
    const handleClick = (event) => {
        setGlobalState(prevState => ({
            ...prevState,
            currentPage: event.target.value,         
        }));
    }

    return (
        <nav className="text-white bg-(--background-color-3) flex flex-row flex-wrap sm:no-wrap py-2 px-5 justify-center relative sm:fixed top-0 left-0 right-0 z-2000 items-center" role="navigation" aria-label="Main Navigation Bar">
            <img className='w-[40px] m-2' src={etIMG} alt="Ellena's site logo"/>
            <button className="hover:text-(--detail-color) bg-(--background-color-3) hover:brightness-200 border-0 rounded-xl nav-button" value='HomePage' onClick={handleClick} aria-label="Travel to the Homepage">HOME</button>
            <button className="hover:text-(--detail-color) bg-(--background-color-3) hover:brightness-200 border-0 rounded-xl nav-button" value='Project' onClick={handleClick} aria-label="Travel to the Project page">PROJECTS</button>
            <button className="hover:text-(--detail-color) bg-(--background-color-3) hover:brightness-200 border-0 rounded-xl nav-button" value='About' onClick={handleClick} aria-label="Travel to the About page">ABOUT</button>   
            <div className="ml-0 sm:ml-auto">
                <ThemeController/>
            </div>
        </nav>
    );
}

export default Navbar