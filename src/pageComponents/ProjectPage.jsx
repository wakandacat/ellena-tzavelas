import { useEffect, useState, useRef } from "react";
import ImageProvider from "../components/ImageProvider";
import defaultIMG from '../assets/me5.jpg';

//saving this page while the default image is displayed while cause an error because default image does not have a currProjIndex (its not in the array with the other images)

function ProjectPage() {

    const [jsonData, setJsonData] = useState(null);
    const [projArr, setProjArr] = useState([]); // Store the rendered JSX elements
    const [currProjIndex, setCurrProjIndex] = useState(0);
    const [currRes, setCurrRes] = useState("");
    const [currProjImage, setCurrProjImage] = useState({ src: '', alt: '' , isVideo: false });

    const currYear = new Date().getFullYear();

    //top page elements
    const projTitle = useRef();
    const projYear= useRef();
    const projRes = useRef();
    const projBlurb = useRef();
    const projImage = useRef();
    const projAlt = useRef();
    const projImageArr = useRef();
    const projImageArr2 = useRef();

    var jsonFile = './projectInfo.json';

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

    //creating the list of all projects page bottom
    useEffect(() => {
        if (jsonData !== null) {

            // Map over the array and create JSX elements using index from map function
            const newProjArr = jsonData['Projects'].map((element, index) => (
                <button className="proj-button" key={index} value={JSON.stringify(element)} onClick={() => handleClick(element, event)}>
                    <h3 className="font-bold uppercase proj-title">{element.Title}</h3>
                    <img className="proj-image" loading="lazy" src={ImageProvider[element.Image[0].img]}/>
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

        //update the top page card with the project info
        projTitle.current.textContent = element.Title;
        projYear.current.textContent = element.Year;
        projRes.current.textContent = element.Res;
        projBlurb.current.textContent = element.Desc;
        setCurrProjImage({ src: ImageProvider[element.Image[0].img], alt: element.Image[0].alt, isVideo: element.Image[0].img.endsWith(".mp4") });
        projImageArr.current.value = JSON.stringify(element.Image);
        projImageArr2.current.value = JSON.stringify(element.Image);

        setCurrRes(element.Res);
        setCurrProjIndex(0);
    }

    //change project view on button click with cycling
    const handleCycle = (num) => {
        let ImageArr = JSON.parse(projImageArr.current.value);
        let newIndex = 0;
        if(num === 0){
            newIndex = currProjIndex - 1;
            if(newIndex < 0){
                newIndex = ImageArr.length - 1;
            }
        } else {
            newIndex = currProjIndex + 1;
            newIndex = newIndex%ImageArr.length;
        }

        setCurrProjIndex(newIndex);
    }

    //update the project image and alt text when arrow buttons clicked
    useEffect(() => {
        if (jsonData !== null) {
            let ImageArr = JSON.parse(projImageArr.current.value);
            console.log("currprojindex", currProjIndex);
            //update the image
            setCurrProjImage({ src: ImageProvider[ImageArr[currProjIndex].img], alt: ImageArr[currProjIndex].alt, isVideo: ImageArr[currProjIndex].img.endsWith(".mp4") });
       
        }
    }, [currProjIndex]);


    //jquery for image overlay
    $(document).ready(function(){

        $('.main-proj-image').click(function() {
            $('.overlay').css('display', 'flex');
        });

          $('.overlay').click(function() {
            $('.overlay').css('display', 'none');
        });

    });

    return (
        <main>
            {/* Overlay for enlarging images */}
            <div className="overlay">
                {currProjImage.isVideo ? (
                        <video
                            className="full-image"
                            src={currProjImage.src}
                            alt={currProjImage.alt}
                            ref={projImage}
                            autoPlay
                            loop
                            muted
                        />
                    ) : (
                        <img
                            className="full-image"
                            src={currProjImage.src ? currProjImage.src : defaultIMG}
                            ref={projImage}
                            alt={currProjImage.alt}
                            loading="lazy"
                        />
                    )} 
            </div>
            <div className="page-top">
                <div className="flex-container">
                    <h2 ref={projTitle} className="font-bold text-(--detail-color) uppercase title">PROJECTS</h2>
                    <h3 ref={projYear} className="text-(--detail-color-2) sub-title">2020-{currYear}</h3>
                    <a href={currRes} ref={projRes} target="_blank"></a>
                    <h4 ref={projBlurb} className="blurb">Welcome to my portfolio! This is a collection of projects I made for fun or associated with school assignments. I plan to keep adding to it as I create more cool projects!</h4>
                </div>
                 {/* extra flex div to keep the arrows beside the image when responsive */}
                <div className="flex flex-row proj-image-container">
                    <button className="arrow-button" ref={projImageArr} value={0} onClick={() => handleCycle(0)}><h3>&#9664;</h3></button>
                    
                    <div className="flex flex-col proj-image-container">
                    
                        {/* conditionally render image or video */}
                        {currProjImage.isVideo ? (
                            <video
                                className="main-proj-image"
                                src={currProjImage.src}
                                alt={currProjImage.alt}
                                ref={projImage}
                                autoPlay
                                loop
                                muted
                            />
                        ) : (
                            <img
                                className="main-proj-image"
                                src={currProjImage.src ? currProjImage.src : defaultIMG}
                                ref={projImage}
                                alt={currProjImage.alt}
                                loading="lazy"
                            />
                        )}

                        <h5 className="alt-text">{currProjImage.alt || "Check out some of my work!"}</h5>
                    </div>
                    <button className="arrow-button" ref={projImageArr2} value={0} onClick={() => handleCycle(1)}><h3>&#9654;</h3></button>
                </div>
                
            </div>
            <div className="w-[100%] h-[25px] bg-(--background-color) triangle-clip"></div>
            <div className="page-bottom">
                <div className="flex-container main-container">
                {projArr}
                </div>
            </div>
        </main>
    );
}

export default ProjectPage;