function TodoTable({ todos, handleDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Priority</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.description}</td>
            <td>{todo.duedate}</td>
            <td>{todo.priority}</td>
            <td>
              <button onClick={() => handleDelete(index)}>Done</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
