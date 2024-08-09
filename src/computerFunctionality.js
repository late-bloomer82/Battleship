import { computerGameboard, playerGameboard } from "./classes/gameboard";
import {
  computerBattleship,
  computerCarrier,
  computerCruiser,
  computerDestroyer,
  computerSubmarine,
} from "./classes/ship";

export function setupComputerGameboard() {
  computerGameboard.placeShipObject(
    computerCarrier.position.left,
    computerCarrier.position.top,
    computerCarrier,
    computerCarrier.length
  );
  computerGameboard.placeShipObject(
    computerBattleship.position.left,
    computerBattleship.position.top,
    computerBattleship,
    computerBattleship.length
  );
  computerGameboard.placeShipObject(
    computerCruiser.position.left,
    computerCruiser.position.top,
    computerCruiser,
    computerCruiser.length
  );
  computerGameboard.placeShipObject(
    computerSubmarine.position.left,
    computerSubmarine.position.top,
    computerSubmarine,
    computerSubmarine.length
  );
  computerGameboard.placeShipObject(
    computerDestroyer.position.left,
    computerDestroyer.position.top,
    computerDestroyer,
    computerDestroyer.length
  );
}

export function randomAttackGenerator() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return [x, y];
}

export function findAttackedSquare(x, y, squares) {
  console.log("nodeSquares", squares);
  console.log("gameboard", playerGameboard.gameboard);
  const attackedSquareIndex = playerGameboard.gameboard.findIndex(
    (coordinate) =>
      coordinate.coordinates[0] === y && coordinate.coordinates[1] === x
  ); /*The reason im inverting the x and y is because i need to find the opposite coordinate(x and y inversed) since the 
     gameboard array coordinates are initalized in a vertical order while the DOM squares nodes array is returned or initalized horizontally. 
     So to get the accurate index for the DOM squares array,inverting the x and y in the findIndex function is needed.*/
  console.log(attackedSquareIndex);
  return squares[attackedSquareIndex];
}
