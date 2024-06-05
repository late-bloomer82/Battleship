import { Ship } from "../src/shipClass";

describe("ship object properties", () => {
  it("should have three properties : length, hitCount and status, with hitCount set to 0 and status set to floating", () => {
    const bigShip = new Ship(4, 0, "floating");
    expect(bigShip.length).toBe(4);
    expect(bigShip.hitCount).toBe(0);
    expect(bigShip.status).toBe("floating");
  });
});

describe("ship object methods", () => {
  it("should increment the hitCount when the method is called", () => {
    const bigShip = new Ship(4, 0, "floating");
    bigShip.hit();
    expect(bigShip.hitCount).toBe(1);
  });

  it("should return true if the ship is sunk", () => {
    const bigShip = new Ship(4, 0, "floating");
    for (let i = 0; i < 4; i++) {
      bigShip.hit();
    }
    expect(bigShip.isSunk()).toBeTruthy();
  });

  it("should return false if the ship is not sunk", () => {
    const bigShip = new Ship(4, 0, "floating");
    for (let i = 0; i < 3; i++) {
      bigShip.hit();
    }
    expect(bigShip.isSunk()).toBeFalsy();
  });
});
