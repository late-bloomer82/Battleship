export class Gameboard {
  constructor(rows = 10, columns = 10) {
    this.rows = rows;
    this.columns = columns;
    this.gameboard = this.createGameBoard();
  }
  createGameBoard() {
    //Gameboard made of coordinate objects

    const gameboard = [];

    return gameboard;
  }

  placeShip(ship, [x, y]) {
    const coordinate = {
      ship: ship,
      position: { left: x, top: y },
    };
    this.gameboard.push(coordinate);
  }

  receiveAttack([x, y]) {
    const targetCoordinateObject = this.gameboard.find(
      (coordinateObject) =>
        coordinateObject.position.left == x &&
        coordinateObject.position.top == y
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
        coordinateObject.position.left == x &&
        coordinateObject.position.top == y
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

export const playerGameboard = new Gameboard(10, 10);
export const playerGameboardArray = playerGameboard.gameboard;
