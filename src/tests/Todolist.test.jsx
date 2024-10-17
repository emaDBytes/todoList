import Todolist from "../components/Todolist";
import { test, expect, vi } from "vitest"; // Add vi for mocking
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Mock the date picker component since it's complex to test
vi.mock("@mui/x-date-pickers/DatePicker", () => ({
  DatePicker: ({ label, onChange }) => (
    <input
      type="date"
      aria-label={label}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

// Mock dayjs to handle date formatting consistently
vi.mock("dayjs", () => ({
  default: (date) => ({
    format: () => "2024-01-29",
  }),
}));

// Test if the Todolist component renders correctly
test("renders Todolist component", () => {
  render(<Todolist />);
  const header = screen.getByText(/My Todos/i);
  expect(header).toBeInTheDocument();
});

// Test the Add Todo functionality
test("add todo", async () => {
  render(<Todolist />);

  // Find and fill the description input
  const description = screen.getByLabelText("Description");
  fireEvent.change(description, { target: { value: "Go to coffee" } });

  // Find and fill the due date
  const duedate = screen.getByLabelText("Due Date");
  fireEvent.change(duedate, { target: { value: "2024-01-29" } });

  // Select priority
  const priority = screen.getByLabelText("Priority");
  fireEvent.mouseDown(priority);
  const priorityOption = screen.getByText("High");
  fireEvent.click(priorityOption);

  // Click on Add Todo button
  const button = screen.getByText("Add Todo");
  fireEvent.click(button);

  // Since AG Grid is rendered asynchronously, we need to wait for the content
  expect(await screen.findByText("Go to coffee")).toBeInTheDocument();
  expect(await screen.findByText("High")).toBeInTheDocument();
});
