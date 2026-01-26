import Banner from "../components/Banner";
import Card from "../components/Card";
import AboutPage from "./AboutPage";
import Skills from "../components/Skills";
import FeaturedProjects from "../components/FeaturedProjects";

function HomePage() {
  return (
    <main>
      <Banner />
      <AboutPage />
      <Skills />
      <FeaturedProjects />
    </main>
  );
}

export default HomePage;
