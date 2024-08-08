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

function handleHumanTurn() {
  document.body.addEventListener("click", onHumanClick);
}

function handleComputerTurn() {
  // Remove event listener to disable human interaction
  document.body.removeEventListener("click", onHumanClick);
  // Computer's attack logic
  const [x, y] = randomAttackGenerator();
  const isShipHit = playerGameboard.receiveAttack([x, y]);
  const playerSquares = selectPlayerSquares();
  const attackedSquare = findAttackedSquare(x, y, playerSquares);

  if (isShipHit) {
    handleHitSquare(attackedSquare);
  } else {
    handleMissedSquare(attackedSquare);
    handleHumanTurn(); // Re-enable human turn
  }
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
      handleMissedSquare(clickedSquare);
      handleComputerTurn();
    }
  }
}
