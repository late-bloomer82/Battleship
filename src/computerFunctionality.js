import { computerGameboard } from "./classes/gameboard";
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
