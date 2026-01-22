import Banner from "../components/Banner";
import Card from "../components/Card";
import AboutPage from "./AboutPage";

function HomePage() {
  const currYear = new Date().getFullYear();

  return (
    <main>
      <Banner />
      <AboutPage />
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
        title={"ABOUT"}
        subtitle={"ELLENA TZAVELAS"}
        image={"me3.png"}
        alt={
          "Headshot of Ellena, a girl with short brown hair, blue eyes and glasses. She is smiling."
        }
        buttonVal={"About"}
        aria-label="Travel to the About page."
      />
    </main>
  );
}

export default HomePage;
