import App from "./App";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

test("renders header", () => {
  render(<App />);
  const header = screen.getByText(/My Todos/i);
  expect(header).toBeInTheDocument();
});
