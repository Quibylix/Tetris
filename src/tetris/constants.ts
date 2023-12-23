export const TETRIS_HORIZONTAL_BLOCKS = 10;
export const TETRIS_VERTICAL_BLOCKS = 20;
export const BLOCK_SIZE = 32;
export const CANVAS_WIDTH = TETRIS_HORIZONTAL_BLOCKS * BLOCK_SIZE;
export const CANVAS_HEIGHT = TETRIS_VERTICAL_BLOCKS * BLOCK_SIZE;

export const PIECES = ["O", "T", "Z", "S", "J", "I", "L"] as const;

export const COLORS = {
  O: "#fbc02d",
  T: "#7b1fa2",
  Z: "#e53935",
  S: "#43a047",
  J: "#1565c0",
  I: "#00acc1",
  L: "#fb8c00",
} as const;

export const SHAPES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
} as const;

export const MAX_LEVEL = 10;
