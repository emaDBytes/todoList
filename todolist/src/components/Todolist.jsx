import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import TodoTable from "./TodoTable"; // Import the TodoTable component

function TodoList() {
  const [description, setDescription] = useState("");

  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const addTodo = () => {
    if (description.trim() === "") {
      alert("Did you insert the description?!"); // Show an alert if the input is empty
      return;
    }
    setTodos([...todos, description]);
    setDescription(""); // Clear the input field after adding a todo
  };

  return (
    <>
      <input
        type="text"
        placeholder="Description"
        onChange={handleChange}
        value={description}
      />
      <button onClick={addTodo}>Add</button>
      <TodoTable todos={todos} /> {/* Pass the todos array as a prop */}
    </>
  );
}

export default TodoList;
