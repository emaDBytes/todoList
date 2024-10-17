import TodoTable from "../components/TodoTable";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

test("renders Todotable", () => {
  const row = [{ description: "Go to coffee", duedate: "24.01.2023" }];
  render(<TodoTable todos={row} />);
  const table = screen.getByRole("table");
  expect(table).toHaveTextContent(/go to coffee/i);
});
