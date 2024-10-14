import React from "react";

import "./App.css";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import TodoList from "./components/Todolist";

function App() {
  return (
    <Container maxWidth="lg">
      <TodoList />
    </Container>
  );
}
export default App;
