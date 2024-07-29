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
    this.gameboard = [];
  }

  placeShipObject(x, y, shipId) {
    switch (shipId) {
      case "carrierContainer":
        playerCarrier.position = { left: x, top: y };
        this.gameboard.push(playerCarrier);
        break;

      case "battleshipContainer":
        playerBattleship.position = { left: x, top: y };
        this.gameboard.push(playerBattleship);
        break;

      case "cruiserContainer":
        playerCruiser.position = { left: x, top: y };
        this.gameboard.push(playerCruiser);
        break;

      case "submarineContainer":
        playerSubmarine.position = { left: x, top: y };
        this.gameboard.push(playerSubmarine);
        break;

      case "destroyerContainer":
        playerDestroyer.position = { left: x, top: y };
        this.gameboard.push(playerDestroyer);
    }
  }

  receiveAttack([x, y]) {
    const targetshipObject = this.gameboard.find(
      (shipObject) =>
        shipObject.position.left == x && shipObject.position.top == y
    );
    if (targetshipObject.shipObject === null) {
      //Create an missedAttack property that contains an array of missed attacks
      targetshipObject.missedAttacks = [[x, y]];
    } else {
      targetshipObject.shipObject.hit();
    }
  }

  findshipObject([x, y]) {
    return this.gameboard.find(
      (shipObject) =>
        shipObject.position.left == x && shipObject.position.top == y
    );
  }

  checkGameboardStatus() {
    //step 1, find all the shipObjectObject objects who have a shipObject.
    const shipObjectsArray = this.gameboard.filter(
      (shipObject) => shipObject.shipObject != null
    );
    if (shipObjectsArray.every((element) => element.shipObject.isSunk())) {
      console.log("All shipObjects are sunk");
    }
  }
}

export const playerGameboard = new Gameboard(10, 10);
export const computerGameboard = new Gameboard(10, 10);
