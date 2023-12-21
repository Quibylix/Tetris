import { Board } from ".";
import {
  BLOCK_SIZE,
  COLORS,
  SHAPES,
  TETRIS_HORIZONTAL_BLOCKS,
  TETRIS_VERTICAL_BLOCKS,
} from "./constants";
import { drawRectWithBorder, rotateMatrix } from "./helpers";

type PIECE_NAME = keyof typeof SHAPES;

export class Piece {
  row: number;
  col: number;
  color: (typeof COLORS)[PIECE_NAME];
  shape: number[][];

  constructor(row: number, col: number, name: PIECE_NAME) {
    this.row = row;
    this.col = col;
    this.color = COLORS[name];
    this.shape = SHAPES[name].map(row => [...row]);
  }

  moveUp() {
    this.row--;
  }

  moveDown() {
    this.row++;
  }

  moveLeftIfCan(board: Board) {
    this.col--;
    if (this.checkCollision(board)) {
      this.col++;
    }
  }

  moveRightIfCan(board: Board) {
    this.col++;
    if (this.checkCollision(board)) {
      this.col--;
    }
  }

  canMoveDown(board: Board) {
    this.moveDown();
    if (this.checkCollision(board)) {
      this.moveUp();
      return false;
    }

    this.moveUp();
    return true;
  }

  rotateIfCan(board: Board) {
    this.shape = rotateMatrix(this.shape);

    const distanceToLeft = this.col;
    const distanceToRight =
      TETRIS_HORIZONTAL_BLOCKS - (this.shape[0].length + this.col);

    // If distance is negative the piece is out of the board
    if (distanceToLeft < 0) {
      this.col -= distanceToLeft;
    } else if (distanceToRight < 0) {
      this.col += distanceToRight;
    }

    if (this.checkCollision(board)) {
      if (distanceToLeft < 0) {
        this.col += distanceToLeft;
      } else if (distanceToRight < 0) {
        this.col -= distanceToRight;
      }

      this.shape = rotateMatrix(this.shape, false);
    }
  }

  checkCollision(board: Board) {
    return this.shape.some((row, rowIndex) => {
      return row.some((value, colIndex) => {
        if (value > 0) {
          const x = colIndex + this.col;
          const y = rowIndex + this.row;

          return (
            x < 0 ||
            x >= TETRIS_HORIZONTAL_BLOCKS ||
            y < 0 ||
            y >= TETRIS_VERTICAL_BLOCKS ||
            board.grid[y][x] !== null
          );
        }

        return false;
      });
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.shape.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        value &&
          drawRectWithBorder(ctx, {
            x: (colIndex + this.col) * BLOCK_SIZE,
            y: (rowIndex + this.row) * BLOCK_SIZE,
            width: BLOCK_SIZE,
            height: BLOCK_SIZE,
            fillStyle: this.color,
            strokeStyle: "#fff",
          });
      });
    });
  }
}
