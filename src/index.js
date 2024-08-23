import { computerGameboard, playerGameboard } from "./classes/gameboard";
import {
  findAttackedDomSquare,
  generateAttack,
  setupComputerGameboard,
} from "./computerFunctionality";
import {
  handleHitSquare,
  handleMissedSquare,
  revealShipIfSunk,
  selectComputerGrid,
  selectPlayerSquares,
  showGameResultModal,
  updateMessageBox,
} from "./dom/domGameActions";
import defeatIcon from "./images/defeatCharacterIcon.png";
import victoryIcon from "./images/victoryCharacterrIcon.png";
import { createSetupPage, enterCombatBtn } from "./dom/domSetupPage";
import { getMousePercentageCoordinates } from "./dragNDropFunctionality";
import { playSound, stopSound } from "./audioManagement.js";

enterCombatBtn.addEventListener("click", createSetupPage);
setupComputerGameboard();
let computerTurn = false;
let isHumanTurn = true;

export function humanTurn() {
  updateEventListener("add");
}

function handleComputerTurn() {
  // Remove event listener to disable human interaction
  updateEventListener("remove");

  function performAttack() {
    if (!computerTurn) {
      humanTurn();
    }
    if (playerGameboard.checkGameboardStatus()) {
      endGame("defeat", defeatIcon);
      return;
    }
    setTimeout(() => {
      // Computer's attack logic
      const [x, y] = generateAttack();
      const isShipHit = playerGameboard.receiveAttack([x, y]);
      const playerSquares = selectPlayerSquares();
      const attackedSquare = findAttackedDomSquare(x, y, playerSquares);

      if (isShipHit) {
        handleHitSquare(attackedSquare);
        Promise.all([
          playSound("hitSound"),
          updateMessageBox("enemy", "yes"),
        ]).then(performAttack);
      } else {
        isHumanTurn = true;
        computerTurn = false;
        handleMissedSquare(attackedSquare);
        Promise.all([
          playSound("missSound"),
          updateMessageBox("enemy", "no"),
        ]).then(humanTurn);
      }
    }, 500);
  }
  if (playerGameboard.checkGameboardStatus()) {
    return;
  }
  performAttack();
}

function onHumanClick(event) {
  if (computerTurn === false && isHumanTurn === true) {
    if (event.target.matches("#computer-grid .squares")) {
      const clickedSquare = event.target;
      const computerGrid = selectComputerGrid();
      const { xPercent, yPercent } = getMousePercentageCoordinates(
        event,
        computerGrid
      );
      const x = computerGameboard.percentageToGridCoordinate(xPercent);
      const y = computerGameboard.percentageToGridCoordinate(yPercent);
      const isShipHit = computerGameboard.receiveAttack([x, y]);

      if (isShipHit) {
        isHumanTurn = false;
        updateEventListener("remove");
        handleHitSquare(clickedSquare);
        Promise.all([
          revealShipIfSunk(computerGrid),
          playSound("hitSound"),
          updateMessageBox("ally", "yes"),
        ]).then(() => {
          if (computerGameboard.checkGameboardStatus()) {
            updateEventListener("remove");
            endGame("win", victoryIcon);
            return;
          }
          isHumanTurn = true;
          humanTurn();
        });
      } else {
        isHumanTurn = false;
        computerTurn = true;
        handleMissedSquare(clickedSquare);
        Promise.all([
          playSound("missSound"),
          updateMessageBox("ally", "no"),
        ]).then(() => {
          setTimeout(() => {
            handleComputerTurn();
          }, 1000);
        });
      }
    }
  }
}

function updateEventListener(action) {
  action === "add"
    ? document.body.addEventListener("click", onHumanClick)
    : document.body.removeEventListener("click", onHumanClick);
}

//Helper function when the game ends
function endGame(result, icon) {
  showGameResultModal(result, icon);
  stopSound("menuTheme");
  playSound(result === "win" ? "victorySound" : "defeatSound");
}
