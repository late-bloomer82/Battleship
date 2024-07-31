import {
  playerBattleship,
  playerCarrier,
  playerCruiser,
  playerDestroyer,
  playerSubmarine,
} from "./shipClass";

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

    let x = 0;
    let y = 0;
    const gameboard = [];

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

  placeShipObject(left, top, shipId) {
    const matchingCoordinateIndex = this.findShipCoordinateIndex(left, top);
    console.log(matchingCoordinateIndex);
    switch (shipId) {
      case "carrierContainer":
        playerCarrier.position = { left: left, top: top };
        this.gameboard[matchingCoordinateIndex].ship = playerCarrier;

        break;

      case "battleshipContainer":
        playerBattleship.position = { left: left, top: top };
        this.gameboard[matchingCoordinateIndex].ship = playerBattleship;
        break;

      case "cruiserContainer":
        playerCruiser.position = { left: left, top: top };
        this.gameboard[matchingCoordinateIndex].ship = playerCruiser;
        break;

      case "submarineContainer":
        playerSubmarine.position = { left: left, top: top };
        this.gameboard[matchingCoordinateIndex].ship = playerSubmarine;
        break;

      case "destroyerContainer":
        playerDestroyer.position = { left: left, top: top };
        this.gameboard[matchingCoordinateIndex].ship = playerDestroyer;
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
