export class Ship {
  constructor(
    length,
    hitCount = 0,
    status = "floating",
    name,
    position,
    axis = "x"
  ) {
    this.name = name;
    this.length = length;
    this.hitCount = hitCount;
    this.status = status;
    this.position = position;
    this.axis = axis;
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    if (this.hitCount === this.length) {
      this.status = "sunken";
      return true;
    } else {
      return false;
    }
  }
}

export const playerCarrier = new Ship(5, 0, "floating", "carrier");
export const playerBattleship = new Ship(4, 0, "floating", "battleship");
export const playerCruiser = new Ship(3, 0, "floating", "cruiser");
export const playerSubmarine = new Ship(3, 0, "floating", "submarine");
export const playerDestroyer = new Ship(2, 0, "floating", "destroyer");

export const computerCarrier = new Ship(5, 0, "floating", "carrier");
export const computerBattleship = new Ship(4, 0, "floating", "battleship");
export const computerCruiser = new Ship(3, 0, "floating", "cruiser");
export const computerSubmarine = new Ship(3, 0, "floating", "submarine");
export const computerDestroyer = new Ship(2, 0, "floating", "destroyer");
