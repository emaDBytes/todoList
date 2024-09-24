import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Importing Material theme for Ag-Grid

function Todolist() {
  // State to store the current todo being entered (description, priority, and due date)
  const [todo, setTodo] = useState({
    description: "",
    priority: "",
    duedate: "",
  });

  // State to store the list of todos (all added todos will be stored here)
  const [todos, setTodos] = useState([]);

  // Ref for accessing the Ag-Grid API to manage grid actions such as selecting and deleting rows
  const gridRef = useRef();

  // Column definitions for Ag-Grid, including filter and editable fields
  const [colDefs, setColDefs] = useState([
    {
      field: "description",
      filter: true, // Enable filtering for description column
      editable: true, // Allow inline editing for description
      sortable: false, // Disable sorting for this column
      floatingFilter: true, // Floating filter enabled
    },
    {
      field: "priority",
      filter: true, // Enable filtering for priority column
      editable: true, // Allow inline editing for priority
      floatingFilter: true, // Floating filter enabled
      cellEditor: "agSelectCellEditor", // Use the agSelectCellEditor to make the field a drop-down
      cellEditorParams: {
        values: ["High", "Normal", "Low"], // Dropdown options for priority
      },
      // Apply red color to the cell text if priority is 'High', black for all other priorities
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
    {
      field: "duedate",
      filter: true, // Enable filtering for due date column
      editable: true, // Allow inline editing for due date
    },
  ]);

  // Function to add a new todo to the list
  const handleAdd = () => {
    // Check if required inputs (description, priority, due date) have been provided
    if (!todo.description || !todo.priority || !todo.duedate) {
      alert("All fields are required!"); // Alert if any field is empty
      return;
    } else {
      // Add the new todo to the list and clear the input fields
      setTodos([todo, ...todos]); // Add the current todo at the beginning of the todos array
      setTodo({ description: "", duedate: "", priority: "" }); // Reset the input fields
    }
  };

  // Function to delete the selected todo from the list based on the row index
  const handleDelete = () => {
    // Check if a row is selected in the grid
    if (gridRef.current.getSelectedNodes().length > 0) {
      // Delete the selected row by filtering out the todo that matches the selected index
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select the row you want to delete."); // Alert if no row is selected
    }
  };

  return (
    <>
      <h3>My Todos</h3>

      {/* Input field for todo description */}
      <input
        placeholder="Description"
        value={todo.description} // Bind the description state to the input
        onChange={
          (event) => setTodo({ ...todo, description: event.target.value }) // Update the state when user types
        }
      />

      {/* Select drop-down for todo priority */}
      <select
        value={todo.priority} // Bind the priority state to the select field
        onChange={(event) => setTodo({ ...todo, priority: event.target.value })} // Update state on selection
      >
        <option value="">Select Priority</option> {/* Default placeholder */}
        <option value="High">High</option>
        <option value="Normal">Normal</option>
        <option value="Low">Low</option>
      </select>

      {/* Input field for due date (calendar picker) */}
      <input
        type="date"
        value={todo.duedate} // Bind the due date state to the input
        onChange={(event) => setTodo({ ...todo, duedate: event.target.value })} // Update state when a date is selected
      />

      {/* Button to add the todo to the list */}
      <button onClick={handleAdd}>Add Todo</button>

      {/* Button to delete the selected todo */}
      <button onClick={handleDelete}>Delete</button>

      {/* Ag-Grid to display the list of todos */}
      <div className="ag-theme-material" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          ref={gridRef} // Reference to the grid to access its API
          onGridReady={(params) => (gridRef.current = params.api)} // Set gridRef to the grid API when it's ready
          rowData={todos} // Bind the row data (todos array) to the grid
          columnDefs={colDefs} // Define the column structure with colDefs
          rowSelection="single" // Allow only a single row to be selected at a time
        />
      </div>
    </>
  );
}

export default Todolist;
