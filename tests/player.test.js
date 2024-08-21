import { Player } from "../src/classes/player";
import { Gameboard } from "../src/classes/gameboard";
import { Ship } from "../src/classes/ship";
describe("player class", () => {
  it("should have 3 properties, a type, a gameboard and ships", () => {
    const gameboardExample = new Gameboard(10, 10);
    const shipExample = new Ship(5, 0, "floating", "carrier");
    const playerExample = new Player("user", gameboardExample, shipExample);
    expect(playerExample.type).toBe("user");
    expect(gameboardExample.gameboard.length).toBe(100);
    expect(playerExample.ships).toEqual({
      length: 5,
      hitCount: 0,
      status: "floating",
      name: "carrier",
      axis: "x",
    });
  });
});
