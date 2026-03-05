import Card from "../components/Card";
import { useEffect, useState, useContext } from "react";

function FeaturedProjects() {
  const currYear = new Date().getFullYear();
  const [projects, setProjects] = useState([]);

  //grab the featured project data
  useEffect(() => {
    // Fetch projects data
    fetch("./projectInfo.json")
      .then((res) => res.json())
      .then((data) => {
        // only grab the ones where Featured = true
        const featured = data.Projects.filter((p) => p.Featured);

        setProjects(featured);
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  return (
    <section
      id="projects"
      className="section-padding-x section-padding-y flex flex-col items-center gap-6 bg-(--background-color)"
    >
      <h2 className="heading">Featured Projects</h2>

      <div className="flex flex-col items-center justify-center gap-6">
        {projects.map((project, index) => (
          <Card
            class={index % 2 === 1 ? "odd-card" : "even-card"}
            title={project.Title}
            key={project.Title}
            blurb={project.ShortDesc}
            image={project.Image[0].img}
            alt={project.Image[0].alt}
            liveButtonVal={project.LiveURL}
            codeButtonVal={project.GithubURL}
            skills={project.Skills}
          />
        ))}
      </div>

      <button
        className="page-button flex justify-center rounded-xl border-0 bg-(--nav-color) capitalize"
        onClick={() => {
          setGlobalState((prevState) => ({
            ...prevState,
            currentPage: "Project",
          }));
        }}
        aria-label={"Go to the All Projects page"}
      >
        <h5 className="px-4 whitespace-nowrap">View All Projects &#8594;</h5>
      </button>
    </section>
  );
}

export default FeaturedProjects;
