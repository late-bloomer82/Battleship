import { Gameboard } from "../src/classes/gameboard";
import { Ship } from "../src/classes/ship";

describe("gameboard class", () => {
  let gameboardExample;
  let shipExample1;
  let shipExample2;
  let shipExample3;

  beforeEach(() => {
    gameboardExample = new Gameboard(10, 10);
    shipExample1 = new Ship(5, 0, "floating", "carrier");
    shipExample2 = new Ship(4, 4, "floating", "battleship");
    shipExample3 = new Ship(3, 3, "floating", "cruiser");
  });

  // createGameboard method
  it("should return a gameboard of 100 squares", () => {
    expect(gameboardExample.gameboard.length).toBe(100);
  });

  it("should generate proper coordinates", () => {
    expect(gameboardExample.gameboard[0].coordinates).toEqual([0, 0]); // First cell
    expect(gameboardExample.gameboard[99].coordinates).toEqual([9, 9]); // Last cell
    expect(gameboardExample.gameboard[44].coordinates).toEqual([4, 4]); // Middle cell
  });

  // placeShipObject method
  it("should place a ship at the desired coordinates", () => {
    gameboardExample.placeShipObject(20, 20, shipExample1, shipExample1.length);

    const occupiedCoordinates = gameboardExample.getOccupiedCoordinates();
    let x = 2;
    occupiedCoordinates.forEach((occupiedCoordinate) => {
      expect(occupiedCoordinate.coordinates).toEqual([x, 2]);
      x++;
    });
  });

  it("should record the coordinates of a missed attack", () => {
    gameboardExample.receiveAttack([5, 6]);
    const targetCoordinate = gameboardExample.gameboard.find(
      (coordinate) =>
        coordinate.coordinates[0] == 5 && coordinate.coordinates[1] == 6
    );
    expect(targetCoordinate.missedAttacks).toEqual([[5, 6]]);
  });

  // findShipCoordinateIndex method
  it("should find the desired index", () => {
    const coordinateObject = gameboardExample.findShipCoordinateIndex(10, 10);
    expect(coordinateObject).toBe(11);
  });

  // checkGameboardStatus method case 1
  it("should return true if all ships are sunk", () => {
    shipExample1.hitCount = 5;
    shipExample2.hitCount = 4;
    shipExample3.hitCount = 3;
    gameboardExample.placeShipObject(20, 30, shipExample1, shipExample1.length);
    gameboardExample.placeShipObject(20, 40, shipExample2, shipExample2.length);
    gameboardExample.placeShipObject(20, 50, shipExample3, shipExample3.length);

    expect(gameboardExample.checkGameboardStatus()).toBeTruthy();
  });

  // checkGameboardStatus method case 2
  it("should return false if all ships are not sunk", () => {
    gameboardExample.placeShipObject(20, 30, shipExample1, shipExample1.length);
    gameboardExample.placeShipObject(20, 40, shipExample2, shipExample2.length);
    gameboardExample.placeShipObject(20, 50, shipExample3, shipExample3.length);

    expect(gameboardExample.checkGameboardStatus()).toBeFalsy();
  });

  // getShipCoordinates method case 1
  it("should return the right ship coordinates", () => {
    const shipCoordinates = gameboardExample.getShipCoordinates(
      10,
      10,
      shipExample1,
      shipExample1.length
    );
    let x = 1;
    shipCoordinates.forEach((shipCoordinate) => {
      expect(shipCoordinate.coordinates).toEqual([x, 1]);
      x++;
    });
  });

  // getShipCoordinates method case 2
  it("should return false if the ship coordinate is out of bounds", () => {
    expect(
      gameboardExample.getShipCoordinates(
        110,
        10,
        shipExample1,
        shipExample1.length
      )
    ).toBeFalsy();
  });

  // getShipCoordinates method case 3
  it("should return false if there is a collision", () => {
    gameboardExample.placeShipObject(10, 10, shipExample1, shipExample1.length);
    const shipExample2 = new Ship(3, 2, "floating", "cruiser");
    expect(
      gameboardExample.getShipCoordinates(
        30,
        10,
        shipExample2,
        shipExample2.length
      )
    ).toBeFalsy();
  });
  // getShipCoordinates method case 4
  it("if ship axis equals y execution path should work properly", () => {
    const shipExample1 = new Ship(3, 2, "floating", "cruiser", null, "y");

    expect(
      gameboardExample.getShipCoordinates(
        20,
        60,
        shipExample1,
        shipExample1.length
      )
    ).toBeInstanceOf(Array);
  });

  // isShipCollision method
  it("detects a collision when there is one and returns true", () => {
    gameboardExample.placeShipObject(20, 30, shipExample1, shipExample1.length);
    expect(gameboardExample.isShipCollision([2, 3])).toBeTruthy();
    expect(gameboardExample.isShipCollision([3, 3])).toBeTruthy();
    expect(gameboardExample.isShipCollision([4, 3])).toBeTruthy();
  });

  // getOccupiedCoordinates method
  it("gets all the coordinates that contain a ship", () => {
    gameboardExample.placeShipObject(20, 30, shipExample1, shipExample1.length);
    gameboardExample.placeShipObject(20, 40, shipExample2, shipExample2.length);
    gameboardExample.placeShipObject(20, 50, shipExample3, shipExample3.length);
    const occupiedCoordinatesArray = gameboardExample.getOccupiedCoordinates();
    expect(occupiedCoordinatesArray.length).toBe(12);
    occupiedCoordinatesArray.forEach((occupiedCoordinate) => {
      expect(occupiedCoordinate.ship).not.toBeNull();
    });
  });

  // percentageToGridCoordinate method
  it("should return the corresponding grid coordinate", () => {
    const x = gameboardExample.percentageToGridCoordinate(56);
    expect(x).toBe(5);
  });

  // receiveAttack method case 1
  it("should increase the hit count of a ship when that coordinate receives an attack", () => {
    gameboardExample.placeShipObject(20, 20, shipExample1, shipExample1.length);
    gameboardExample.receiveAttack([2, 2]);
    expect(shipExample1.hitCount).toBe(1);
  });

  // receiveAttack method case 2
  it("should return true if a ship receives an attack", () => {
    gameboardExample.placeShipObject(20, 20, shipExample1, shipExample1.length);
    expect(gameboardExample.receiveAttack([2, 2])).toBeTruthy();
  });

  // receiveAttack method case 3
  it("should return false if there is no ship at the attacked coordinate", () => {
    gameboardExample.placeShipObject(20, 20, shipExample1, shipExample1.length);
    expect(gameboardExample.receiveAttack([9, 8])).toBeFalsy();
  });
  // receiveAttack method case 4
  it("should work well if the coordinate object doest not have a missedAttacks property", () => {
    const x = 5;
    const y = 5;
    const gameboardArray = gameboardExample.gameboard;
    const targetCoordinate = gameboardArray.findIndex(
      (coordinate) =>
        coordinate.coordinates[0] == x && coordinate.coordinates[1] == y
    );
    expect(gameboardArray[targetCoordinate].ship).toBeNull();
    expect(gameboardArray[targetCoordinate].missedAttacks).toBeFalsy();
    gameboardExample.receiveAttack([x, y]);
    expect(gameboardArray[targetCoordinate].missedAttacks).toEqual([[x, y]]);
  });
  //Gameboard object properties
  it("default property values of rows and columns should be 10", () => {
    const gameboard = new Gameboard();
    expect(gameboard.rows).toBe(10);
    expect(gameboard.columns).toBe(10);
  });
});
