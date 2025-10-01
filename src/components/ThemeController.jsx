import { useEffect, useState } from "react";

function ThemeController() {

    //local theme state
    const [localTheme, setLocalTheme] = useState('light');

    //to add a new theme: add the name here, then in styles.css create a new data-theme with the identical name
    const themeOptions = ['light', 'dark', 'pink', 'green']; 
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
        <button className="hover:text-(--detail-color) hover:brightness-200 uppercase bg-(--background-color-3) border-0 rounded-xl flex nav-button" onClick={handleClick} value={localTheme}>
            <p>&#9664;</p>
                <h5 className="px-4">{localTheme}</h5>
            <p>&#9658;</p>
        </button>
    );
}

export default ThemeController;