import React, { useContext } from "react";
import '../styles/Cards.css';
import GlobalContext from "../generalComponents/GlobalContext.jsx";

function PersonalCard() {

    const {globalState, setGlobalState} = useContext(GlobalContext);

    //change pages when corresponding button is pressed
    const handleClick = (event) => {
        setGlobalState(prevState => ({
            ...prevState,
            currentPage: event.target.value,         
        }));
    }

    return(
        <div className="card personal">
            <img src='src\assets\cat.jpg'/>
            <div id="flex-container">
                <h1 className="title">PERSONAL PROJECTS</h1>
                <h2 className="sub-title">2020 - 2024</h2>
                <button className="page-button" value='Personal' onClick={handleClick}>VIEW</button>
            </div>
        </div>
    );
}

export default PersonalCard;