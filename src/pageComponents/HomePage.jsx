import React from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";

function HomePage() {

    const currYear = new Date().getFullYear();

    return (
        <main>
            <Banner/>
            <Card class={'odd-card'} title={"PROJECTS"} subtitle={`2020 - ${currYear}`} image={'p3back.jpg'} buttonVal={"Project"} aria-label="Travel to the Projects page."/>
            <Card class={'even-card'} title={"ABOUT"} subtitle={"ELLENA TZAVELAS"} image={'me3.png'} buttonVal={"About"} aria-label="Travel to the About page."/>
        </main>
    );
}

export default HomePage;