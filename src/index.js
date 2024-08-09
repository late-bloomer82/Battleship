import { computerGameboard, playerGameboard } from "./classes/gameboard";
import { computer } from "./classes/player";
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
} from "./dom/domGameActions";
import { enemySrc } from "./dom/domGamePage";
import { allySrc, createSetupPage, enterCombatBtn } from "./dom/domSetupPage";
import { getMousePercentageCoordinates } from "./dragNDropFunctionality";

enterCombatBtn.addEventListener("click", createSetupPage);
console.log("hi", computerGameboard);
console.log(computer.ships);
setupComputerGameboard();

// Start the game by enabling the human player's turn
handleHumanTurn();

let computerTurn = true;

function handleHumanTurn() {
  document.body.addEventListener("click", onHumanClick);
}

function handleComputerTurn() {
  // Remove event listener to disable human interaction
  document.body.removeEventListener("click", onHumanClick);

  function performAttack() {
    if (!computerTurn) {
      handleHumanTurn();
      return;
    }

    setTimeout(() => {
      // Computer's attack logic
      const [x, y] = randomAttackGenerator();
      console.log(x, y);
      const isShipHit = playerGameboard.receiveAttack([x, y]);
      const playerSquares = selectPlayerSquares();
      console.log(playerSquares);
      const attackedSquare = findAttackedSquare(x, y, playerSquares);

      if (isShipHit) {
        handleHitSquare(attackedSquare);
        if (playerGameboard.checkGameboardStatus()) {
          showGameResultModal("loss", enemySrc);
          return;
        }
        performAttack();
      } else {
        computerTurn = false;
        handleMissedSquare(attackedSquare);
        handleHumanTurn();
      }
    }, 2000);
  }
  if (playerGameboard.checkGameboardStatus()) {
    return;
  }
  performAttack();
}

function onHumanClick(event) {
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
      handleHitSquare(clickedSquare);
      revealShipIfSunk(computerGrid);
      if (computerGameboard.checkGameboardStatus()) {
        document.body.removeEventListener("click", onHumanClick);
        showGameResultModal("win", allySrc);
        return;
      }
    } else {
      computerTurn = true;
      handleMissedSquare(clickedSquare);
      handleComputerTurn();
    }
  }
}
