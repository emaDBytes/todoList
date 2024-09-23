import { useState } from "react";
import TodoTable from "./TodoTable";

function Todolist() {
  const [todo, setTodo] = useState({
    description: "",
    duedate: "",
    priority: "",
  });
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (!todo.description || !todo.duedate || !todo.priority) {
      alert("Please fill all fields");
      return;
    } else {
      setTodos([todo, ...todos]);
      setTodo({ description: "", duedate: "", priority: "" });
    }
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
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
      <TodoTable todos={todos} handleDelete={handleDelete} />
    </>
  );
}

export default Todolist;
