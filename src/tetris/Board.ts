import { Piece } from ".";
import { BLOCK_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH, COLORS } from "./constants";

type PIECE_NAME = keyof typeof COLORS;

export class Board {
  rows: number;
  cols: number;
  grid: ((typeof COLORS)[PIECE_NAME] | null)[][] = [];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.createGrid();
  }

  createGrid() {
    for (let row = 0; row < this.rows; row++) {
      this.grid.push([]);

      for (let col = 0; col < this.cols; col++) {
        this.grid[row].push(null);
      }
    }
  }

  fixPiece(piece: Piece) {
    piece.shape.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value > 0) {
          this.grid[rowIndex + piece.row][colIndex + piece.col] = piece.color;
        }
      });
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const color = this.grid[row][col];

        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(
            col * BLOCK_SIZE,
            row * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE,
          );
        }

        ctx.strokeStyle = "#fff";
        ctx.strokeRect(
          col * BLOCK_SIZE,
          row * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE,
        );
      }
    }
  }
}
