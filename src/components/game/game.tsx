import { useEffect, useRef } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  TETRIS_HORIZONTAL_BLOCKS,
  TETRIS_VERTICAL_BLOCKS,
} from "./constants";
import styles from "./game.module.css";
import { Board } from "./logic";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const board = new Board(TETRIS_VERTICAL_BLOCKS, TETRIS_HORIZONTAL_BLOCKS);
    board.draw(ctx);
  }, []);

  return (
    <canvas
      className={styles.canvas}
      data-testid="game-canvas"
      tabIndex={0}
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
    />
  );
}
