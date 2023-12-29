import { Board, Piece } from "@/tetris";
import { COLORS } from "@/tetris/constants";
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
    const piece = new Piece(10, 0, "S", board);

    board.fixPiece(piece);

    expect(board.grid[10][1]).toBe(COLORS.S);
    expect(board.grid[10][2]).toBe(COLORS.S);
    expect(board.grid[11][0]).toBe(COLORS.S);
    expect(board.grid[11][1]).toBe(COLORS.S);
  });

  it("throws an error if the piece is out of bounds", () => {
    const board = new Board(20, 10);
    const piece = new Piece(20, 0, "S", board);
    const piece2 = new Piece(-1, 10, "S", board);

    expect(() => board.fixPiece(piece)).toThrow();
    expect(() => board.fixPiece(piece2)).toThrow();
  });

  it("can clear a row if it is full", () => {
    const board = new Board(20, 10);

    for (let i = 0; i < 5; i++) {
      board.fixPiece(new Piece(18, 2 * i, "O", board));
    }

    /*
    |                     |
    | O O O O O O O O O O |
    | O O O O O O O O O O |
    */

    expect(board.grid[18].every(cell => cell === COLORS.O)).toBe(true);
    expect(board.grid[19].every(cell => cell === COLORS.O)).toBe(true);

    board.removeFullRows();

    expect(board.grid.every(row => row.every(cell => cell === null))).toBe(
      true,
    );
  });
});
