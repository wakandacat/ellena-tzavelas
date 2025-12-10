import { useEffect, useState, useRef } from "react";

function ProjectFilter({ handleFilterChange }) {
  //local keyword
  const [currKeyword, setCurrKeyword] = useState("All");

  let jsonFile = "./projectInfo.json";

  const [filterOptions, setFilterOptions] = useState(["All"]);
  const [isOpen, setIsOpen] = useState(0);
  const [dropdownOps, setDropdownOps] = useState([]);
  const dropdownRef = useRef(null); //grab a reference to the dropdown to close it when the user clicks away

  //change modes manually with the button
  const handleClick = () => {
    setIsOpen(true); //toggle the open state
  };

  const handleChangeTheme = (clickedWord) => {
    setIsOpen(false); //close
    setCurrKeyword(clickedWord);

    //update the parents state
    handleFilterChange(clickedWord);
    //update the theme in localstorage
    localStorage.setItem("filter", clickedWord);
  };

  //everytime the options or current options update, recreate the dropdown options
  useEffect(() => {
    const newOps = filterOptions
      .filter((word) => word !== currKeyword)
      .map((word) => (
        <button
          className="nav-button flex justify-center rounded-xl border-0 bg-(--background-color-3) text-white uppercase"
          onClick={() => handleChangeTheme(word)}
          key={word}
          aria-label={`${word} filter`}
        >
          <h5 className="px-4">{word}</h5>
        </button>
      ));
    setDropdownOps(newOps);
  }, [currKeyword, filterOptions]);

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

    let savedFilter = "All";

    //check localstorage for saved filter
    if (localStorage.getItem("filter")) {
      savedFilter = localStorage.getItem("filter");
    }

    setCurrKeyword(savedFilter);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      // close the dropdown if the user clicks outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // attach listener when mounted
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        className="nav-button flex rounded-xl border-0 bg-(--background-color-3) text-white uppercase"
        onClick={handleClick}
        value={currKeyword}
        aria-label={``}
      >
        <h5 className="px-4">{currKeyword}</h5>
        {isOpen ? <p>&#x25BC;</p> : <p>&#x25B6;</p>}
      </button>
      {isOpen ? (
        <aside>
          <div
            className="pointer-events-auto absolute z-[1000] flex flex-col rounded-xl border-2 bg-(--background-color-3) uppercase"
            ref={dropdownRef}
          >
            {dropdownOps}
          </div>
        </aside>
      ) : (
        ""
      )}
    </>
  );
}

export default ProjectFilter;
