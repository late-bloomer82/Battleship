import { createGrid } from "./domSetupPage";

export function createPlayerGameboard(gameboard) {
  const numberOfSquares = gameboard.rows * gameboard.columns;

  createGrid(numberOfSquares);
}
