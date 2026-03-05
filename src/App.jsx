import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pageComponents/HomePage";
import ProjectPage from "./pageComponents/ProjectPage";
import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  //loading spinner management
  useEffect(() => {
    const loader = document.getElementById("loading-screen");
    if (!loader) return;

    //set a timeout so everyone sees the loader
    setTimeout(() => {
      loader.classList.add("hidden");

      // remove loader html after load
      loader.addEventListener("transitionend", () => loader.remove());
    }, 1000);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        {/* Default route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
