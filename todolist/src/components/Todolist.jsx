import TodoTable from "./TodoTable"; // Import the TodoTable component
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Todolist() {
  const [todo, setTodo] = useState({
    description: "",
    duedate: "",
    priority: "",
  });
  const [todos, setTodos] = useState([]);

  const [colDefs, setColDefs] = useState([
    { field: "description", filter: true, editable: true },
    { field: "priority" },
    { field: "duedate" },
  ]);

  const handleAdd = () => {
    if (!todo) {
      alert("Type something first");
    } else {
      setTodos([todo, ...todos]);
      setTodo({ description: "", duedate: "", priority: "" });
    }
  };

  const handleDelete = (row) => {
    setTodos(todos.filter((_, index) => row != index));
  };

  return (
    <>
      <h3>My Todos</h3>
      <input
        placeholder="Description"
        value={todo.description}
        onChange={(event) =>
          setTodo({ ...todo, description: event.target.value })
        }
      />
      <input
        placeholder="Priority"
        value={todo.priority}
        onChange={(event) => setTodo({ ...todo, priority: event.target.value })}
      />
      <input
        type="date"
        value={todo.duedate}
        onChange={(event) => setTodo({ ...todo, duedate: event.target.value })}
      />
      <button onClick={handleAdd}>Add Todo</button>
      <div className="ag-theme-material" style={{ height: 500, width: "100%" }}>
        <AgGridReact rowData={todos} columnDefs={colDefs} />
      </div>
    </>
  );
}

export default Todolist;
