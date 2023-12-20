import { Board, Piece } from ".";
import { TETRIS_HORIZONTAL_BLOCKS, TETRIS_VERTICAL_BLOCKS } from "./constants";
import { getRandomPieceName } from "./helpers";

export class TetrisGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  board: Board;
  piece: Piece;
  lastPieceTime: number | null = null;
  lastEventTime: number | null = null;
  isMovingDown = false;
  isMovingLeft = false;
  isMovingRight = false;

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
    this.lastPieceTime ?? (this.lastPieceTime = time);
    this.lastEventTime ?? (this.lastEventTime = time);

    const pieceDelta = time - this.lastPieceTime;
    const eventDelta = time - this.lastEventTime;

    if (pieceDelta > 1000) {
      if (this.piece.canMoveDown(this.board)) {
        this.piece.moveDown();
      } else {
        this.board.fixPiece(this.piece);
        this.board.removeFullRows();

        this.piece = new Piece(0, 4, getRandomPieceName());
      }

      this.lastPieceTime = time;
    }

    if (eventDelta > 110) {
      if (this.isMovingLeft) {
        this.piece.moveLeftIfCan(this.board);
      }

      if (this.isMovingRight) {
        this.piece.moveRightIfCan(this.board);
      }

      if (this.isMovingDown) {
        this.piece.canMoveDown(this.board) && this.piece.moveDown();
      }

      this.lastEventTime = time;
    }

    if (!this.ctx) return;

    this.board.draw(this.ctx);
    this.piece.draw(this.ctx);

    requestAnimationFrame(this.main);
  }

  setupKeyboardControls() {
    window.addEventListener("keydown", event => {
      if (event.repeat) return;

      switch (event.key) {
        case "ArrowLeft":
          this.isMovingLeft = true;
          this.piece.moveLeftIfCan(this.board);
          this.lastEventTime = null;
          break;
        case "ArrowRight":
          this.isMovingRight = true;
          this.piece.moveRightIfCan(this.board);
          this.lastEventTime = null;
          break;
        case "ArrowDown":
          this.isMovingDown = true;
          this.piece.canMoveDown(this.board) && this.piece.moveDown();
          this.lastEventTime = null;
          break;
        case "ArrowUp":
          this.piece.rotateIfCan(this.board);
          break;
      }

      window.addEventListener("keyup", event => {
        switch (event.key) {
          case "ArrowLeft":
            this.isMovingLeft = false;
            break;
          case "ArrowRight":
            this.isMovingRight = false;
            break;
          case "ArrowDown":
            this.isMovingDown = false;
            break;
        }
      });
    });
  }
}
