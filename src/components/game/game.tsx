import { useEffect, useRef } from "react";
import styles from "./game.module.css";

const TETRIS_HORIZONTAL_BLOCKS = 10;
const TETRIS_VERTICAL_BLOCKS = 20;
const BLOCK_SIZE = 32;
const CANVAS_WIDTH = TETRIS_HORIZONTAL_BLOCKS * BLOCK_SIZE;
const CANVAS_HEIGHT = TETRIS_VERTICAL_BLOCKS * BLOCK_SIZE;

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let x = 0; x < TETRIS_HORIZONTAL_BLOCKS; x++) {
      for (let y = 0; y < TETRIS_VERTICAL_BLOCKS; y++) {
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }, []);

  return (
    <canvas
      className={styles.canvas}
      data-testid="game-canvas"
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
    />
  );
}
