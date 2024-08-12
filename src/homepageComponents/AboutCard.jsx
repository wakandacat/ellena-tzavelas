import React, { useContext } from "react";
import '../styles/Cards.css';
import GlobalContext from "../generalComponents/GlobalContext.jsx";

function AboutCard() {

    const {globalState, setGlobalState} = useContext(GlobalContext);

    //change pages when corresponding button is pressed
    const handleClick = (event) => {
        setGlobalState(prevState => ({
            ...prevState,
            currentPage: event.target.value,         
        }));
    }

    return(
        <div className="card">
            <div id="flex-container">
                <h1 className="title">ABOUT</h1>
                <h2 className="sub-title">ELLENA TZAVELAS</h2>
                <button className="page-button" value='About' onClick={handleClick}>VIEW</button>
            </div>
            <img src='src\assets\cat.jpg'/>
        </div>
    );
}

export default AboutCard;