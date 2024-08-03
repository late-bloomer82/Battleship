export class Gameboard {
  constructor(rows = 10, columns = 10) {
    this.rows = rows;
    this.columns = columns;
    this.gameboard = this.createGameBoard();
  }
  createGameBoard() {
    const rows = 10; // Number of rows
    const columns = 10; // Number of columns
    const size = rows * columns;
    const gameboard = [];

    let x = 0;
    let y = 0;

    for (let i = 0; i < size; i++) {
      const coordinate = { coordinates: [x, y], ship: null };
      gameboard.push(coordinate);

      y++;
      if (y == columns) {
        x++;
        y = 0;
      }
    }
    return gameboard;
  }

  // Helper function to place ship in the gameboard object
  placeShipObject(left, top, ship, size) {
    console.log(playerGameboard);
    ship.position = { left: left, top: top };
    let axisIncrement =
      ship.axis === "y" ? { left: 0, top: 10 } : { left: 10, top: 0 };

    for (let i = 0; i < size; i++) {
      let matchingCoordinateIndex = this.findShipCoordinateIndex(left, top);
      this.gameboard[matchingCoordinateIndex].ship = ship;
      left += axisIncrement.left;
      top += axisIncrement.top;
    }
  }

  receiveAttack([x, y]) {
    const targetCoordinate = this.gameboard.find(
      (coordinate) =>
        coordinate.coordinates[0] == x && coordinate.coordinates[1] == y
    );
    if (targetCoordinate.ship === null) {
      // Initialize missedAttacks if it doesn’t exist
      if (!targetCoordinate.missedAttacks) {
        targetCoordinate.missedAttacks = [];
      }
      targetCoordinate.missedAttacks.push([x, y]);
    } else {
      targetCoordinate.ship.hit();
    }
  }
  percentageToGridCoordinate(percentage) {
    return Math.floor((percentage / 100) * 10);
  }

  findShipCoordinateIndex(left, top) {
    const x = this.percentageToGridCoordinate(left);
    const y = this.percentageToGridCoordinate(top);
    console.log([x, y]);
    return this.gameboard.findIndex(
      (shipObject) =>
        shipObject.coordinates[0] == x && shipObject.coordinates[1] == y
    );
  }

  checkGameboardStatus() {
    // Find all coordinates with a ship
    const shipCoordinatesArray = this.gameboard.filter(
      (coordinate) => coordinate.ship != null
    );
    if (shipCoordinatesArray.every((element) => element.ship.isSunk())) {
      console.log("All ships are sunk");
    }
  }
}

export const playerGameboard = new Gameboard(10, 10);
export const computerGameboard = new Gameboard(10, 10);
