import Banner from "../components/Banner";
import Card from "../components/Card";
import About from "./About";
import Skills from "../components/Skills";
import FeaturedProjects from "../components/FeaturedProjects";

function HomePage() {
  return (
    <main>
      <Banner />
      <About />
      <Skills />
      <FeaturedProjects />
    </main>
  );
}

export default HomePage;
