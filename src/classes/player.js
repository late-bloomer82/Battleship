import { computerGameboard, playerGameboard } from "./gameboard";

class Player {
  constructor(type, gameboard) {
    this.type = type;
    this.gameboard = gameboard;
  }
}

export const player = new Player("real", playerGameboard);
export const computer = new Player("computer", computerGameboard);
