export class Gameboard {
  constructor(rows = 10, columns = 10) {
    this.rows = rows;
    this.columns = columns;
    this.gameboard = this.createGameBoard();
  }
  createGameBoard() {
    const size = this.rows * this.columns;
    //Gameboard made of coordinate objects
    //Maybe I should of created the gameboard manually instead of using a loop
    const gameboard = [];

    let x = 1;
    let y = 1;

    for (let i = 0; i < size; i++) {
      const coordinate = { coordinates: [x, y], ship: null };
      gameboard.push(coordinate);
      if (y == 10) {
        x++;
        y = 0;
      }
      y++;
    }
    return gameboard;
  }

  placeShip(ship, [x, y]) {
    const targetCoordinate = this.gameboard.find(
      (coordinateObject) =>
        coordinateObject.coordinates[0] == x &&
        coordinateObject.coordinates[1] == y
    );
    targetCoordinate.ship = ship;
  }

  receiveAttack([x, y]) {
    const targetCoordinateObject = this.gameboard.find(
      (coordinateObject) =>
        coordinateObject.coordinates[0] == x &&
        coordinateObject.coordinates[1] == y
    );
    if (targetCoordinateObject.ship === null) {
      //Create an missedAttack property that contains an array of missed attacks
      targetCoordinateObject.missedAttacks = [[x, y]];
    } else {
      targetCoordinateObject.ship.hit();
    }
  }

  findCoordinateObject([x, y]) {
    return this.gameboard.find(
      (coordinateObject) =>
        coordinateObject.coordinates[0] == x &&
        coordinateObject.coordinates[1] == y
    );
  }

  checkGameboardStatus() {
    //step 1, find all the coordinate objects who have a ship.
    const shipsArray = this.gameboard.filter(
      (coordinateObject) => coordinateObject.ship != null
    );
    if (shipsArray.every((element) => element.ship.isSunk())) {
      console.log("All ships are sunk");
    }
  }
}
