import React, { useContext } from "react";
import '../styles/Cards.css';
import GlobalContext from "../generalComponents/GlobalContext.jsx";

function AcademicCard() {

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
                <h1 className="title">ACADEMIC PROJECTS</h1>
                <h2 className="sub-title">Carleton University // Algonquin College</h2>
                <button className="page-button" value='Academic' onClick={handleClick}>VIEW</button>
            </div>
            <img src='src\assets\cat.jpg'/>
        </div>
    );
}

export default AcademicCard;