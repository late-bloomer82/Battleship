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

  placeShipObject(left, top, shipId) {
    let matchingCoordinateIndex = this.findShipCoordinateIndex(left, top);
    console.log(matchingCoordinateIndex);
    switch (shipId) {
      case "carrierContainer":
        playerCarrier.position = { left: left, top: top };

        //If ship is positioned vertically
        if (playerCarrier.axis === "y") {
          console.log("dog");
          for (let i = 0; i < 5; i++) {
            this.gameboard[matchingCoordinateIndex - i].ship = playerCarrier;
          }
        }
        //If ship is positioned horizontally
        else {
          this.gameboard[matchingCoordinateIndex].ship = playerCarrier;
          for (let i = 0; i < 4; i++) {
            matchingCoordinateIndex += 10;
            this.gameboard[matchingCoordinateIndex].ship = playerCarrier;
          }
        }
        break;

      case "battleshipContainer":
        playerBattleship.position = { left: left, top: top };
        //If ship is positioned vertically
        if (playerBattleship.axis === "y") {
          for (let i = 0; i < 4; i++) {
            this.gameboard[matchingCoordinateIndex - i].ship = playerBattleship;
          }
        }
        //If ship is positioned horizontally
        else {
          this.gameboard[matchingCoordinateIndex].ship = playerBattleship;
          for (let i = 0; i < 3; i++) {
            matchingCoordinateIndex += 10;
            this.gameboard[matchingCoordinateIndex].ship = playerBattleship;
          }
        }
        break;

      case "cruiserContainer":
        playerCruiser.position = { left: left, top: top };
        //If ship is positioned vertically
        if (playerCruiser.axis === "y") {
          for (let i = 0; i < 3; i++) {
            this.gameboard[matchingCoordinateIndex - i].ship = playerCruiser;
          }
        }
        //If ship is positioned horizontally
        else {
          this.gameboard[matchingCoordinateIndex].ship = playerCruiser;
          for (let i = 0; i < 2; i++) {
            matchingCoordinateIndex += 10;
            this.gameboard[matchingCoordinateIndex].ship = playerCruiser;
          }
        }
        break;

      case "submarineContainer":
        playerSubmarine.position = { left: left, top: top };
        //If ship is positioned vertically
        if (playerSubmarine.axis === "y") {
          for (let i = 0; i < 3; i++) {
            this.gameboard[matchingCoordinateIndex - i].ship = playerSubmarine;
          }
        }
        //If ship is positioned horizontally
        else {
          this.gameboard[matchingCoordinateIndex].ship = playerSubmarine;
          for (let i = 0; i < 2; i++) {
            matchingCoordinateIndex += 10;
            this.gameboard[matchingCoordinateIndex].ship = playerSubmarine;
          }
        }
        break;

      case "destroyerContainer":
        playerDestroyer.position = { left: left, top: top };
        //If ship is positioned vertically
        if (playerDestroyer.axis === "y") {
          for (let i = 0; i < 2; i++) {
            this.gameboard[matchingCoordinateIndex - i].ship = playerDestroyer;
          }
        }
        //If ship is positioned horizontally
        else {
          this.gameboard[matchingCoordinateIndex].ship = playerDestroyer;
        }
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
