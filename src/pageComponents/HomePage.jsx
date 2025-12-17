import Banner from "../components/Banner";
import Card from "../components/Card";

function HomePage() {
  const currYear = new Date().getFullYear();

  return (
    <main>
      <Banner />
      <Card
        class={"even-card"}
        title={"HELLO!"}
        subtitle={
          "Welcome to my portfolio! This is a collection of projects I have compiled to showcase my skills. As a lifelong learner, new projects are always in the works!"
        }
        image={"me5.jpg"}
        alt={
          "Ellena sitting and reading intently among the clouds. Created as an assignment for my first year visual processes course to introduce ourselves."
        }
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
