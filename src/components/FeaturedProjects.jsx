import Card from "../components/Card";

function FeaturedProjects() {
  const currYear = new Date().getFullYear();

  const numProjects = 3;

  return (
    <section id="projects" className="section-padding bg-(--background-color)">
      <h2 className="heading">Featured Projects</h2>
      <Card
        class={"odd-card"}
        title={"PROJECTS"}
        subtitle={`2020 - ${currYear}`}
        image={"octranspo2.jpg"}
        alt={
          "Persona 3 computer background screenshot displaying date and time."
        }
        buttonVal={"Project"}
        aria-label="Travel to the Projects page."
      />
      <Card
        class={"even-card"}
        title={"PROJECTS"}
        subtitle={`2020 - ${currYear}`}
        image={"octranspo2.jpg"}
        alt={
          "Persona 3 computer background screenshot displaying date and time."
        }
        buttonVal={"Project"}
        aria-label="Travel to the Projects page."
      />
      <Card
        class={"odd-card"}
        title={"PROJECTS"}
        subtitle={`2020 - ${currYear}`}
        image={"octranspo2.jpg"}
        alt={
          "Persona 3 computer background screenshot displaying date and time."
        }
        buttonVal={"Project"}
        aria-label="Travel to the Projects page."
      />
    </section>
  );
}

export default FeaturedProjects;
