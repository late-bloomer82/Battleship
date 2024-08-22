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

const attackedCoordinates = new Set();
const adjacentCoordinates = [];

// Check if a coordinate has been hit
function isCoordinateHit(x, y) {
  return attackedCoordinates.has(`${x},${y}`);
}

// Generate attack coordinates
export function generateAttack() {
  // Try to attack an adjacent square if available
  const nextAttack = generateAdjacentCoordinateAttack();
  if (nextAttack) {
    return nextAttack;
  }

  // Generate random coordinates until a coordinate that has not been attacked yet is found
  let x, y;
  do {
    x = getRandomCoordinate();
    y = getRandomCoordinate();
  } while (isCoordinateHit(x, y));

  attackedCoordinates.add(`${x},${y}`);
  processHit(x, y);

  return [x, y];
}

// Generate an attack based on adjacent coordinates
function generateAdjacentCoordinateAttack() {
  if (adjacentCoordinates.length > 0) {
    const [nextX, nextY] = adjacentCoordinates.shift();
    attackedCoordinates.add(`${nextX},${nextY}`);
    processHit(nextX, nextY);
    return [nextX, nextY];
  }
  return null;
}

// Process the result of an attack
function processHit(x, y) {
  const attackedCoordinateIndex = playerGameboard.findShipCoordinateIndex(
    x * 10,
    y * 10
  );
  const attackedCoordinate = playerGameboard.gameboard[attackedCoordinateIndex];

  // If the coordinate exists and contains a ship
  if (attackedCoordinate && attackedCoordinate.ship != null) {
    if (attackedCoordinate.ship.axis === "x") {
      const adjacentCoordinatesX = getAdjacentCoordinatesX(
        attackedCoordinateIndex
      );
      updateAdjacentCoordinates(x, y, adjacentCoordinatesX, true);
    } else if (attackedCoordinate.ship.axis === "y") {
      const adjacentCoordinatesY = getAdjacentCoordinatesY(
        attackedCoordinateIndex
      );
      updateAdjacentCoordinates(x, y, adjacentCoordinatesY, false);
    }
  }
}

// Get adjacent coordinates for horizontal ships
function getAdjacentCoordinatesX(index) {
  return {
    right: playerGameboard.gameboard[index + 10],
    left: playerGameboard.gameboard[index - 10],
  };
}

// Get adjacent coordinates for vertical ships
function getAdjacentCoordinatesY(index) {
  return {
    top: playerGameboard.gameboard[index + 1],
    bottom: playerGameboard.gameboard[index - 1],
  };
}

// Update adjacent coordinates based on ship orientation
function updateAdjacentCoordinates(x, y, adjacentCoords, isHorizontal) {
  //If x axis selected
  if (isHorizontal) {
    if (
      adjacentCoords.right &&
      adjacentCoords.right.missedAttacks === undefined &&
      !isCoordinateHit(
        adjacentCoords.right.coordinates[0],
        adjacentCoords.right.coordinates[1]
      )
    ) {
      adjacentCoordinates.push([x + 1, y]); // Right
    }
    if (
      adjacentCoords.left &&
      adjacentCoords.left.missedAttacks === undefined &&
      !isCoordinateHit(
        adjacentCoords.left.coordinates[0],
        adjacentCoords.left.coordinates[1]
      )
    ) {
      adjacentCoordinates.push([x - 1, y]); // Left
    }
  }
  //If y axis selected
  else {
    if (
      adjacentCoords.top &&
      adjacentCoords.top.missedAttacks === undefined &&
      !isCoordinateHit(
        adjacentCoords.top.coordinates[0],
        adjacentCoords.top.coordinates[1]
      )
    ) {
      adjacentCoordinates.push([x, y + 1]); // Bottom
    }
    if (
      adjacentCoords.bottom &&
      adjacentCoords.bottom.missedAttacks === undefined &&
      !isCoordinateHit(
        adjacentCoords.bottom.coordinates[0],
        adjacentCoords.bottom.coordinates[1]
      )
    ) {
      adjacentCoordinates.push([x, y - 1]); // Top
    }
  }
}

// Helper function to get a random coordinate between 0 and 9
function getRandomCoordinate() {
  return Math.floor(Math.random() * 10);
}

export function findAttackedDomSquare(x, y, squares) {
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
