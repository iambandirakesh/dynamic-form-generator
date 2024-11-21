import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { JsonEditor } from "../JsonEditor";

describe("JsonEditor Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with a textarea", () => {
    render(<JsonEditor onChange={mockOnChange} />);
    expect(screen.getByTestId("textarea")).toBeInTheDocument();
  });

  test("displays error for invalid JSON", async () => {
    render(<JsonEditor onChange={mockOnChange} />);

    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: "{ invalid JSON" } });

    await waitFor(() => {
      expect(screen.getByTestId("JsonError")).toBeInTheDocument();
    });
    expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();

    expect(mockOnChange).toHaveBeenCalledWith("{ invalid JSON", false);
  });

  test("validates and displays no error for valid JSON", async () => {
    render(<JsonEditor onChange={mockOnChange} />);

    const validJson = '{"name": "John", "age": 30}';
    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: validJson } });

    await waitFor(() => {
      expect(screen.queryByTestId("JsonError")).not.toBeInTheDocument();
    });

    expect(mockOnChange).toHaveBeenCalledWith(validJson, true);
  });

  test("formats valid JSON when 'Click to format JSON' is clicked", async () => {
    render(<JsonEditor onChange={mockOnChange} />);

    const unformattedJson = '{"name":"John","age":30}';
    const formattedJson = `{
  "name": "John",
  "age": 30
}`;
    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: unformattedJson } });

    const formatButton = await screen.findByTestId("FormateJsonData");
    fireEvent.click(formatButton);

    await waitFor(() => {
      expect(textarea).toHaveValue(formattedJson);
    });
  });

  test("handles Tab key correctly", () => {
    render(<JsonEditor onChange={mockOnChange} />);

    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: "test" } });
    fireEvent.keyDown(textarea, { key: "Tab", preventDefault: jest.fn() });

    expect(textarea).toHaveValue("  test");
  });

  test("displays error with cursor position for invalid JSON", async () => {
    render(<JsonEditor onChange={mockOnChange} />);

    const invalidJson = '{ "name": "John", "age": 30, }';
    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: invalidJson } });

    await waitFor(() => {
      const errorMessage = screen.getByText(/Invalid JSON/);
      expect(errorMessage).toBeInTheDocument();
    });

    const errorMessage = screen.getByText(/Invalid JSON/);
    expect(errorMessage).toHaveTextContent("(at position");
  });

  test("triggers onChange callback with updated value and validation status", async () => {
    render(<JsonEditor onChange={mockOnChange} />);

    const validJson = '{"name": "John"}';
    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: validJson } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(validJson, true);
    });
  });

  test("displays initial value if provided", () => {
    const initialValue = '{"key": "value"}';
    render(<JsonEditor initialValue={initialValue} onChange={mockOnChange} />);

    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveValue(initialValue);
  });
});
