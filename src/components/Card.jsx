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
        <div className={`bg-(--background-color-2) card ${props.class}`}>
            <div className="flex-container mx-2">
                <h1 className="text-8xl font-bold text-(--detail-color) title">{props.title}</h1>
                <h2 className="text-2xl text-(--detail-color-2) sub-title">{props.subtitle}</h2>
                <button className="text-2xl hover:text-(--detail-color) mt-4 page-button" value={props.buttonVal} onClick={handleClick}>VIEW</button>
            </div>
            <img className="border-4 border-(--detail-color-2) rounded-xl about-image" loading="lazy" src={ImageProvider[props.image]}/>
        </div>
    );
}

export default Card;