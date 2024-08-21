import { Ship } from "../src/classes/ship";

describe("ship object properties", () => {
  it("should have six properties : length, hitCount,status,name,position and axis with hitCount set to 0, status set to floating and axis set to x", () => {
    const carrierShip = new Ship(
      4,
      0,
      "floating",
      "carrier",
      { left: 10, top: 20 },
      "x"
    );
    expect(carrierShip.length).toBe(4);
    expect(carrierShip.hitCount).toBe(0);
    expect(carrierShip.status).toBe("floating");
    expect(carrierShip.name).toBe("carrier");
    expect(carrierShip.position).toEqual({ left: 10, top: 20 });
    expect(carrierShip.axis).toBe("x");
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

  it("should set ship status to sunken if ship hitCount equals length", () => {
    const bigShip = new Ship(3, 0, "floating");
    for (let i = 0; i < 3; i++) {
      bigShip.hit();
    }
    bigShip.isSunk();
    expect(bigShip.status).toBe("sunken");
  });

  it("should return false if the ship is not sunk", () => {
    const bigShip = new Ship(4, 0, "floating");
    for (let i = 0; i < 3; i++) {
      bigShip.hit();
    }
    expect(bigShip.isSunk()).toBeFalsy();
  });

  it("should set the default properties of hitCount, status and axis to 0, floating and x respectively.", () => {
    const bigShip = new Ship();

    expect(bigShip.hitCount).toBe(0);
    expect(bigShip.status).toBe("floating");
    expect(bigShip.axis).toBe("x");
  });
});
