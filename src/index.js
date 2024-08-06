import { computerGameboard } from "./classes/gameboard";
import { computer } from "./classes/player";
import { setupComputerGameboard } from "./computerFunctionality";
import {
  handleHitSquare,
  handleMissedSquare,
  revealShipIfSunk,
} from "./dom/domGameActions";
import { createSetupPage, enterCombatBtn } from "./dom/domSetupPage";
import { getMousePercentageCoordinates } from "./dragNDropFunctionality";

enterCombatBtn.addEventListener("click", createSetupPage);
console.log("hi", computerGameboard);
console.log(computer.ships);
setupComputerGameboard();

//Player turn state management
const isHumanTurn = true;

//Drive the game using event listeners

//Human turn
if (isHumanTurn) {
  document.body.addEventListener("click", (event) => {
    if (event.target.matches("#computer-grid .squares")) {
      const clickedSquare = event.target;
      const computerGrid = document.getElementById("computer-grid");
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
      }
    }
  });
} else if (!isHumanTurn) {
  //
}
//
