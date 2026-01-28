import { useEffect, useState, useRef, useCallback } from "react";
import ImageProvider from "../components/ImageProvider";
import ProjectFilter from "../components/ProjectFilter";

function ProjectPage() {
  const [jsonData, setJsonData] = useState(null); //the entire json data read in from projectInfo.json
  const [arrProjsPageBottom, setArrProjsPageBottom] = useState([]); // jsx objects of each project shown at the bottom of the page
  const [currImageIndex, setCurrImageIndex] = useState(0); //the index of an image corresponding to a single project's images (ex. Hangman proj has 3 images --> indeces 0,1,2)
  const [currentImageIsVideo, setCurrentImageIsVideo] = useState(false); //boolean to determine whether current project image should be rendered as <img> or <video>
  const [loaded, setLoaded] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  //backups if json data hasn't loaded yet
  const defaultIMG = ImageProvider["me5.jpg"];
  const defaultALT =
    "Welcome to my portfolio! This is a collection of projects I made for fun or associated with school assignments. I plan to keep adding to it as I create more cool projects!";
  const defaultTITLE = "Projects";
  const defaultDESC =
    "Ellena sitting and reading intently among the clouds. Created as an assignment for my first year visual processes course to introduce ourselves.";

  //filters from ProjectFilter component
  const [currentFilter, setCurrentFilter] = useState("All");

  //create a callback function that can be passed to ProjectFilter to update the current filter
  const handleFilterChange = useCallback(
    (newFilter) => {
      setCurrentFilter(newFilter);
    },
    [currentFilter],
  );

  const [currentProject, setCurrentProject] = useState({
    Title: "",
    Desc: "",
    Image: [{ image: "", alt: "" }],
    Year: "",
    LiveURL: "",
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
      })
      .catch((error) => console.error("Unable to fetch data:", error));

    //check localstorage for saved filter

    let savedFilter = "All";

    //check localstorage for saved filter
    if (localStorage.getItem("filter")) {
      savedFilter = localStorage.getItem("filter");
    }
    setCurrentFilter(savedFilter);
  }, []);

  //creating the list of all projects page bottom + update the projects when the filter changes
  useEffect(() => {
    if (jsonData !== null) {
      //take into account the filter
      const filteredProjects =
        currentFilter === "All"
          ? jsonData["Projects"]
          : jsonData["Projects"].filter((project) =>
              project.Filters.includes(currentFilter),
            );

      // Map over the array and create JSX elements using index from map function
      const tempArrProjsPageBottom = filteredProjects.map((element, index) => (
        <button
          className="proj-button group/project"
          key={index}
          value={JSON.stringify(element)}
          onClick={(event) => handleClick(element, event.currentTarget)}
        >
          <h3 className="proj-title font-bold uppercase">{element.Title}</h3>
          <img
            className="proj-image"
            loading="lazy"
            src={ImageProvider[element.Image[0].img]}
            alt={element.Image[0].alt}
          />
        </button>
      ));

      // Update the state with the new array of JSX elements
      setArrProjsPageBottom(tempArrProjsPageBottom);

      //always select the first project in the filtered list
      if (filteredProjects.length > 0) {
        // ensure the buttons are rendered first
        setTimeout(() => {
          const container = document.querySelector(".main-container");
          if (container) {
            const firstButton = container.children[0];
            if (firstButton) {
              handleClick(filteredProjects[0], firstButton);
            }
          }
        }, 0);
      }
    }
  }, [jsonData, currentFilter]);

  useEffect(() => {
    //ensure the index is reset
    setCurrImageIndex(0);
  }, [currentProject]);

  //change project view on button click
  const handleClick = (element, clickedButton) => {
    setLoaded(false); //allow the loading state to reappear
    let buttons = document.querySelector(".main-container").children;

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("proj-selected");
    }

    //show selected project differently
    clickedButton.classList.add("proj-selected");

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
      LiveURL: element.LiveURL,
    });

    setCurrImageIndex(0);
    setCurrentImageIsVideo(false);
  };

  //change project view on button click with cycling
  const handleCycle = (num) => {
    setLoaded(false); //allow the loading state to reappear

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

  return (
    <main>
      {/* Overlay for enlarging images */}
      <div
        id="overlay"
        className={`fixed top-0 left-0 z-5000 ${overlayVisible ? "flex" : "hidden"} h-[100vh] w-[100%] cursor-zoom-out items-center justify-center bg-black/80`}
        onClick={() => setOverlayVisible(false)}
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
          <a href={currentProject.LiveURL || ""} target="_blank">
            {currentProject.LiveURL || ""}
            <span className="sr-only">
              Visit an external resource that is either the live project or the
              codebase.
            </span>
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
            aria-label="Previous image."
          >
            <h3>&#9664;</h3>
          </button>

          <div className="proj-image-container flex flex-col">
            {/* conditionally render image or video */}
            {currentImageIsVideo ? (
              <video
                // className={`main-proj-image ${!loaded ? "animate-pulse" : ""}`}
                className="main-proj-image"
                src={currentProject.Image[currImageIndex].image || defaultIMG}
                alt={currentProject.Image[currImageIndex].alt || defaultALT}
                autoPlay
                loop
                muted
                onLoad={() => setLoaded(true)}
                onClick={() => setOverlayVisible(true)}
              />
            ) : (
              <img
                // className={`main-proj-image ${!loaded ? "animate-pulse" : ""}`}
                className="main-proj-image"
                src={currentProject.Image[currImageIndex].image || defaultIMG}
                alt={currentProject.Image[currImageIndex].alt || defaultALT}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onClick={() => setOverlayVisible(true)}
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
            aria-label="Next image."
          >
            <h3>&#9654;</h3>
          </button>
        </div>
      </div>
      <div className="triangle-clip h-[25px] w-[100%] bg-(--background-color)"></div>
      <div className="page-bottom">
        <ProjectFilter
          currentFilter={currentFilter}
          handleFilterChange={handleFilterChange}
        />
        <div className="flex-container main-container">
          {arrProjsPageBottom}
        </div>
      </div>
    </main>
  );
}

export default ProjectPage;
