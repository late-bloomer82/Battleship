import { createGrid, rotateImage } from "./domSetupPage";
import {
  carrierSrc,
  battleshipSrc,
  cruiserSrc,
  destroyerSrc,
  submarineSrc,
} from "./domSetupPage";
import { playerGameboard } from "./gameboard";
import {
  playerBattleship,
  playerCarrier,
  playerCruiser,
  playerDestroyer,
  playerSubmarine,
} from "./shipClass";

export function createPlayerGameboard(gameboard) {
  const numberOfSquares = gameboard.rows * gameboard.columns;

  createGrid(numberOfSquares);
}

export function populatePlayerGameboard() {
  const gameboardArray = playerGameboard.gameboard;
  gameboardArray.forEach((ship) => {
    switch (ship.name) {
      case "carrier":
        setShip(ship, carrierSrc);
        break;

      case "battleship":
        setShip(ship, battleshipSrc);
        break;

      case "cruiser":
        setShip(ship, cruiserSrc);
        break;

      case "submarine":
        setShip(ship, submarineSrc);
        break;

      case "destroyer":
        setShip(ship, destroyerSrc);
    }
  });
}

function setShip(ship, imageSrc) {
  const playerGrid = document.getElementById("player-grid");
  const left = ship.position.left;
  const top = ship.position.top;

  const shipImg = document.createElement("img");
  shipImg.src = imageSrc;
  playerGrid.appendChild(shipImg);
  shipImg.style.position = "absolute";
  shipImg.style.height = "10%";

  switch (imageSrc) {
    case carrierSrc:
      shipImg.style.width = "50%";
      if (playerCarrier.axis === "y") {
        rotateImage(shipImg, 90);
        shipImg.style.left = `${left - 20}%`;
        shipImg.style.top = `${top}%`;
      } else {
        shipImg.style.left = `${left}%`;
        shipImg.style.top = `${top}%`;
      }

      break;

    case battleshipSrc:
      shipImg.style.width = "40%";
      if (playerBattleship.axis === "y") {
        rotateImage(shipImg, 90);
        shipImg.style.left = `${left - 15}%`;
        shipImg.style.top = `${top - 15}%`;
      } else {
        shipImg.style.left = `${left}%`;
        shipImg.style.top = `${top}%`;
      }

      break;

    case cruiserSrc:
      shipImg.style.width = "40%";
      if (playerCruiser.axis === "y") {
        rotateImage(shipImg, 90);
        shipImg.style.left = `${left - 15}%`;
        shipImg.style.top = `${top - 15}%`;
      } else {
        shipImg.style.left = `${left}%`;
        shipImg.style.top = `${top}%`;
      }

      break;

    case submarineSrc:
      shipImg.style.width = "30%";
      if (playerSubmarine.axis === "y") {
        rotateImage(shipImg, 90);
        shipImg.style.left = `${left - 10}%`;
        shipImg.style.top = `${top - 10}%`;
      } else {
        shipImg.style.left = `${left}%`;
        shipImg.style.top = `${top}%`;
      }

      break;

    case destroyerSrc:
      shipImg.style.width = "20%";
      if (playerDestroyer.axis === "y") {
        rotateImage(shipImg, 90);
        shipImg.style.left = `${left - 5}%`;
        shipImg.style.top = `${top - 5}%`;
      } else {
        shipImg.style.left = `${left}%`;
        shipImg.style.top = `${top}%`;
      }
  }
}
