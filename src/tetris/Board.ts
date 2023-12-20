import { Piece } from ".";
import { BLOCK_SIZE, COLORS } from "./constants";
import { drawRectWithBorder } from "./helpers";

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

  removeFullRows() {
    const notFullRows = this.grid.filter(row =>
      row.some(value => value === null),
    );

    const fullRowsCount = this.rows - notFullRows.length;

    const newRows = [...Array(fullRowsCount).fill(null)].map(() => [
      ...Array(this.cols).fill(null),
    ]);

    this.grid = [...newRows, ...notFullRows];
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.grid.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        drawRectWithBorder(ctx, {
          x: colIndex * BLOCK_SIZE,
          y: rowIndex * BLOCK_SIZE,
          width: BLOCK_SIZE,
          height: BLOCK_SIZE,
          fillStyle: color ?? "#000",
          strokeStyle: "#fff",
        });
      });
    });
  }
}
