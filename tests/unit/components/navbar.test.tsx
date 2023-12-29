import { Navbar } from "@/components";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Navbar", () => {
  it("should render the 'TETRIS' title and two images", () => {
    render(<Navbar />);

    screen.getByText("TETRIS");
    expect(screen.getAllByRole("img").length).toBe(2);
  });
});
