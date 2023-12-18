import App from "@/App";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("should render the app", () => {
    render(<App />);

    expect(1).toBe(1);
  });
});
