import { useEffect, useState, useRef } from "react";
import ImageProvider from "../components/ImageProvider";

function ProjectPage() {
  const [jsonData, setJsonData] = useState(null); //the entire json data read in from projectInfo.json
  const [arrProjsPageBottom, setArrProjsPageBottom] = useState([]); // jsx objects of each project shown at the bottom of the page
  const [currImageIndex, setCurrImageIndex] = useState(0); //the index of an image corresponding to a single project's images (ex. Hangman proj has 3 images --> indeces 0,1,2)
  const [currentImageIsVideo, setCurrentImageIsVideo] = useState(false); //boolean to determine whether current project image should be rendered as <img> or <video>
  const [defaultIMG, setDefaultIMG] = useState(null);
  const [defaultALT, setDefaultALT] = useState("");
  const [defaultTITLE, setDefaultTITLE] = useState("");
  const [defaultDESC, setDefaultDESC] = useState("");

  const [currentProject, setCurrentProject] = useState({
    Title: "",
    Desc: "",
    Image: [{ image: "", alt: "" }],
    Year: "",
    Res: "",
  }); // a project object

  const arrowLeft = useRef();
  const arrowRight = useRef();

  const currYear = new Date().getFullYear();

  let jsonFile = "./projectInfo.json";

  //initial setup
  useEffect(() => {
    fetch(jsonFile)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setJsonData(data);

        setDefaultIMG(ImageProvider[data.DefaultProject.Image.img]);
        setDefaultALT(data.DefaultProject.Image.alt);
        setDefaultTITLE(data.DefaultProject.Title);
        setDefaultDESC(data.DefaultProject.Desc);

        let images = [];

        images.push({
          image: defaultIMG,
          alt: defaultALT,
        });

        setCurrentProject({
          Title: defaultTITLE,
          Desc: defaultDESC,
          Image: images,
          Year: "",
          Res: "",
        });

        setCurrentImageIsVideo(false);
      })
      .catch((error) => console.error("Unable to fetch data:", error));
  }, []);

  //creating the list of all projects page bottom
  useEffect(() => {
    if (jsonData !== null) {
      // Map over the array and create JSX elements using index from map function
      const tempArrProjsPageBottom = jsonData["Projects"].map(
        (element, index) => (
          <button
            className="proj-button group/project"
            key={index}
            value={JSON.stringify(element)}
            onClick={() => handleClick(element, event)}
          >
            <h3 className="proj-title font-bold uppercase">{element.Title}</h3>
            <img
              className="proj-image"
              loading="lazy"
              src={ImageProvider[element.Image[0].img]}
            />
          </button>
        ),
      );

      // Update the state with the new array of JSX elements
      setArrProjsPageBottom(tempArrProjsPageBottom);
    }
  }, [jsonData]);

  useEffect(() => {
    //ensure the index is reset
    setCurrImageIndex(0);
  }, [currentProject]);

  //change project view on button click
  const handleClick = (element, event) => {
    let buttons = document.querySelector(".main-container").children;

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("proj-selected");
    }

    //show selected project differently
    event.target.classList.add("proj-selected");

    //force page to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    if (element.Image.length > 1) {
      //add the arrow buttons
      arrowLeft.current.style.visibility = "visible";
      arrowRight.current.style.visibility = "visible";
    } else {
      //hide the arrow buttons
      arrowLeft.current.style.visibility = "hidden";
      arrowRight.current.style.visibility = "hidden";
    }

    let images = [];

    for (let i = 0; i < element.Image.length; i++) {
      images.push({
        image: ImageProvider[element.Image[i].img],
        alt: element.Image[i].alt,
      });
    }

    setCurrentProject({
      Title: element.Title,
      Desc: element.Desc,
      Image: images,
      Year: element.Year,
      Res: element.Res,
    });

    setCurrImageIndex(0);
    setCurrentImageIsVideo(false);
  };

  //change project view on button click with cycling
  const handleCycle = (num) => {
    let newIndex = 0;
    if (num === 0) {
      newIndex = currImageIndex - 1;
      if (newIndex < 0) {
        newIndex = currentProject.Image.length - 1;
      }
    } else {
      newIndex = currImageIndex + 1;
      newIndex = newIndex % currentProject.Image.length;
    }

    if (currentProject.Image[newIndex].image.endsWith(".mp4")) {
      setCurrentImageIsVideo(true);
    } else {
      setCurrentImageIsVideo(false);
    }

    setCurrImageIndex(newIndex);
  };

  //jquery for image overlay
  $(document).ready(function () {
    $(".main-proj-image").click(function () {
      $("#overlay").css("display", "flex");
    });

    $("#overlay").click(function () {
      $("#overlay").css("display", "none");
    });
  });

  return (
    <main>
      {/* Overlay for enlarging images */}
      <div
        id="overlay"
        className="fixed top-0 left-0 z-5000 hidden h-[100vh] w-[100%] cursor-zoom-out items-center justify-center bg-black/80"
      >
        {currentImageIsVideo ? (
          <video
            className="full-image"
            src={currentProject.Image[currImageIndex].image || defaultIMG}
            alt={currentProject.Image[currImageIndex].alt || defaultALT}
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            className="full-image"
            src={currentProject.Image[currImageIndex].image || defaultIMG}
            alt={currentProject.Image[currImageIndex].alt || defaultALT}
            loading="lazy"
          />
        )}
      </div>
      <div className="page-top">
        <div className="flex-container">
          <h2 className="title font-bold text-(--detail-color) uppercase">
            {currentProject.Title || defaultTITLE}
          </h2>
          <h3 className="sub-title text-(--detail-color-2)">
            {currentProject.Year || `2020 - ${currYear}`}
          </h3>
          <a href={currentProject.Res || ""} target="_blank">
            {currentProject.Res || ""}
          </a>
          <h4 className="blurb leading-tight">
            {currentProject.Desc || defaultDESC}
          </h4>
        </div>
        {/* extra flex div to keep the arrows beside the image when responsive */}
        <div className="proj-image-container flex flex-row">
          <button
            className="arrow-button"
            ref={arrowLeft}
            value={0}
            onClick={() => handleCycle(0)}
          >
            <h3>&#9664;</h3>
          </button>

          <div className="proj-image-container flex flex-col">
            {/* conditionally render image or video */}
            {currentImageIsVideo ? (
              <video
                className="main-proj-image"
                src={currentProject.Image[currImageIndex].image || defaultIMG}
                alt={currentProject.Image[currImageIndex].alt || defaultALT}
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                className="main-proj-image"
                src={currentProject.Image[currImageIndex].image || defaultIMG}
                alt={currentProject.Image[currImageIndex].alt || defaultALT}
                loading="lazy"
              />
            )}

            <h5 className="m-2 w-[75%] self-center text-xs leading-tight text-(--text-color) md:text-sm">
              {currentProject.Image[currImageIndex].alt || defaultALT}
            </h5>
          </div>
          <button
            className="arrow-button"
            ref={arrowRight}
            value={0}
            onClick={() => handleCycle(1)}
          >
            <h3>&#9654;</h3>
          </button>
        </div>
      </div>
      <div className="triangle-clip h-[25px] w-[100%] bg-(--background-color)"></div>
      <div className="page-bottom">
        <div className="flex-container main-container">
          {arrProjsPageBottom}
        </div>
      </div>
    </main>
  );
}

export default ProjectPage;
