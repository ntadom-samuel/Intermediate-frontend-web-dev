import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//The command for running a vite app is: npm run dev
//We have to cofig exlint manually on vit
//Run this command to download all the packages you need to configure eslint. You must save them in dependencies: this command does this already: npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
//create this file in src: .eslintrc.json
//Then add this line:{"extends": "react-app"}
