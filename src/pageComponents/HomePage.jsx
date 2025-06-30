import React from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";

function HomePage() {

    const currYear = new Date().getFullYear();

    return (
        <>
            <Banner/>
            <Card class={'personal'} title={"PROJECTS"} subtitle={`2020 - ${currYear}`} image={'p3back.jpg'} buttonVal={"Personal"}/>
            <Card class={'about-card'} title={"ABOUT"} subtitle={"ELLENA TZAVELAS"} image={'me3.png'} buttonVal={"About"}/>
        </>
    );
}

export default HomePage;