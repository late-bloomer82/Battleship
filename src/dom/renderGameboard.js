import { createGrid } from "./domSetupPage";
import { addClass } from "./shipPlacement";
import {
  carrierSrc,
  battleshipSrc,
  cruiserSrc,
  destroyerSrc,
  submarineSrc,
} from "./domSetupPage";
import {
  playerBattleship,
  playerCarrier,
  playerCruiser,
  playerDestroyer,
  playerSubmarine,
} from "../classes/ship";
import { humanUser } from "../classes/player";

// Player gameboard

export function createPlayerGameboard(gameboard) {
  const numberOfSquares = gameboard.rows * gameboard.columns;
  createGrid(numberOfSquares);
}

export function populatePlayerGameboard() {
  const playerGrid = document.getElementById("player-grid");
  const playerShips = humanUser.ships;

  for (let key in playerShips) {
    const ship = playerShips[key]; // Access the ship object using the key
    if (ship.position != null) {
      const { name, position } = ship;
      const shipDetails = getShipDetails(name, position);
      if (shipDetails) {
        setShip(shipDetails, playerGrid);
      }
    }
  }
}

function getShipDetails(shipName, position) {
  const shipData = {
    carrier: { src: carrierSrc, width: "50%", shipInstance: playerCarrier },
    battleship: {
      src: battleshipSrc,
      width: "40%",
      shipInstance: playerBattleship,
    },
    cruiser: { src: cruiserSrc, width: "30%", shipInstance: playerCruiser },
    submarine: {
      src: submarineSrc,
      width: "30%",
      shipInstance: playerSubmarine,
    },
    destroyer: {
      src: destroyerSrc,
      width: "20%",
      shipInstance: playerDestroyer,
    },
  };
  return shipData[shipName] ? { ...shipData[shipName], position } : null;
}

export function setShip({ src, width, shipInstance, position }, grid) {
  const { left, top } = position;

  const shipImg = document.createElement("img");
  shipImg.className = "shipImg";
  shipImg.classList.add("placed-ships");
  shipImg.src = src;
  shipImg.style.position = "absolute";
  shipImg.style.height = "10%";
  shipImg.style.width = width;
  shipImg.style.left = `${left}%`;
  shipImg.style.top = `${top}%`;

  if (shipInstance.axis === "y") {
    addClass(shipImg);
  }

  grid.appendChild(shipImg);
}
