import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs"; // Import dayjs to handle date formatting

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Importing Material theme for Ag-Grid

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Adapter for date management
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Material-UI Date Picker component

export default function Todolist() {
  // State to store the current todo being entered (description, priority, and due date)
  const [todo, setTodo] = useState({
    description: "",
    priority: "",
    duedate: null,
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
      setTodos([
        {
          ...todo,
          duedate: todo.duedate ? dayjs(todo.duedate).format("YYYY-MM-DD") : "",
        },
        ...todos,
      ]);
      setTodo({ description: "", duedate: null, priority: "" }); // Reset the input fields
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
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {/* Input field for todo description */}
        <TextField
          label="Description"
          value={todo.description} // Bind the description state to the input
          onChange={
            (event) => setTodo({ ...todo, description: event.target.value }) // Update the state when user types
          }
        />

        {/* Select drop-down for todo priority */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              value={todo.priority}
              label="Priority"
              onChange={(event) =>
                setTodo({ ...todo, priority: event.target.value })
              }
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Input field for due date (calendar picker) */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={todo.duedate ? dayjs(todo.duedate) : null}
            onChange={(newValue) =>
              setTodo({
                ...todo,
                duedate: dayjs(newValue).format("YYYY-MM-DD"),
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* Button to add the todo to the list */}
        <Button variant="contained" onClick={handleAdd}>
          Add Todo
        </Button>

        {/* Button to delete the selected todo */}
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
      {/* Ag-Grid to display the list of todos */}
      <div className="ag-theme-material" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          ref={gridRef} // Reference to the grid to access its API
          onGridReady={(params) => (gridRef.current = params.api)} // Set gridRef to the grid API when it's ready
          rowData={todos} // Bind the row data (todos array) to the grid
          columnDefs={colDefs} // Define the column structure with colDefs
          selection={{ mode: "singleRow" }} // Allow only a single row to be selected at a time
        />
      </div>
    </>
  );
}
