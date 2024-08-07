import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalProvider = ({children}) => {
    const [globalState, setGlobalState] = useState({
        temp: 0,
    });

    return (
        <GlobalContext.Provider value={{globalState, setGlobalState}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;