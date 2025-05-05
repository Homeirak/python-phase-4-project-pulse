import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// highest level
// displaying our whole project
// displaying our app - which will contain the imports for all the pages and components