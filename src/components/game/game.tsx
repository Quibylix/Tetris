import { useEffect, useRef } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  TETRIS_HORIZONTAL_BLOCKS,
  TETRIS_VERTICAL_BLOCKS,
} from "./constants";
import styles from "./game.module.css";
import { Board, Piece } from "./logic";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const board = new Board(TETRIS_VERTICAL_BLOCKS, TETRIS_HORIZONTAL_BLOCKS);
    const piece = new Piece(0, 0, "S");

    let lastSecondTime: number | null;

    function main(time: number) {
      lastSecondTime ?? (lastSecondTime = time);
      const delta = time - lastSecondTime;

      if (delta > 200) {
        piece.moveDown();

        lastSecondTime = time;
      }

      if (!ctx) return;

      board.draw(ctx);
      piece.draw(ctx);

      requestAnimationFrame(main);
    }

    requestAnimationFrame(main);
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
