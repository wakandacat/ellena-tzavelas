import meIMG from "../assets/me4.jpg";
import { useState } from "react";

function AboutPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main>
      <div className="page-top">
        <div className="flex-container">
          <h2 className="title font-bold text-(--detail-color)">ABOUT</h2>
          <h3 className="sub-title text-(--detail-color-2)">ELLENA TZAVELAS</h3>
          <h4 className="blurb">
            Hello! I’m Ellena Tzavelas, a recent graduate of the joint
            Carleton-Algonquin Bachelor of Information Technology Interactive
            Multimedia and Design program. This fantastic program gave me the
            opportunity to dabble in various multimedia topics from illustration
            and design, 3D modeling and physics based animation, software
            design, audio and video, human-computer interactions and more. My
            academic experiences have ignited my passion for web development and
            design. <br />
            <br />I completed a year of paid university internships at Nokia and
            Irdeto which allowed me to put my education into practice and helped
            me to broaden my technology skills (and soft skills too!). <br />
            <br />
            In my spare time, I enjoy playing video games, reading sci-fi
            fantasy, gardening and cooking.
          </h4>
        </div>
        <img
          className={`aspect-square w-sm rounded-xl border-4 border-(--detail-color-2) object-cover md:w-md ${
            !loaded ? "animate-pulse" : ""
          } `}
          loading="lazy"
          src={meIMG}
          alt="Ellena pictured in a brightly-lit area and she is smiling. She is a thin girl with shoulder-length brown hair, gray eyes, and glasses."
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="page-bottom">
        <div className="flex-container">
          <h3 className="sub-title text-2xl text-(--detail-color-2)">RESUME</h3>
          <iframe
            className="aspect-4/3 w-[100%] rounded-xl border-4 border-(--detail-color-2)"
            loading="lazy"
            src="https://wakandacat.github.io/resume/TzavelasEllenaPostGradResume.pdf"
          ></iframe>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
