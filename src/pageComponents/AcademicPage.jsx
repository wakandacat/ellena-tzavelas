import React, { useEffect, useState, useRef } from "react";
import '../styles/Cards.css';
import '../styles/ProjectPages.css';

function AcademicPage() {

    const [jsonData, setJsonData] = useState(null);
    const [projArr, setProjArr] = useState([]); // Store the rendered JSX elements

    //top page elements
    const projTitle = useRef();
    const projYear= useRef();
    const projBlurb = useRef();
    const projImage = useRef();

    var jsonFile = '/projectInfo.json';

    //check internal computer theme state
    useEffect(() => {
        fetch(jsonFile)
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
        setJsonData(data);
        })
        .catch((error) => 
        console.error("Unable to fetch data:", error));

    }, []);

    useEffect(() => {
        if (jsonData !== null) {

            // Map over the Academic array and create JSX elements using index from map function
            const newProjArr = jsonData['Academic'].map((element, index) => (
                <button className="proj-button" key={index} value={JSON.stringify(element)} onClick={() => handleClick(element, event)}>
                    <div className="project">
                        <h2 className="proj-title">{element.Title.toUpperCase()}</h2>
                        <img className="proj-image" src={`src/assets/${element.Image}`}/>
                    </div>
                </button>
            ));

            // Update the state with the new array of JSX elements
            setProjArr(newProjArr);
        }

    }, [jsonData]);


    //change project view on button click
    const handleClick = (element, event) => {
        event.target.focus();
        //force page to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        //update the top page card with the project info
        projTitle.current.textContent = element.Title.toUpperCase();
        projYear.current.textContent = element.Year;
        projBlurb.current.textContent = element.Desc;
        projImage.current.src = `src/assets/${element.Image}`;
    }

    return (
        <>
            <div className="page-top card">
                <div className="flex-container">
                    <h1 ref={projTitle} className="title">ACADEMIC PROJECTS</h1>
                    <h2 ref={projYear} className="sub-title">Carleton University // Algonquin College</h2>
                    <h3 ref={projBlurb} className="blurb">these are my projects from school yall</h3>
                </div>
                <img ref={projImage} src='src\assets\cat.jpg'/>
            </div>
            <div className="page-bottom card">
                <div className="flex-container main-container">
                {projArr}
                </div>
            </div>
        </>
    );
}

export default AcademicPage;