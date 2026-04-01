import { useState } from "react";

import ImageProvider from "./ImageProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Card(props) {
  const [loaded, setLoaded] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const isVideo = ImageProvider[props.image].endsWith(".mp4");

  return (
    <div className={`base-card ${props.class}`}>
      {/* Fullscreen overlay */}
      <div
        id="overlay"
        className={`fixed top-0 left-0 z-5000 ${overlayVisible ? "flex" : "hidden"} h-[100vh] w-full cursor-pointer flex-col items-center justify-center gap-6 bg-black/80 p-8`}
      >
        <div className="flex w-full justify-end px-4">
          <FontAwesomeIcon
            className="button-transition filter-button px-2 py-1 text-6xl hover:text-(--detail-color)"
            icon={faX}
            onClick={() => setOverlayVisible(false)}
          />
        </div>
        {isVideo ? (
          <video
            className="full-image"
            src={ImageProvider[props.image]}
            alt={props.alt}
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            className="full-image"
            src={ImageProvider[props.image]}
            alt={props.alt}
            loading="lazy"
          />
        )}
        <p className="px-12 text-lg text-white">{props.alt}</p>
      </div>

      <div className="flex flex-col items-center gap-4 lg:items-start flex-1 min-w-0">
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

      <div
        className="aspect-video w-full cursor-pointer overflow-hidden rounded-xl border-4 border-(--detail-color-2) bg-gray-700 transition-all hover:scale-105 lg:w-[50%] lg:shrink-0"
        onClick={() => setOverlayVisible(true)}
      >
        {isVideo ? (
          <video
            className="h-full w-full object-cover"
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
            className="h-full w-full object-cover"
            width="1200"
            height="675"
            src={ImageProvider[props.image]}
            alt={props.alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    </div>
  );
}

export default Card;
