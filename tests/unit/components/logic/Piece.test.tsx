import { SHAPES } from "@/components/game/constants";
import { Piece } from "@/components/game/logic";
import { describe, expect, it } from "vitest";

describe("Piece", () => {
  it("accepts a position and a shape", () => {
    const piece = new Piece(2, 3, "S");

    expect(piece.col).toBe(3);
    expect(piece.row).toBe(2);
    expect(piece.shape).toEqual(SHAPES["S"]);
  });

  it("can move left", () => {
    const piece = new Piece(2, 3, "S");

    piece.moveLeft();

    expect(piece.col).toBe(2);
    expect(piece.row).toBe(2);
  });

  it("doesn't move left if it's at the left edge", () => {
    const piece = new Piece(2, 0, "S");

    piece.moveLeft();

    expect(piece.col).toBe(0);
    expect(piece.row).toBe(2);
  });

  it("can move right", () => {
    const piece = new Piece(2, 3, "S");

    piece.moveRight();

    expect(piece.col).toBe(4);
    expect(piece.row).toBe(2);
  });

  it("doesn't move right if it's at the right edge", () => {
    const piece = new Piece(2, 8, "S");

    piece.moveRight();

    expect(piece.col).toBe(8);
    expect(piece.row).toBe(2);
  });
});
