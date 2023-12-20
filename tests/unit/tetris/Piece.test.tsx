import { Board, Piece } from "@/tetris";
import { SHAPES } from "@/tetris/constants";
import { rotateMatrix } from "@/tetris/helpers";
import { describe, expect, it } from "vitest";

describe("Piece", () => {
  it("accepts a position and a shape", () => {
    const piece = new Piece(2, 3, "S");

    expect(piece.col).toBe(3);
    expect(piece.row).toBe(2);
    expect(piece.shape).toEqual(SHAPES["S"]);
  });

  it("can move down", () => {
    const piece = new Piece(2, 3, "S");

    piece.moveDown();

    expect(piece.col).toBe(3);
    expect(piece.row).toBe(3);
  });

  it("can check if the piece collide with the board", () => {
    const testBoard = new Board(20, 10);
    const fixedPiece = new Piece(4, 4, "T");

    const piece1 = new Piece(2, 3, "O");

    testBoard.fixPiece(fixedPiece);

    /*
    |                     |
    |       O O           |
    |       O O           |
    |           T         |
    |         T T T       |
    |                     |
    */
    expect(piece1.checkCollision(testBoard)).toBe(false);

    const piece2 = new Piece(4, 3, "O");

    /*
    |                     |
    |       O O T         |
    |       O × T T       |
    |                     |
    */
    expect(piece2.checkCollision(testBoard)).toBe(true);
  });

  it("can move left", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 3, "S");

    piece.moveLeftIfCan(testBoard);

    expect(piece.col).toBe(2);
    expect(piece.row).toBe(2);
  });

  it("doesn't move left if it's at the left edge", () => {
    const testBoard = new Board(20, 10);

    const piece = new Piece(2, 0, "S");

    piece.moveLeftIfCan(testBoard);

    expect(piece.col).toBe(0);
    expect(piece.row).toBe(2);
  });

  it("doesn't move left if it collides with the board", () => {
    const testBoard = new Board(20, 10);
    const fixedPiece = new Piece(1, 1, "T");

    testBoard.fixPiece(fixedPiece);

    const piece = new Piece(1, 4, "O");

    /*
    |                     |
    |     T   O O         |
    |   T T T O O         |
    |                     |
    
    */

    piece.moveLeftIfCan(testBoard);

    expect(piece.row).toBe(1);
    expect(piece.col).toBe(4);
  });

  it("can move right", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 3, "S");

    piece.moveRightIfCan(testBoard);

    expect(piece.col).toBe(4);
    expect(piece.row).toBe(2);
  });

  it("doesn't move right if it's at the right edge", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 8, "S");

    piece.moveRightIfCan(testBoard);

    expect(piece.col).toBe(8);
    expect(piece.row).toBe(2);
  });

  it("doesn't move right if it collides with the board", () => {
    const testBoard = new Board(20, 10);
    const fixedPiece = new Piece(1, 4, "O");

    testBoard.fixPiece(fixedPiece);

    const piece = new Piece(1, 1, "T");

    /*
    |                     |
    |     T   O O         |
    |   T T T O O         |
    |                     |
    
    */

    piece.moveRightIfCan(testBoard);

    expect(piece.row).toBe(1);
    expect(piece.col).toBe(1);
  });

  it("can rotate", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(2, 3, "S");

    piece.rotateIfCan(testBoard);

    expect(piece.shape).toEqual(
      rotateMatrix(SHAPES.S as unknown as number[][]),
    );
  });

  it("if it collides with a fixed piece, it doesn't rotate", () => {
    const testBoard = new Board(20, 10);
    const fixedPiece = new Piece(1, 1, "T");

    testBoard.fixPiece(fixedPiece);

    const piece = new Piece(1, 3, "Z");

    piece.rotateIfCan(testBoard);

    /*
    |                     |          |                     |
    |     T Z Z           |          |     T   Z           |
    |   T T T Z Z         |    ->    |   T T × Z           |
    |                     |          |       Z             |
    |                     |          |                     |
    */

    expect(piece.shape).toEqual(SHAPES.Z);
  });

  it("can rotate even if it collides with the right or left wall, it moves right or left respectively", () => {
    const testBoard = new Board(20, 10);
    const piece = new Piece(1, 6, "I");

    // Prepare the board
    piece.rotateIfCan(testBoard);
    piece.moveRightIfCan(testBoard);
    piece.moveRightIfCan(testBoard);
    piece.moveRightIfCan(testBoard);

    /*
    |                     |          |                     |               |                     |
    |                   I |          |                   I | I I I         |             I I I I |
    |                   I |    ->    |                     |         ->    |                     |
    |                   I |          |                     |               |                     |
    |                   I |          |                     |               |                     |
    |                     |          |                     |               |                     |
    */

    piece.rotateIfCan(testBoard);

    expect(piece.col).toBe(6);
    expect(piece.shape).toEqual(SHAPES.I);
  });
});
