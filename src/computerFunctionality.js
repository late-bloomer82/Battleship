import { computerGameboard, playerGameboard } from "./classes/gameboard";
import { computer } from "./classes/player";

export function setupComputerGameboard() {
  const computerShips = computer.ships;

  Object.keys(computerShips).forEach((key) => {
    const ship = computerShips[key];
    ship.axis = generateRandomAxis();
    const { left, top } = generateValidPositions(ship, ship.length);
    computerGameboard.placeShipObject(left, top, ship, ship.length);
  });
}

const attackedSquares = new Set();

function isCoordinateHit(x, y) {
  return attackedSquares.has(`${x},${y}`);
}

export function randomAttackGenerator() {
  let x, y;
  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (isCoordinateHit(x, y));

  attackedSquares.add(`${x},${y}`);
  return [x, y];
}

export function findAttackedSquare(x, y, squares) {
  const attackedSquareIndex = playerGameboard.gameboard.findIndex(
    (coordinate) =>
      coordinate.coordinates[0] === y && coordinate.coordinates[1] === x
  ); /*The reason im inverting the x and y is because i need to find the opposite coordinate(x and y inversed) since the 
     gameboard array coordinates are initalized in a vertical order while the DOM squares nodes array is returned or initalized horizontally. 
     So to get the accurate index for the DOM squares array,inverting the x and y in the findIndex function is needed.*/
  return squares[attackedSquareIndex];
}

export function generateValidPositions(ship, size) {
  let left, top;
  do {
    ({ left, top } = randomPositionGenerator());
  } while (!isValidCoordinates(left, top, ship, size));
  return { left, top };
}

function isValidCoordinates(left, top, ship, size) {
  const shipCoordinatesArray = computerGameboard.getShipCoordinates(
    left,
    top,
    ship,
    size
  );
  return !!shipCoordinatesArray; // Converts the result to a boolean(true) if getShipCoordinates does return an array
}

function generateRandomAxis() {
  const axisOptions = ["x", "y"];
  const index = Math.floor(Math.random() * 2);
  return axisOptions[index];
}

function randomPositionGenerator() {
  const left = Math.floor((Math.random() * 100) / 10) * 10;
  const top = Math.floor((Math.random() * 100) / 10) * 10;
  return { left, top };
}
