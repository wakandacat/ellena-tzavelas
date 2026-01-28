import { useEffect, useState, useRef } from "react";

function ProjectFilter({ handleFilterChange }) {
  //local keyword
  const [currKeyword, setCurrKeyword] = useState("All");
  const [filterOptions, setFilterOptions] = useState(["All"]);
  const [mobileView, setMobileView] = useState(false); //flag for if we're in mobile view

  let jsonFile = "./projectInfo.json";

  const handleChangeFilter = (clickedWord) => {
    setCurrKeyword(clickedWord);

    //update the parents state
    handleFilterChange(clickedWord);
    //update the theme in localstorage
    localStorage.setItem("filter", clickedWord);

    // force scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //check for all keywords from project json file
  useEffect(() => {
    fetch(jsonFile)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        //grab everything from the Filters sections of the projects
        const uniqueFilters = new Set(["All"]);

        data["Projects"].forEach((project) => {
          project.Filters.forEach((filter) => uniqueFilters.add(filter));
        });

        setFilterOptions([...uniqueFilters]);
      })
      .catch((error) => console.error("Unable to fetch data:", error));

    //check localstorage for saved filter
    const savedFilter = localStorage.getItem("filter") || "All";

    setCurrKeyword(savedFilter);
    handleFilterChange(savedFilter);
  }, []);

  //ensure the mobile menu is closed when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      //close the menu
      if (window.innerWidth >= 1024) {
        //greater than md breakpoint
        setMobileView(false);
      } else {
        setMobileView(true);
      }
    };

    // add event listener
    window.addEventListener("resize", handleResize);
    //run once initially
    handleResize();

    // cleanup on dismount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="section-padding-x fixed top-16 z-40 flex w-full flex-row items-center gap-4 bg-(--detail-color-light) py-4 shadow-sm">
        <div className="relative">
          <div className="text-base whitespace-nowrap text-(--nav-color)">
            {mobileView ? <p>&#x25C0;</p> : <p>Filter by:</p>}
          </div>
        </div>
        <div
          // ensure that the scrollbar is hidden
          className={`flex w-full flex-row items-center justify-start gap-4 overflow-x-auto pr-10 ${mobileView ? "bg-(--nav-color)" : "bg-(--detail-color-light)"} overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {filterOptions.map((word) => (
            <button
              key={word}
              onClick={() => handleChangeFilter(word)}
              className={`filter-button rounded-full border-2 px-5 py-2 font-medium whitespace-nowrap transition-all ${currKeyword === word ? "filter-active" : ""} `}
              aria-label={`Filter by ${word}`}
              aria-pressed={currKeyword === word}
            >
              {word}
            </button>
          ))}
          <div className="section-padding-x absolute right-0 bg-(--detail-color-light) py-6 !pl-4 text-end text-(--nav-color)">
            {mobileView && <p>&#x25B6;</p>}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectFilter;
