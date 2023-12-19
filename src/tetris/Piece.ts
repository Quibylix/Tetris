import { Board } from ".";
import {
  BLOCK_SIZE,
  COLORS,
  SHAPES,
  TETRIS_HORIZONTAL_BLOCKS,
  TETRIS_VERTICAL_BLOCKS,
} from "./constants";

type PIECE_NAME = keyof typeof SHAPES;

export class Piece {
  row: number;
  col: number;
  color: (typeof COLORS)[PIECE_NAME];
  shape: (typeof SHAPES)[PIECE_NAME];

  constructor(row: number, col: number, name: PIECE_NAME) {
    this.row = row;
    this.col = col;
    this.color = COLORS[name];
    this.shape = SHAPES[name];
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
        if (value > 0) {
          ctx.fillStyle = this.color;
          ctx.strokeStyle = "#fff";

          ctx.fillRect(
            (colIndex + this.col) * BLOCK_SIZE,
            (rowIndex + this.row) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE,
          );

          ctx.strokeRect(
            (colIndex + this.col) * BLOCK_SIZE,
            (rowIndex + this.row) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE,
          );
        }
      });
    });
  }
}
