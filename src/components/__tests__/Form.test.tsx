import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "../Form";
import { useForm } from "react-hook-form";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

describe("Form Component", () => {
  const mockFormSchema = {
    formTitle: "Test Form",
    formDescription: "This is a test form.",
    fields: [
      {
        id: "username",
        type: "text",
        label: "Username",
        required: true,
        placeholder: "Enter your username",
      },
      {
        id: "password",
        type: "password",
        label: "Password",
        required: true,
        placeholder: "Enter your password",
        validation: {
          pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
          message: "Password must contain letters and numbers.",
        },
      },
      {
        id: "role",
        type: "radio",
        label: "Role",
        required: true,
        options: [
          { value: "admin", label: "Admin" },
          { value: "user", label: "User" },
        ],
      },
    ],
  };

  const mockUseForm = {
    register: jest.fn(),
    handleSubmit: jest.fn((cb) => (e) => cb(e)),
    formState: {
      errors: {},
    },
  };

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue(mockUseForm);
  });

  test("renders form title and description", () => {
    render(<Form formSchema={mockFormSchema} />);
    expect(screen.getByText(mockFormSchema.formTitle)).toBeInTheDocument();
    expect(
      screen.getByText(mockFormSchema.formDescription)
    ).toBeInTheDocument();
  });

  test("renders all form fields", () => {
    render(<Form formSchema={mockFormSchema} />);

    mockFormSchema.fields.forEach((field) => {
      expect(screen.getByLabelText(field.label)).toBeInTheDocument();
    });
  });

  test("displays validation error for required field", async () => {
    mockUseForm.formState.errors = {
      username: { message: "Username is required" },
    };

    render(<Form formSchema={mockFormSchema} />);
    expect(screen.getByText("Username is required")).toBeInTheDocument();
  });

  test("displays validation error for pattern mismatch", async () => {
    mockUseForm.formState.errors = {
      password: { message: "Password must contain letters and numbers." },
    };

    render(<Form formSchema={mockFormSchema} />);
    expect(
      screen.getByText("Password must contain letters and numbers.")
    ).toBeInTheDocument();
  });

  test("calls onSubmit with form data when submitted", () => {
    const mockSubmit = jest.fn();
    mockUseForm.handleSubmit = jest.fn((cb) => cb(mockSubmit));

    render(<Form formSchema={mockFormSchema} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(mockSubmit).toHaveBeenCalled();
  });
});
