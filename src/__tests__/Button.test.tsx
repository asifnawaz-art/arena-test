import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/ui/button";

describe("Button UI Component", () => {
  test("renders correctly with children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  test("applies variant classes accordingly", () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-red-600");
  });

  test("triggers onClick function", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Action</Button>);
    fireEvent.click(screen.getByRole("button", { name: /action/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
