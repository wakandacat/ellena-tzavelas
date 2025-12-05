import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalProvider from "./components/GlobalProvider.jsx";

/*TO DEPLOY TO GITHUB PAGES
  npm run build
  then
  npm run deploy
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
);
