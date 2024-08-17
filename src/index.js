import { computerGameboard, playerGameboard } from "./classes/gameboard";
import {
  findAttackedSquare,
  randomAttackGenerator,
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
import { enemySrc } from "./dom/domGamePage";
import { allySrc, createSetupPage, enterCombatBtn } from "./dom/domSetupPage";
import { getMousePercentageCoordinates } from "./dragNDropFunctionality";

enterCombatBtn.addEventListener("click", createSetupPage);

setupComputerGameboard();

let computerTurn = false;

export function humanTurn() {
  updateEventListener("add");
}

function handleComputerTurn() {
  // Remove event listener to disable human interaction
  updateEventListener("remove");

  function performAttack() {
    if (!computerTurn) {
      humanTurn();
      return;
    }

    setTimeout(() => {
      // Computer's attack logic
      const [x, y] = randomAttackGenerator();
      const isShipHit = playerGameboard.receiveAttack([x, y]);
      const playerSquares = selectPlayerSquares();
      const attackedSquare = findAttackedSquare(x, y, playerSquares);

      if (isShipHit) {
        handleHitSquare(attackedSquare);
        updateMessageBox("enemy", "yes").then(performAttack);
        if (playerGameboard.checkGameboardStatus()) {
          showGameResultModal("loss", enemySrc);
          return;
        }
      } else {
        computerTurn = false;
        handleMissedSquare(attackedSquare);
        updateMessageBox("enemy", "no").then(humanTurn);
      }
    }, 2000);
  }
  if (playerGameboard.checkGameboardStatus()) {
    return;
  }
  performAttack();
}

function onHumanClick(event) {
  if (computerTurn === false) {
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
        updateEventListener("remove");
        handleHitSquare(clickedSquare);
        revealShipIfSunk(computerGrid);
        updateMessageBox("ally", "yes").then(humanTurn);
        if (computerGameboard.checkGameboardStatus()) {
          updateEventListener("remove");
          showGameResultModal("win", allySrc);
          return;
        }
      } else {
        computerTurn = true;
        handleMissedSquare(clickedSquare);
        updateMessageBox("ally", "no").then(handleComputerTurn);
      }
    }
  }
}

function updateEventListener(action) {
  action === "add"
    ? document.body.addEventListener("click", onHumanClick)
    : document.body.removeEventListener("click", onHumanClick);
}
