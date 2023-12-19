import { PIECES } from "./constants";

export function getRandomPieceName() {
  const name = PIECES[Math.floor(Math.random() * PIECES.length)];
  return name;
}
