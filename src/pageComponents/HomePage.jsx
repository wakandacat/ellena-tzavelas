import Banner from "../components/Banner";
import Card from "../components/Card";
import AboutPage from "./AboutPage";
import Skills from "../components/Skills";

function HomePage() {
  const currYear = new Date().getFullYear();

  return (
    <main>
      <Banner />
      <AboutPage />
      <Skills />
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
    </main>
  );
}

export default HomePage;
