import { Board, Piece } from "@/tetris";
import { SHAPES } from "@/tetris/constants";
import { rotateMatrix } from "@/tetris/helpers";
import { describe, expect, it } from "vitest";

describe("Piece", () => {
  it("accepts a position and a shape", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 3, "S", testBoard);

    expect(piece.col).toBe(3);
    expect(piece.row).toBe(2);
    expect(piece.shape).toEqual(SHAPES["S"]);
  });

  it("can move down", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 3, "S", testBoard);

    piece.moveDown();

    expect(piece.col).toBe(3);
    expect(piece.row).toBe(3);
  });

  it("can check if the piece collide with the board", () => {
    const testBoard = new Board(20, 10);
    const fixedPiece = new Piece(4, 4, "T", testBoard);

    const piece1 = new Piece(2, 3, "O", testBoard);

    testBoard.fixPiece(fixedPiece);

    /*
    |                     |
    |       O O           |
    |       O O           |
    |           T         |
    |         T T T       |
    |                     |
    */
    expect(piece1.checkCollision()).toBe(false);

    const piece2 = new Piece(4, 3, "O", testBoard);

    /*
    |                     |
    |       O O T         |
    |       O × T T       |
    |                     |
    */
    expect(piece2.checkCollision()).toBe(true);
  });

  it("can move left", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 3, "S", testBoard);

    piece.moveLeftIfCan();

    expect(piece.col).toBe(2);
    expect(piece.row).toBe(2);
  });

  it("doesn't move left if it's at the left edge", () => {
    const testBoard = new Board(20, 10);

    const piece = new Piece(2, 0, "S", testBoard);

    piece.moveLeftIfCan();

    expect(piece.col).toBe(0);
    expect(piece.row).toBe(2);
  });

  it("doesn't move left if it collides with the board", () => {
    const testBoard = new Board(20, 10);
    const fixedPiece = new Piece(1, 1, "T", testBoard);

    testBoard.fixPiece(fixedPiece);

    const piece = new Piece(1, 4, "O", testBoard);

    /*
    |                     |
    |     T   O O         |
    |   T T T O O         |
    |                     |
    
    */

    piece.moveLeftIfCan();

    expect(piece.row).toBe(1);
    expect(piece.col).toBe(4);
  });

  it("can move right", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 3, "S", testBoard);

    piece.moveRightIfCan();

    expect(piece.col).toBe(4);
    expect(piece.row).toBe(2);
  });

  it("doesn't move right if it's at the right edge", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 8, "S", testBoard);

    piece.moveRightIfCan();

    expect(piece.col).toBe(8);
    expect(piece.row).toBe(2);
  });

  it("doesn't move right if it collides with the board", () => {
    const testBoard = new Board(20, 10);
    const fixedPiece = new Piece(1, 4, "O", testBoard);

    testBoard.fixPiece(fixedPiece);

    const piece = new Piece(1, 1, "T", testBoard);

    /*
    |                     |
    |     T   O O         |
    |   T T T O O         |
    |                     |
    
    */

    piece.moveRightIfCan();

    expect(piece.row).toBe(1);
    expect(piece.col).toBe(1);
  });

  it("can rotate", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 3, "S", testBoard);

    piece.rotateIfCan();

    expect(piece.shape).toEqual(
      rotateMatrix(SHAPES.S as unknown as number[][]),
    );
  });

  it("if it collides with a fixed piece, it doesn't rotate", () => {
    const testBoard = new Board(20, 10);
    const fixedPiece = new Piece(2, 2, "T", testBoard);

    testBoard.fixPiece(fixedPiece);

    const piece = new Piece(1, 3, "Z", testBoard);

    piece.rotateIfCan();

    /*
    |                     |          |                     |
    |       Z Z           |          |           Z         |
    |       T Z Z         |    ->    |       T Z Z         |
    |     T T T           |          |     T T ×           |
    |                     |          |                     |
    */

    expect(piece.shape).toEqual(SHAPES.Z);
  });

  it("can rotate even if it collides with the right or left wall, it moves right or left respectively", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(1, 6, "I", testBoard);

    // Prepare the board
    piece.rotateIfCan();
    piece.moveRightIfCan();

    /*
    |                     |          |                     |               |                     |
    |                   I |          |                   I | I I I         |             I I I I |
    |                   I |    ->    |                     |         ->    |                     |
    |                   I |          |                     |               |                     |
    |                   I |          |                     |               |                     |
    |                     |          |                     |               |                     |
    */

    piece.rotateIfCan();

    expect(piece.col).toBe(6);
    expect(piece.shape).toEqual(
      rotateMatrix(rotateMatrix(SHAPES.I as unknown as number[][])),
    );
  });

  it("allows to calculate the final position of the piece", () => {
    const testBoard = new Board(20, 10);

    const piece = new Piece(1, 1, "T", testBoard);

    expect(piece.getFinalRow()).toEqual(18);

    const fixedPiece = new Piece(18, 1, "O", testBoard);

    testBoard.fixPiece(fixedPiece);

    expect(piece.getFinalRow()).toEqual(16);

    piece.moveDownToFinalRow();

    expect(piece.row).toEqual(16);
  });
});
