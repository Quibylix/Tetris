import { useEffect, useRef } from "react";
import { Board, Piece } from "../../tetris";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  TETRIS_HORIZONTAL_BLOCKS,
  TETRIS_VERTICAL_BLOCKS,
} from "../../tetris/constants";
import styles from "./game.module.css";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const board = new Board(TETRIS_VERTICAL_BLOCKS, TETRIS_HORIZONTAL_BLOCKS);
    const piece = new Piece(0, 0, "S");

    window.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowLeft":
          piece.moveLeft();
          break;
        case "ArrowRight":
          piece.moveRight();
          break;
        case "ArrowDown":
          piece.moveDown();
          break;
      }
    });

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
