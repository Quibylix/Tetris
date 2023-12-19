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

  moveDown() {
    this.row + this.shape.length < TETRIS_VERTICAL_BLOCKS ? this.row++ : null;
  }

  moveLeft() {
    this.col > 0 ? this.col-- : null;
  }

  moveRight() {
    this.col + this.shape[0].length < TETRIS_HORIZONTAL_BLOCKS
      ? this.col++
      : null;
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
