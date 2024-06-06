import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/shipClass";

describe("gameboard class", () => {
  it("should return a gameboard of 100 squares", () => {
    const gameboardExample = new Gameboard(10, 10);
    expect(gameboardExample.gameboard.length).toBe(100);
  });

  it("should generate proper coordinates", () => {
    const gameboardExample = new Gameboard(10, 10);
    expect(gameboardExample.gameboard[0].coordinates).toEqual([1, 1]); // First cell
    expect(gameboardExample.gameboard[99].coordinates).toEqual([10, 10]); // Last cell
    expect(gameboardExample.gameboard[44].coordinates).toEqual([5, 5]); // Middle cell
  });

  it("should place a ship at the desired coordinates", () => {
    const gameboardExample = new Gameboard(10, 10);
    const shipExample = new Ship(3, 0, "floating");

    gameboardExample.placeShip(shipExample, [5, 6]);
    const targetCoordinate = gameboardExample.gameboard.find(
      (coordinate) =>
        coordinate.coordinates[0] == 5 && coordinate.coordinates[1] == 6
    );

    expect(targetCoordinate.ship).toEqual({
      length: 3,
      hitCount: 0,
      status: "floating",
    });
  });

  it("should record the coordinates of a missed attack", () => {
    const gameboardExample = new Gameboard(10, 10);
    gameboardExample.receiveAttack([5, 6]);
    const targetCoordinate = gameboardExample.gameboard.find(
      (coordinate) =>
        coordinate.coordinates[0] == 5 && coordinate.coordinates[1] == 6
    );
    expect(targetCoordinate.missedAttacks).toEqual([[5, 6]]);
  });

  it("should call the hit function and increase the hitCount of a ship if the ship gets hit", () => {
    const gameboardExample = new Gameboard(10, 10);
    const shipExample = new Ship(3, 0, "floating");
    gameboardExample.placeShip(shipExample, [5, 6]);
    gameboardExample.receiveAttack([5, 6]);

    const hitCoordinate = gameboardExample.gameboard.find(
      (coordinate) =>
        coordinate.coordinates[0] == 5 && coordinate.coordinates[1] == 6
    );
    const hitShip = hitCoordinate.ship;

    expect(hitShip.hitCount).toBe(1);
  });

  it("should find the desired coordinate", () => {
    const gameboardExample = new Gameboard(10, 10);
    const coordinateObject = gameboardExample.findCoordinateObject([2, 2]);
    expect(coordinateObject).toEqual({ coordinates: [2, 2], ship: null });
  });

  it("should console log a particular message if a gameboard's ships are sunk", () => {
    //Simulating scenario where ships get sunk
    const gameboardExample = new Gameboard(10, 10);
    const shipExample1 = new Ship(3, 2, "floating");
    const shipExample2 = new Ship(3, 2, "floating");
    gameboardExample.placeShip(shipExample1, [5, 5]);
    gameboardExample.placeShip(shipExample2, [6, 6]);
    shipExample1.hit();
    shipExample2.hit();

    console.log = jest.fn();

    gameboardExample.checkGameboardStatus();

    expect(console.log).toHaveBeenCalledWith("All ships are sunk");
  });
});
