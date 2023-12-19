import { Board, Piece } from ".";
import { TETRIS_HORIZONTAL_BLOCKS, TETRIS_VERTICAL_BLOCKS } from "./constants";
import { getRandomPieceName } from "./helpers";

export class TetrisGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  board: Board;
  piece: Piece;
  lastSecondTime: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.board = new Board(TETRIS_VERTICAL_BLOCKS, TETRIS_HORIZONTAL_BLOCKS);
    this.piece = new Piece(0, 4, getRandomPieceName());

    this.main = this.main.bind(this);
  }

  run() {
    requestAnimationFrame(this.main);

    this.setupKeyboardControls();
  }

  main(time: number) {
    this.lastSecondTime ?? (this.lastSecondTime = time);
    const delta = time - this.lastSecondTime;

    if (delta > 1000) {
      if (this.piece.canMoveDown(this.board)) {
        this.piece.moveDown();
      } else {
        this.board.fixPiece(this.piece);
        this.piece = new Piece(0, 4, getRandomPieceName());
      }

      this.lastSecondTime = time;
    }

    if (!this.ctx) return;

    this.board.draw(this.ctx);
    this.piece.draw(this.ctx);

    requestAnimationFrame(this.main);
  }

  setupKeyboardControls() {
    window.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowLeft":
          this.piece.moveLeftIfCan(this.board);
          break;
        case "ArrowRight":
          this.piece.moveRightIfCan(this.board);
          break;
        case "ArrowDown":
          this.piece.canMoveDown(this.board) && this.piece.moveDown();
          break;
      }
    });
  }
}
