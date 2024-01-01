import { AnimationInterval, Board, Piece } from ".";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  TETRIS_HORIZONTAL_BLOCKS,
  TETRIS_VERTICAL_BLOCKS,
} from "./constants";
import { getLevel, getRandomPieceName } from "./helpers";

const korobeinikiAudio = new Audio("/audio/korobeiniki.mp3");
const lineClearAudio = new Audio("/audio/line-clear.mp3");
const rotateAudio = new Audio("/audio/rotate.mp3");
const moveAudio = new Audio("/audio/move.mp3");
const hardDropAudio = new Audio("/audio/hard-drop.mp3");
const levelUpAudio = new Audio("/audio/level-up.mp3");
const blockoutAudio = new Audio("/audio/blockout.mp3");

korobeinikiAudio.loop = true;

export class TetrisGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  board: Board;
  piece: Piece;
  movementInterval: AnimationInterval;
  gravityInterval: AnimationInterval;
  isMovingDown = false;
  isMovingLeft = false;
  isMovingRight = false;
  isGameOver = false;
  fullRowsCount = 0;
  level = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.main = this.main.bind(this);
    this.handlePieceMovement = this.handlePieceMovement.bind(this);
    this.handleGravity = this.handleGravity.bind(this);

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.board = new Board(TETRIS_VERTICAL_BLOCKS, TETRIS_HORIZONTAL_BLOCKS);
    this.piece = new Piece(0, 4, getRandomPieceName(), this.board);

    this.movementInterval = new AnimationInterval(
      this.handlePieceMovement,
      150,
    );
    this.gravityInterval = new AnimationInterval(this.handleGravity, 470);
  }

  run() {
    requestAnimationFrame(this.main);

    korobeinikiAudio.play();

    this.setupKeydownControls();
    this.setupKeyupControls();
  }

  main(time: number) {
    if (!this.isGameOver) {
      this.gravityInterval.run(time);
      this.movementInterval.run(time);
    }

    this.draw();

    requestAnimationFrame(this.main);
  }

  setupKeydownControls() {
    window.addEventListener("keydown", event => {
      if (event.repeat) return;

      switch (event.key) {
        case "ArrowLeft":
          this.isMovingLeft = true;
          this.piece.moveLeftIfCan();
          this.movementInterval.reset();
          moveAudio.currentTime = 0;
          moveAudio.play();
          break;
        case "ArrowRight":
          this.isMovingRight = true;
          this.piece.moveRightIfCan();
          this.movementInterval.reset();
          moveAudio.currentTime = 0;
          moveAudio.play();
          break;
        case "ArrowDown":
          this.isMovingDown = true;
          this.piece.canMoveDown() && this.piece.moveDown();
          this.movementInterval.reset();
          moveAudio.currentTime = 0;
          moveAudio.play();
          break;
        case "ArrowUp":
          this.piece.rotateIfCan();
          rotateAudio.currentTime = 0;
          rotateAudio.play();
          break;
        case " ": {
          this.piece.moveDownToFinalRow();
          hardDropAudio.currentTime = 0;
          hardDropAudio.play();

          this.board.fixPiece(this.piece);

          const fullRowsCount = this.board.removeFullRows();

          if (fullRowsCount > 0) {
            lineClearAudio.currentTime = 0;
            lineClearAudio.play();
            this.fullRowsCount += fullRowsCount;
          }

          const newLevel = getLevel(this.fullRowsCount);
          if (newLevel !== this.level) this.updateLevel(newLevel);

          this.piece = new Piece(0, 4, getRandomPieceName(), this.board);

          if (this.piece.checkCollision()) {
            this.gameOver();
          }

          break;
        }
      }
    });
  }

  setupKeyupControls() {
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
  }

  draw() {
    if (!this.ctx) return;

    if (this.isGameOver) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.font = "bold 30px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";

      const centerX = CANVAS_WIDTH / 2;
      const centerY = CANVAS_HEIGHT / 2;

      this.ctx.fillText("Game Over", centerX, centerY);

      return;
    }

    this.board.draw(this.ctx);
    this.piece.draw(this.ctx);

    this.ctx.font = "bold 20px Arial";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(`Level: ${this.level}`, 10, 10);
    this.ctx.fillText(`Rows: ${this.fullRowsCount}`, 10, 40);
  }

  handleGravity() {
    if (this.piece.canMoveDown()) {
      this.piece.moveDown();
      return;
    }

    this.board.fixPiece(this.piece);

    const fullRowsCount = this.board.removeFullRows();

    if (fullRowsCount > 0) {
      lineClearAudio.currentTime = 0;
      lineClearAudio.play();
      this.fullRowsCount += fullRowsCount;
    }

    const newLevel = getLevel(this.fullRowsCount);
    if (newLevel !== this.level) this.updateLevel(newLevel);

    this.piece = new Piece(0, 4, getRandomPieceName(), this.board);

    if (this.piece.checkCollision()) {
      this.gameOver();
    }
  }

  updateLevel(level: number) {
    this.level = level;
    levelUpAudio.currentTime = 0;
    levelUpAudio.play();

    this.gravityInterval.interval = Math.floor(
      470 * Math.pow(0.88, 2 * level - 1),
    );
    this.movementInterval.interval = Math.floor(
      150 * Math.pow(0.97, 2 * level - 1),
    );
  }

  handlePieceMovement() {
    if (this.isMovingLeft) {
      this.piece.moveLeftIfCan();
    }

    if (this.isMovingRight) {
      this.piece.moveRightIfCan();
    }

    if (this.isMovingDown) {
      this.piece.canMoveDown() && this.piece.moveDown();
    }
  }

  gameOver() {
    this.isGameOver = true;

    this.gravityInterval.reset();
    this.movementInterval.reset();

    korobeinikiAudio.pause();
    blockoutAudio.play();
  }
}
