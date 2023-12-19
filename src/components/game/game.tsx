import { TetrisGame } from "@/tetris";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/tetris/constants";
import { useEffect, useRef } from "react";
import styles from "./game.module.css";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const game = new TetrisGame(canvas);
    game.run();
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
