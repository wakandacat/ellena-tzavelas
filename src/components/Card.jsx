import { useContext, useState } from "react";
import GlobalContext from "./GlobalContext.jsx";
import ImageProvider from "./ImageProvider.jsx";

function Card(props) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);

  //change pages when corresponding button is pressed
  const handleClick = (event) => {
    setGlobalState((prevState) => ({
      ...prevState,
      currentPage: event.target.value,
    }));
  };

  return (
    <div className={`card ${props.class}`}>
      <div className="flex flex-col items-center md:items-start">
        <h2 className="font-bold text-(--detail-color)">{props.title}</h2>
        <h3 className="text-(--detail-color-2)">{props.subtitle}</h3>

        {props.buttonVal ? (
          <button
            className="page-button"
            value={props.buttonVal}
            onClick={handleClick}
          >
            VIEW
          </button>
        ) : (
          ""
        )}
      </div>
      <img
        className={`aspect-7/5 w-[80%] ${
          !loaded ? "animate-pulse" : ""
        } rounded-xl border-4 border-(--detail-color-2) bg-gray-700 object-cover md:w-[30%]`}
        loading="lazy"
        src={ImageProvider[props.image]}
        alt={props.alt}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default Card;
