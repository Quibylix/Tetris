import { PIECES } from "./constants";

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
