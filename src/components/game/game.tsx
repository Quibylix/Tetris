import styles from "./game.module.css";

const TETRIS_HORIZONTAL_BLOCKS = 10;
const TETRIS_VERTICAL_BLOCKS = 20;
const BLOCK_SIZE = 32;
const CANVAS_WIDTH = TETRIS_HORIZONTAL_BLOCKS * BLOCK_SIZE;
const CANVAS_HEIGHT = TETRIS_VERTICAL_BLOCKS * BLOCK_SIZE;

export default function Game() {
  return (
    <canvas
      className={styles.canvas}
      data-testid="game-canvas"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
    />
  );
}
