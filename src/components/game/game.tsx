import { TetrisGame } from "@/tetris";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/tetris/constants";
import { useEffect, useRef, useState } from "react";
import styles from "./game.module.css";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    if (!startGame) return;

    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const game = new TetrisGame(canvas);
    game.run();
  }, [startGame]);

  return (
    <>
      <canvas
        className={styles.canvas}
        data-testid="game-canvas"
        tabIndex={0}
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
      {!startGame && (
        <button className={styles.startGame} onClick={() => setStartGame(true)}>
          Start Game
        </button>
      )}
    </>
  );
}
