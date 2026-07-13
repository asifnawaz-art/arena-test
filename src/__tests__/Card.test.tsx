import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

describe("Card UI Component", () => {
  test("renders card with title and content", () => {
    render(
      <Card>
        <CardTitle>Math Book</CardTitle>
        <CardContent>Chapter 1 Practice</CardContent>
      </Card>
    );

    expect(screen.getByText("Math Book")).toBeInTheDocument();
    expect(screen.getByText("Chapter 1 Practice")).toBeInTheDocument();
  });
});
