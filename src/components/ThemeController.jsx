import React, { useEffect, useState } from "react";

function ThemeController() {

    //local theme state
    const [localTheme, setLocalTheme] = useState('light');

    const themeOptions = ['light', 'dark', 'pink'];

    const [currentOption, setCurrentOption] = useState(0);

    //change modes manually with the button
    const handleClick = () => {
        //mod the button click count so it rolls over
        const currIndex = themeOptions.indexOf(localTheme);
        const nextIndex = (currIndex + 1) % themeOptions.length;

        //update the values
        setCurrentOption(nextIndex);
        const currentTheme = themeOptions[nextIndex];
        setLocalTheme(currentTheme);
        document.querySelector('html').setAttribute('data-theme', currentTheme);
    }

    //check internal computer theme state
    useEffect(() => {
        //only light or dark modes
        const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setLocalTheme(currentTheme);
        document.querySelector('html').setAttribute('data-theme', currentTheme);
    }, []);

    return (
        <button onClick={handleClick} value={localTheme}><p>&#9664;</p>{localTheme}<p>&#9658;</p></button>
    );
}

export default ThemeController;