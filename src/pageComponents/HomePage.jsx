import React from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";

function HomePage() {

    return (
        <>
            <Banner/>
            <Card class={''} title={"ACADEMIC PROJECTS"} subtitle={"Carleton University // Algonquin College"} image={'gatsbee2.PNG'} buttonVal={"Academic"}/>
            <Card class={'personal'} title={"PERSONAL PROJECTS"} subtitle={"2020 - 2024"} image={'p3back.PNG'} buttonVal={"Personal"}/>
            <Card class={'about-card'} title={"ABOUT"} subtitle={"ELLENA TZAVELAS"} image={'me.png'} buttonVal={"About"}/>
        </>
    );
}

export default HomePage;