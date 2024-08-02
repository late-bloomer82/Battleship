import { computerGameboard, playerGameboard } from "./gameboard";
import {
  computerBattleship,
  computerCarrier,
  computerCruiser,
  computerDestroyer,
  computerSubmarine,
  playerBattleship,
  playerCarrier,
  playerCruiser,
  playerDestroyer,
  playerSubmarine,
} from "./ship";

class Player {
  constructor(type, gameboard, ships) {
    this.type = type;
    this.gameboard = gameboard;
    this.ships = ships;
  }
}

export const humanUser = new Player("real", playerGameboard, {
  playerCarrier,
  playerBattleship,
  playerCruiser,
  playerSubmarine,
  playerDestroyer,
});
export const computer = new Player("computer", computerGameboard, {
  computerCarrier,
  computerBattleship,
  computerCruiser,
  computerSubmarine,
  computerDestroyer,
});
