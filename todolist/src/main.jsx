import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Todolist from "./components/Todolist.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Todolist />
  </StrictMode>
);
