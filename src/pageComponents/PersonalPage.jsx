import React, { useEffect, useState, useRef } from "react";
import '../styles/Cards.css';
import '../styles/ProjectPages.css';

function PersonalPage() {

    const [jsonData, setJsonData] = useState(null);
    const [projArr, setProjArr] = useState([]); // Store the rendered JSX elements
    const [currProjImage, setCurrProjImage] = useState(0);

    const currYear = new Date().getFullYear();

    //top page elements
    const projTitle = useRef();
    const projYear= useRef();
    const projBlurb = useRef();
    const projImage = useRef();
    const projAlt = useRef();
    const projImageArr = useRef();
    const projImageArr2 = useRef();

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
            const newProjArr = jsonData['Projects'].map((element, index) => (
                <button className="proj-button" key={index} value={JSON.stringify(element)} onClick={() => handleClick(element, event)}>
                    <h2 className="proj-title">{element.Title.toUpperCase()}</h2>
                    <img className="proj-image" src={`src/assets/${element.Image[0].img}`}/>
                </button>
            ));

            // Update the state with the new array of JSX elements
            setProjArr(newProjArr);
        }

    }, [jsonData]);


    //change project view on button click
    const handleClick = (element, event) => {
        
        let buttons = document.querySelector(".main-container").children;

        for(let i=0;i<buttons.length;i++){
            buttons[i].classList.remove("proj-selected");
        }

        //show selected project differently
        event.target.classList.add("proj-selected");
        
        //force page to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        //add the arrow buttons and alt text
        projImageArr.current.style.visibility = "visible";
        projImageArr2.current.style.visibility = "visible";
        projAlt.current.style.visibility = "visible";

        //update the top page card with the project info
        projTitle.current.textContent = element.Title.toUpperCase();
        projYear.current.textContent = element.Year;
        projBlurb.current.textContent = element.Desc;
        projImage.current.src = `src/assets/${element.Image[0].img}`;
        projAlt.current.textContent = element.Image[0].alt;
        projImageArr.current.value = JSON.stringify(element.Image);
        projImageArr2.current.value = JSON.stringify(element.Image);
        setCurrProjImage(0);
    }

    //change project view on button click with cycling
    const handleCycle = (num) => {
        let ImageArr = JSON.parse(projImageArr.current.value);
        let newIndex = 0;
        if(num === 0){
            newIndex = currProjImage - 1;
            if(newIndex < 0){
                newIndex = ImageArr.length - 1;
            }
        } else {
            newIndex = currProjImage + 1;
            newIndex = newIndex%ImageArr.length;
        }
        
        setCurrProjImage(newIndex);
    }

    //update the project image and alt text when arrow buttons clicked
    useEffect(() => {
        if (jsonData !== null) {
            let ImageArr = JSON.parse(projImageArr.current.value);
            //update the image
            projImage.current.src = `src/assets/${ImageArr[currProjImage].img}`;
            projAlt.current.textContent = ImageArr[currProjImage].alt;
        }
    }, [currProjImage]);

    return (
        <>
            <div className="page-top card">
                <div className="flex-container">
                    <h1 ref={projTitle} className="title">PROJECTS</h1>
                    <h2 ref={projYear} className="sub-title">2020-{currYear}</h2>
                    <h3 ref={projBlurb} className="blurb">A collection of projects I made for fun or associated with school assignments.</h3>
                </div>
                <div className="proj-image-container">
                    <div id="cycle-image">
                        <button className="arrow-button" ref={projImageArr} value={0} onClick={() => handleCycle(0)}><p>&#9664;</p></button>
                        <img id="projIMG" ref={projImage} src='src\assets\cat.jpg'/>
                        <button className="arrow-button" ref={projImageArr2} value={0} onClick={() => handleCycle(1)}><p>&#9658;</p></button>
                    </div>    
                    <h5 ref={projAlt} id="alt-text">hey guys this is a cat from google images</h5>
                </div>
            </div>
            <div id="tri-design"></div>
            <div className="page-bottom card">
                <div className="flex-container main-container">
                {projArr}
                </div>
            </div>
        </>
    );
}

export default PersonalPage;