import { rotateMatrix } from "@/tetris/helpers";
import { describe, expect, it } from "vitest";

describe("rotateMatrix", () => {
  it("can rotate a square matrix 90 degrees clockwise", () => {
    const matrix = [
      [2, 5, 6],
      [7, 8, 2],
      [1, 2, 3],
    ];

    const rotated = rotateMatrix(matrix);

    expect(rotated).toEqual([
      [1, 7, 2],
      [2, 8, 5],
      [3, 2, 6],
    ]);
  });

  it("can rotate a non-square matrix 90 degrees clockwise", () => {
    const matrix = [
      [2, 5, 6],
      [7, 8, 9],
    ];

    const rotated = rotateMatrix(matrix);

    expect(rotated).toEqual([
      [7, 2],
      [8, 5],
      [9, 6],
    ]);
  });

  it("can rotate a square matrix 90 degrees counter-clockwise", () => {
    const matrix = [
      [2, 5, 6],
      [7, 8, 2],
      [1, 2, 3],
    ];

    const rotated = rotateMatrix(matrix, false);

    expect(rotated).toEqual([
      [6, 2, 3],
      [5, 8, 2],
      [2, 7, 1],
    ]);
  });

  it("can rotate a non-square matrix 90 degrees counter-clockwise", () => {
    const matrix = [
      [2, 5, 6],
      [7, 8, 9],
    ];

    const rotated = rotateMatrix(matrix, false);

    expect(rotated).toEqual([
      [6, 9],
      [5, 8],
      [2, 7],
    ]);
  });
});
