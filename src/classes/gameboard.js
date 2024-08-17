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

  placeShipObject(left, top, ship, size) {
    ship.position = { left: left, top: top };
    const shipCoordinates = this.getShipCoordinates(left, top, ship, size);
    shipCoordinates.forEach((shipCoordinate) => {
      shipCoordinate.ship = ship;
    });
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
      return false;
    } else {
      targetCoordinate.ship.hit();
      return true;
    }
  }
  percentageToGridCoordinate(percentage) {
    return Math.floor((percentage / 100) * 10);
  }

  findShipCoordinateIndex(left, top) {
    const x = this.percentageToGridCoordinate(left);
    const y = this.percentageToGridCoordinate(top);
    return this.gameboard.findIndex(
      (shipObject) =>
        shipObject.coordinates[0] == x && shipObject.coordinates[1] == y
    );
  }

  getOccupiedCoordinates() {
    return this.gameboard.filter((coordinate) => coordinate.ship != null);
  }

  isShipCollision(newshipCoordinate) {
    const coordinatesArray = this.getOccupiedCoordinates();
    return coordinatesArray.some(
      (coordinate) =>
        newshipCoordinate[0] === coordinate.coordinates[0] &&
        newshipCoordinate[1] === coordinate.coordinates[1]
    );
  }

  getShipCoordinates(left, top, ship, size) {
    const shipCoordinates = [];
    let axisIncrement =
      ship.axis === "y" ? { left: 0, top: 10 } : { left: 10, top: 0 };
    for (let i = 0; i < size; i++) {
      let matchingCoordinateIndex = this.findShipCoordinateIndex(left, top);
      const shipCoordinate = this.gameboard[matchingCoordinateIndex];
      if (!shipCoordinate) {
        return false;
      }
      if (this.isShipCollision(shipCoordinate.coordinates)) {
        return false;
      }
      shipCoordinates.push(shipCoordinate);
      left += axisIncrement.left;
      top += axisIncrement.top;
    }
    return shipCoordinates;
  }
  checkGameboardStatus() {
    // Find all coordinates with a ship
    const coordinatesArray = this.getOccupiedCoordinates();
    if (coordinatesArray.every((element) => element.ship.isSunk())) {
      return true;
    } else {
      return false;
    }
  }
}

export const playerGameboard = new Gameboard(10, 10);
export const computerGameboard = new Gameboard(10, 10);
