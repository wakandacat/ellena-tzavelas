import { useContext } from "react";
import '../styles/Navbar.css'
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
        <nav className="nav">
            <div className="left-buttons">
                <img className='logo' src={etIMG} alt="Ellena's site logo"/>
                <button className="nav-button" value='HomePage' onClick={handleClick} aria-label="Travel to the Homepage">HOME</button>
                <button className="nav-button" value='Project' onClick={handleClick} aria-label="Travel to the Project page">PROJECTS</button>
                <button className="nav-button" value='About' onClick={handleClick} aria-label="Travel to the About page">ABOUT</button>
            </div>
            <div className="right-buttons">
                <ThemeController/>
            </div>
        </nav>
    );
}

export default Navbar