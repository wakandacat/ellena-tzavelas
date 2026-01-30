import { useContext, useState } from "react";
import GlobalContext from "./GlobalContext.jsx";
import ImageProvider from "./ImageProvider.jsx";

function Card(props) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`base-card ${props.class}`}>
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <h3 className="sub-heading">{props.title}</h3>
        <p className="body-text">{props.blurb}</p>
        <div className="flex flex-wrap gap-4">
          {props.skills.map((skill) => (
            <p className="skill-pill" key={skill}>
              {skill}
            </p>
          ))}
        </div>
        <div className="flex gap-4">
          {props.liveButtonVal !== "" ? (
            <a
              id="liveLink"
              href={props.liveButtonVal}
              target="_blank"
              rel="noopener noreferrer"
              className="page-button"
              value={props.liveButtonVal}
              aria-label="Travel to the Live Application of the Project"
            >
              <h5 className="px-4 whitespace-nowrap">Live App</h5>
            </a>
          ) : null}
          {props.codeButtonVal !== "" ? (
            <a
              id="codeLink"
              href={props.codeButtonVal}
              target="_blank"
              rel="noopener noreferrer"
              className="page-button"
              value={props.codeButtonVal}
              aria-label="Travel to the Code Repository of the Project"
            >
              <h5 className="px-4 whitespace-nowrap">View Code</h5>
            </a>
          ) : null}
        </div>
      </div>
      {ImageProvider[props.image].endsWith(".mp4") ? (
        <video
          className="aspect-video w-full rounded-xl border-4 border-(--detail-color-2) bg-gray-700 object-cover lg:w-[50%]"
          loading="lazy"
          width="1200"
          height="675"
          src={ImageProvider[props.image]}
          alt={props.alt}
          autoPlay
          loop
          muted
        />
      ) : (
        <img
          className="aspect-video w-full rounded-xl border-4 border-(--detail-color-2) bg-gray-700 object-cover lg:w-[50%]"
          loading="lazy"
          width="1200"
          height="675"
          src={ImageProvider[props.image]}
          alt={props.alt}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}

export default Card;
