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
} from "./dom/domGameActions";
import { createSetupPage, enterCombatBtn } from "./dom/domSetupPage";
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
      handleHumanTurn(); // Re-enable human turn when computerTurn is false
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
        performAttack(); // Continue to the next iteration (simulated loop)
      } else {
        computerTurn = false;
        handleMissedSquare(attackedSquare);
        handleHumanTurn(); // Re-enable human turn
      }
    }, 2000);
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
    } else {
      computerTurn = true;
      handleMissedSquare(clickedSquare);
      handleComputerTurn();
    }
  }
}
