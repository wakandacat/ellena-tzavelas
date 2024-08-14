import React from "react";
import Banner from "../homepageComponents/Banner";
import Card from "../homepageComponents/Card";

function HomePage() {

    return (
        <>
            <Banner/>
            <Card class={''} title={"ACADEMIC PROJECTS"} subtitle={"Carleton University // Algonquin College"} image={'cat.jpg'} buttonVal={"Academic"}/>
            <Card class={'personal'} title={"PERSONAL PROJECTS"} subtitle={"2020 - 2024"} image={'cat.jpg'} buttonVal={"Personal"}/>
            <Card class={''} title={"ABOUT"} subtitle={"ELLENA TZAVELAS"} image={'cat.jpg'} buttonVal={"About"}/>
        </>
    );
}

export default HomePage;