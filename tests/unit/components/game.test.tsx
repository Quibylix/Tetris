import { Game } from "@/components";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("Game", () => {
  it("should render a canvas", () => {
    render(<Game />);

    screen.getByTestId("game-canvas");
  });
});
