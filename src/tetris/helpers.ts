import { MAX_LEVEL, PIECES } from "./constants";

export function getRandomPieceName() {
  const name = PIECES[Math.floor(Math.random() * PIECES.length)];
  return name;
}

export function rotateMatrix(matrix: number[][], clockwise = true) {
  const newMatrix = Array(matrix[0].length)
    .fill(null)
    .map(() => Array(matrix.length).fill(null));

  matrix.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      clockwise
        ? (newMatrix[colIndex][matrix.length - rowIndex - 1] = value)
        : (newMatrix[matrix[0].length - colIndex - 1][rowIndex] = value);
    });
  });

  return newMatrix;
}

type RectInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
  fillStyle: string;
  strokeStyle: string;
};

export function drawRectWithBorder(
  ctx: CanvasRenderingContext2D,
  { x, y, width, height, fillStyle, strokeStyle }: RectInfo,
) {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(x, y, width, height);

  ctx.strokeStyle = strokeStyle;
  ctx.strokeRect(x, y, width, height);
}

export function getLevel(fullRowsCount: number) {
  return Math.min(MAX_LEVEL, Math.floor(fullRowsCount / 8) + 1);
}
