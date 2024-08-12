import React from "react";
import Banner from "../homepageComponents/Banner";
import AboutCard from "../homepageComponents/AboutCard";
import PersonalCard from "../homepageComponents/PersonalCard";
import AcademicCard from "../homepageComponents/AcademicCard";

function HomePage() {

    return (
        <>
            <Banner/>
            <AcademicCard/>
            <PersonalCard/>
            <AboutCard/>
        </>
    );
}

export default HomePage;