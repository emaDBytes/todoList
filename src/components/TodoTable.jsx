function TodoTable(props) {
  return (
    <table>
      <tbody>
        {props.todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.description}</td>
            <td>{todo.duedate}</td>
            <td>
              <button onClick={() => props.handleDelete(index)}>Done</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
