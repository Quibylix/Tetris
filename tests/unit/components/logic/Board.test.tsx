import { COLORS } from "@/components/game/constants";
import { Board, Piece } from "@/components/game/logic";
import { describe, expect, it } from "vitest";

describe("Board", () => {
  it("creates a board filled with null, with the correct dimensions", () => {
    const board = new Board(20, 10);

    expect(board.rows).toBe(20);
    expect(board.cols).toBe(10);

    expect(board.grid.length).toBe(20);
    expect(board.grid[0].length).toBe(10);

    expect(board.grid.every(row => row.every(cell => cell === null))).toBe(
      true,
    );
  });

  it("can fix a piece to the board storing the piece's color", () => {
    const board = new Board(20, 10);
    const piece = new Piece(10, 0, "S");

    board.fixPiece(piece);

    expect(board.grid[10][1]).toBe(COLORS.S);
    expect(board.grid[10][2]).toBe(COLORS.S);
    expect(board.grid[11][0]).toBe(COLORS.S);
    expect(board.grid[11][1]).toBe(COLORS.S);
  });

  it("throws an error if the piece is out of bounds", () => {
    const board = new Board(20, 10);
    const piece = new Piece(20, 0, "S");
    const piece2 = new Piece(-1, 10, "S");

    expect(() => board.fixPiece(piece)).toThrow();
    expect(() => board.fixPiece(piece2)).toThrow();
  });
});
