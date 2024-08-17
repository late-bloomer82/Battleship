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
import {
  generateRandomAllyMessage,
  generateRandomEnemyMessages,
  typeMessage,
} from "../messageFunctionality";
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
export function showGameResultModal(resultType, imageSrc) {
  const endGameOverlay = document.createElement("div");
  endGameOverlay.id = "end-game-overlay";
  const gamePage = document.getElementById("game-page");
  const modal = document.createElement("div");
  const headingResult = document.createElement("h4");
  headingResult.className = "heading-result";
  const resultText = resultType === "win" ? "YOU WIN!" : "YOU LOSE!";
  headingResult.textContent = resultText;

  const resultImage = document.createElement("img");
  resultImage.className = "resultImg";
  resultImage.src = imageSrc;

  const winMessage = document.createElement("p");
  const winMessageText =
    resultType === "win"
      ? "We did it Captain! The ocean belongs to you — your name will be remembered in naval history!"
      : "Your fleet was not up to the challenge. You have been utterly defeated.";
  winMessage.textContent = winMessageText;
  winMessage.style.fontSize = "1.3rem";

  const newBattleButton = document.createElement("button");
  newBattleButton.textContent = "New Game";
  newBattleButton.classList.add("actionButtons");
  newBattleButton.addEventListener("click", () => {
    location.reload();
  });
  modal.className = "game-over-modal";
  modal.classList.add(resultType === "win" ? "human-modal" : "computer-modal");
  modal.append(headingResult, resultImage, winMessage, newBattleButton);

  gamePage.append(endGameOverlay, modal);
}

export async function updateMessageBox(character, result) {
  const messageBox = document.getElementById(`${character}Paragraph`);
  messageBox.textContent = "";

  const message =
    character === "ally"
      ? generateRandomAllyMessage(result)
      : generateRandomEnemyMessages(result);

  try {
    // Call typeMessage and wait for it to finish
    await typeMessage(messageBox, message);

    // Add additional logic here if needed after typing is done
  } catch (error) {
    console.error("Error during typing:", error);
    // Handle any errors that might occur
  }
}
