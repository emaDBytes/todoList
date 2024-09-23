import React from "react";

function TodoTable({ todos }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default TodoTable;
