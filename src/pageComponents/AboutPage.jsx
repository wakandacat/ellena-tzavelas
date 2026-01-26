import meIMG from "../assets/me4.jpg";
import { useState } from "react";

function AboutPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="about"
      className="section-padding flex flex-col justify-between gap-10 bg-(--background-color) lg:flex-row lg:items-start lg:gap-20"
    >
      <div className="flex flex-col items-start gap-6 lg:max-w-3xl lg:flex-1">
        <h2 className="heading">About Me</h2>
        <p className="body-text">
          Hi! I’m Ellena, a frontend developer and designer passionate about
          creating responsive, user-focused web applications. I specialize in
          React, modern CSS, and web accessibility to build engaging experiences
          that look good and feel better.{" "}
        </p>
        <p className="body-text">
          I graduated from Carleton’s Interactive Multimedia and Design program
          with a Bachelor’s in IT, where I discovered the fascinating
          intersection of art and technology. I’m driven by my love of helping
          people, and I believe good design should be for everyone.{" "}
        </p>
        <p className="body-text">
          In my spare time, I enjoy playing video games, reading sci-fi fantasy,
          gardening and cooking.
        </p>
      </div>
      <div className="flex w-full flex-col items-center lg:w-80 lg:flex-shrink-0 xl:w-96">
        <img
          className="aspect-square w-64 rounded-xl border-4 border-(--detail-color-2) object-cover md:w-80 lg:w-full lg:min-w-80 xl:min-w-96"
          loading="lazy"
          src={meIMG}
          alt="Ellena pictured in a brightly-lit area and she is smiling. She is a thin girl with shoulder-length brown hair, gray eyes, and glasses."
        />
        <a
          href="https://wakandacat.github.io/resume/TzavelasEllenaPostGradResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="page-button"
        >
          View Resume
        </a>
      </div>
    </section>
  );
}

export default AboutPage;
