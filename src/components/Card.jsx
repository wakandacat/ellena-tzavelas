import { useContext } from "react";
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
            <div className="flex flex-col justify-start">
                <h2 className="font-bold text-(--detail-color)">{props.title}</h2>
                <h3 className="text-(--detail-color-2)">{props.subtitle}</h3>           
                <button className="text-2xl hover:text-(--detail-color) mt-4 page-button" value={props.buttonVal} onClick={handleClick}>VIEW</button>
            </div>
            <img className="border-4 border-(--detail-color-2) rounded-xl w-[80%] md:w-[30%] object-cover" loading="lazy" src={ImageProvider[props.image]}/>
        </div>
    );
}

export default Card;