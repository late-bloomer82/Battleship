import {
  computerBattleship,
  computerCarrier,
  computerCruiser,
  computerDestroyer,
  computerSubmarine,
} from "../classes/ship";
import { setShip } from "./renderGameboard";
import {
  carrierSrc,
  battleshipSrc,
  cruiserSrc,
  submarineSrc,
  destroyerSrc,
} from "./domSetupPage";

export function handleHitSquare(square) {
  const dot = document.createElement("div");
  square.appendChild(dot);
  square.classList.add("hit-disabled");
}

export function handleMissedSquare(square) {
  const dot = document.createElement("div");
  square.appendChild(dot);
  square.classList.add("missed-disabled");
}

const computerShips = [
  { instance: computerCarrier, src: carrierSrc, width: "50%" },
  { instance: computerBattleship, src: battleshipSrc, width: "40%" },
  { instance: computerCruiser, src: cruiserSrc, width: "30%" },
  { instance: computerSubmarine, src: submarineSrc, width: "30%" },
  { instance: computerDestroyer, src: destroyerSrc, width: "20%" },
];

export function revealShipIfSunk(computerGrid) {
  let indexToRemove = null;
  for (let i = 0; i < computerShips.length; i++) {
    if (computerShips[i].instance.isSunk()) {
      setShip(
        {
          src: computerShips[i].src,
          width: computerShips[i].width,
          shipInstance: computerShips[i].instance,
          position: computerShips[i].instance.position,
        },
        computerGrid
      );
      indexToRemove = i;
    }
  }
  if (indexToRemove != null) {
    computerShips.splice(indexToRemove, 1);
  }
}

export function selectPlayerSquares() {
  const playerGrid = document.getElementById("player-grid");
  return playerGrid.querySelectorAll(".squares");
}

export function selectComputerGrid() {
  return document.getElementById("computer-grid");
}

function gameOverScreen() {
  //
}
