import { useEffect, useState, useRef, useCallback } from "react";
import ImageProvider from "../components/ImageProvider";
import ProjectFilter from "../components/ProjectFilter";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function ProjectPage() {
  const [jsonData, setJsonData] = useState(null); //the entire json data read in from projectInfo.json
  const [currImageIndex, setCurrImageIndex] = useState(0); //the index of an image corresponding to a single project's images (ex. Hangman proj has 3 images --> indeces 0,1,2)
  const [currentImageIsVideo, setCurrentImageIsVideo] = useState(false); //boolean to determine whether current project image should be rendered as <img> or <video>

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [currentFilter, setCurrentFilter] = useState("All"); //filters from ProjectFilter component
  const [currentProject, setCurrentProject] = useState(null);

  const currYear = new Date().getFullYear();
  const jsonFile = "./projectInfo.json";

  //create a callback function that can be passed to ProjectFilter to update the current filter
  const handleFilterChange = useCallback((newFilter) => {
    setCurrentFilter(newFilter);
  }, []);

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
    const savedFilter = localStorage.getItem("filter") || "All";
    setCurrentFilter(savedFilter);
  }, []);

  //update the projects when the data or filter changes
  useEffect(() => {
    if (jsonData !== null) {
      //take into account the filter
      const filteredProjects =
        currentFilter === "All"
          ? jsonData["Projects"]
          : jsonData["Projects"].filter((project) =>
              project.Filters.includes(currentFilter),
            );

      setFilteredProjects(filteredProjects);

      //set current project to the first in the filtered list
      const firstProject = filteredProjects[0];

      //map images with ImageProvider
      const images = firstProject.Image.map((img) => ({
        img: ImageProvider[img.img],
        alt: img.alt,
        isVideo: img.img.endsWith(".mp4"),
      }));

      setCurrentProject({
        ...firstProject,
        Image: images,
      });
    }
  }, [jsonData, currentFilter]);

  useEffect(() => {
    //ensure the index is reset
    setCurrImageIndex(0);
  }, [currentProject]);

  //change project view on button click
  const handleProjectClick = (project) => {
    // map images to include ImageProvider
    const images = project.Image.map((img) => ({
      img: ImageProvider[img.img],
      alt: img.alt,
      isVideo: img.img.endsWith(".mp4"),
    }));

    setCurrentProject({
      Title: project.Title,
      Desc: project.Desc,
      Image: images,
      Year: project.Year,
      LiveURL: project.LiveURL,
      GithubURL: project.GithubURL,
      Skills: project.Skills || [],
    });

    setCurrImageIndex(0);
    setCurrentImageIsVideo(images[0].isVideo);

    // force scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // loading state on every render in case we have no data
  if (!jsonData || !currentProject) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-2xl text-gray-500">Loading projects...</div>
      </main>
    );
  }

  return (
    <main>
      {/* overlay when image is clicked */}
      <div
        id="overlay"
        className={`fixed top-0 left-0 z-5000 ${overlayVisible ? "flex" : "hidden"} h-[100vh] w-[100%] cursor-pointer flex-col items-center justify-center gap-6 bg-black/80 p-8`}
      >
        <div className="flex w-full justify-end px-4">
          <FontAwesomeIcon
            className="button-transition filter-button px-2 py-1 text-6xl hover:text-(--detail-color)"
            icon={faX}
            onClick={() => setOverlayVisible(false)}
          />
        </div>

        {currentProject.Image[currImageIndex].isVideo ? (
          <video
            className="full-image"
            src={currentProject.Image[currImageIndex].img}
            alt={currentProject.Image[currImageIndex].alt}
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            className="full-image"
            src={currentProject.Image[currImageIndex].img}
            alt={currentProject.Image[currImageIndex].alt}
            loading="lazy"
          />
        )}
        <div>
          <p className="px-12 text-lg text-white">
            {currentProject.Image[currImageIndex].alt}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <ProjectFilter
        currentFilter={currentFilter}
        handleFilterChange={handleFilterChange}
      />

      {/* featured project that is large at the top of the page */}
      <section
        id="project-large"
        className="section-padding-x section-padding-y mt-20 flex flex-col items-center gap-6 bg-(--background-color)"
      >
        <h2 className="heading">Featured Project</h2>

        <div className="base-card flex-col lg:flex-row">
          <div className="flex flex-1 flex-col items-center gap-4 md:items-start">
            <h3 className="sub-heading">{currentProject.Title}</h3>
            <p className="">{currentProject.Year}</p>
            <p className="body-text">{currentProject.Desc}</p>
            <div className="flex flex-wrap gap-4">
              {currentProject.Skills.map((skill) => (
                <p className="skill-pill" key={skill}>
                  {skill}
                </p>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                id="liveLink"
                href={currentProject.LiveURL}
                target="_blank"
                rel="noopener noreferrer"
                className="page-button"
                aria-label="Travel to the Live Application of the Project"
              >
                <h5 className="px-4 whitespace-nowrap">Live App</h5>
              </a>
              {currentProject.GithubURL !== "" ? (
                <a
                  id="codeLink"
                  href={currentProject.GithubURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="page-button"
                  aria-label="Travel to the Code Repository of the Project"
                >
                  <h5 className="px-4 whitespace-nowrap">View Code</h5>
                </a>
              ) : null}
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
            {currentProject.Image.map((imageObj, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer overflow-hidden rounded-lg border-2 border-(--detail-color-2) transition-all hover:scale-105"
                  onClick={() => {
                    setCurrImageIndex(index);
                    setOverlayVisible(true);
                  }}
                >
                  {imageObj.isVideo ? (
                    <video
                      className="aspect-video w-full object-cover"
                      src={imageObj.img}
                      alt={imageObj.alt}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      className="aspect-video w-full object-cover"
                      src={imageObj.img}
                      alt={imageObj.alt}
                      loading="lazy"
                    />
                  )}

                  <div className="p-3">
                    <p className="line-clamp-2">{imageObj.alt}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* all other projects (filtered) below */}
      <section className="section-padding-x section-padding-y flex flex-col gap-8 bg-(--background-color-2)">
        <h3 className="heading">All Projects ({filteredProjects.length})</h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <button
              key={index}
              onClick={() => handleProjectClick(project)}
              className={`cursor-pointer overflow-hidden rounded-lg border-4 border-(--detail-color-2) bg-white text-left text-(--nav-color) transition-all hover:scale-105 ${
                project.Title === currentProject.Title
                  ? "!border-(--detail-color) !text-(--detail-color)"
                  : ""
              } `}
            >
              {/*project image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={ImageProvider[project.Image[0].img]}
                  alt={project.Image[0].alt}
                />
              </div>

              {/* project info */}
              <div className="flex flex-col gap-1 p-6">
                <h4 className="text---text-color) body-text font-bold">
                  {project.Title}
                </h4>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {project.ShortDesc}
                </p>
                <p className="text-xs text-gray-500">{project.Year}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProjectPage;
