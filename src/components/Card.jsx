import React, { useContext } from "react";
import '../styles/Cards.css';
import GlobalContext from "./GlobalContext.jsx";
import ImageProvider from "./ImageProvider.jsx";

function Card(props) {

    const {globalState, setGlobalState} = useContext(GlobalContext);

    //change pages when corresponding button is pressed
    const handleClick = (event) => {
        setGlobalState(prevState => ({
            ...prevState,
            currentPage: event.target.value,         
        }));
    }

    return(
        <div className={`card ${props.class}`}>
            <div className="flex-container">
                <h1 className="title">{props.title}</h1>
                <h2 className="sub-title">{props.subtitle}</h2>
                <button className="page-button" value={props.buttonVal} onClick={handleClick}>VIEW</button>
            </div>
            <img className="about-image" src={ImageProvider[props.image]}/>
        </div>
    );
}

export default Card;