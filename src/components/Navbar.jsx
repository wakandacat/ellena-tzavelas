import React, { useContext } from "react";
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
        <span id="nav">
            <div id="left-buttons">
                <img id='logo' src={etIMG}/>
                <button className="nav-button" value='HomePage' onClick={handleClick}>HOME</button>
                <button className="nav-button" value='Personal' onClick={handleClick}>PROJECTS</button>
                <button className="nav-button" value='About' onClick={handleClick}>ABOUT</button>
            </div>
            <div id="right-buttons">
                <ThemeController/>
            </div>
        </span>
    );
}

export default Navbar