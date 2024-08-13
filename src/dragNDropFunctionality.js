import {
  placeShip,
  modifyShipAxisProperty,
  rotateImage,
} from "./dom/shipPlacement";
import { checkButtonState } from "./axisButtonsStateManagement";
import { playerGameboard } from "./classes/gameboard";
import { getDraggedShipDetails, updateConfirmButton } from "./dom/domSetupPage";
import {
  playerBattleship,
  playerCarrier,
  playerCruiser,
  playerDestroyer,
  playerSubmarine,
} from "./classes/ship";
import { humanUser } from "./classes/player";

// I tried using event.dataTransfer.setData and event.dataTransfer.getData to retrieve the ship that is being dragged's info
// but it simply doesnt work because of browser security measures that make the data in dataTransfer only available on drop.
// Had no choice but to use a global variable despite it being frowned upon :/

let draggedShipId = null;

export function dragNdrop() {
  const squares = document.querySelectorAll(".squares");

  const gridContainer = document.querySelector(".gameboard-grid");
  const shipContainers = document.querySelectorAll(".battleship-container");

  shipContainers.forEach((shipContainer) => {
    shipContainer.addEventListener("dragstart", handleDragStart);
  });

  gridContainer.addEventListener("dragover", handleDragOver);
  gridContainer.addEventListener("drop", handleDrop);

  squares.forEach((square) => {
    square.addEventListener("dragleave", handleDragLeave);
  });
}

function handleDragOver(event) {
  event.preventDefault();
  const setupGrid = document.getElementById("setup-grid");
  const playerSquares = setupGrid.querySelectorAll(".squares");
  const draggedShip = getShipObject(draggedShipId);
  const { xPercent, yPercent } = getMousePercentageCoordinates(
    event,
    setupGrid
  );
  const x = playerGameboard.percentageToGridCoordinate(xPercent);
  const y = playerGameboard.percentageToGridCoordinate(yPercent);
  const hoveredSquares = findHoveredSquares(
    x,
    y,
    playerSquares,
    draggedShip.length
  );
  if (isHoveredAreaUnavailable(x, y, draggedShip.length)) {
    hoveredSquares.forEach((hoveredSquare) => {
      if (hoveredSquare != undefined) {
        hoveredSquare.classList.add("highlight");
        hoveredSquare.classList.add("red");
      }
    });
  } else if (!isHoveredAreaUnavailable(x, y, draggedShip.length)) {
    hoveredSquares.forEach((hoveredSquare) => {
      if (hoveredSquare != undefined) {
        hoveredSquare.classList.add("highlight");
        hoveredSquare.classList.add("blue");
      }
    });
  }
}

function handleDragStart(event) {
  draggedShipId = event.target.id;
  event.dataTransfer.setData("text/plain", draggedShipId);
}

function handleDragLeave() {
  const setupGrid = document.getElementById("setup-grid");
  const highlightedSquares = setupGrid.querySelectorAll(".squares.highlight");

  highlightedSquares.forEach((playerSquare) => {
    if (
      playerSquare.classList.contains("blue") ||
      playerSquare.classList.contains("red")
    ) {
      playerSquare.classList.remove("highlight", "blue", "red");
    }
  });
}

function findHoveredSquares(x, y, squares, length) {
  const squaresArrayIndexes = [];
  const hoveredSquares = [];
  for (let i = 0; i < length; i++) {
    const hoveredSquareIndex = playerGameboard.gameboard.findIndex(
      (coordinate) =>
        coordinate.coordinates[0] === y && coordinate.coordinates[1] === x
    ); /*The reason im inverting the x and y is because i need to find the opposite coordinate(x and y inversed) since the 
     gameboard array coordinates are initalized in a vertical order while the DOM squares nodes array is returned or initalized horizontally. 
     So to get the accurate index for the DOM squares array,inverting the x and y in the findIndex function is needed.*/
    squaresArrayIndexes.push(hoveredSquareIndex);
    if (checkButtonState()) {
      x++;
    } else {
      y++;
    }
  }
  squaresArrayIndexes.forEach((arrayIndex) => {
    hoveredSquares.push(squares[arrayIndex]);
  });
  return hoveredSquares;
}

function isHoveredAreaUnavailable(x, y, length) {
  //gameboard object coordinate
  for (let i = 0; i < length; i++) {
    const hoveredCoordinate = playerGameboard.gameboard.find(
      (coordinate) =>
        coordinate.coordinates[0] === x && coordinate.coordinates[1] === y
    );
    if (hoveredCoordinate === undefined) {
      return true;
    }
    if (hoveredCoordinate.ship != null) {
      return true;
    }

    if (checkButtonState()) {
      x++;
    } else {
      y++;
    }
  }
  return false;
}

// Function to calculate the position relative to the grid container in percentages
export function getMousePercentageCoordinates(event, gridContainer) {
  const rect = gridContainer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const xPercent = Math.round((x / rect.width) * 100);
  const yPercent = Math.round((y / rect.height) * 100);
  return { xPercent, yPercent };
}

// Function to snap position to the grid in percentages
export function snapToGridInPercent(
  xPercent,
  yPercent,
  cellWidthPercent,
  cellHeightPercent
) {
  const snappedXPercent =
    Math.floor(xPercent / cellWidthPercent) * cellWidthPercent;
  const snappedYPercent =
    Math.floor(yPercent / cellHeightPercent) * cellHeightPercent;
  return {
    snappedXPercent: Math.round(snappedXPercent),
    snappedYPercent: Math.round(snappedYPercent),
  };
}

//Helper function to determine which ship object is to be used
function getShipObject(containerId) {
  switch (containerId) {
    case "carrier":
      return playerCarrier;

    case "battleship":
      return playerBattleship;

    case "cruiser":
      return playerCruiser;

    case "submarine":
      return playerSubmarine;

    case "destroyer":
      return playerDestroyer;
    default:
      return null;
  }
}
// Main function to handle drop event
function handleDrop(event) {
  event.preventDefault();

  const gridContainer = document.querySelector(".gameboard-grid");
  const highlightedSquares =
    gridContainer.querySelectorAll(".squares.highlight");
  const { draggedShipId, draggedContainer, draggedShipImg } =
    getDraggedShipDetails(event);

  highlightedSquares.forEach((playerSquare) => {
    if (
      playerSquare.classList.contains("blue") ||
      playerSquare.classList.contains("red")
    ) {
      playerSquare.classList.remove("highlight", "blue", "red");
    }
  });
  const shipObject = getShipObject(draggedShipId);
  const { xPercent, yPercent } = getMousePercentageCoordinates(
    event,
    gridContainer
  );

  const cellWidthPercent =
    (56.65 / gridContainer.getBoundingClientRect().width) * 100;
  const cellHeightPercent =
    (55.69 / gridContainer.getBoundingClientRect().height) * 100;

  const { snappedXPercent, snappedYPercent } = snapToGridInPercent(
    xPercent,
    yPercent,
    cellWidthPercent,
    cellHeightPercent
  );
  console.log(snappedXPercent, snappedYPercent, draggedShipId);

  //If y button selected
  if (!checkButtonState()) {
    modifyShipAxisProperty(draggedShipId);
  }
  if (
    !playerGameboard.placeShipObject(
      snappedXPercent,
      snappedYPercent,
      shipObject,
      shipObject.length
    )
  ) {
    //If y button selected
    if (!checkButtonState()) {
      rotateImage(draggedShipImg, 90);
    }
    placeShip(
      draggedShipId,
      draggedShipImg,
      draggedContainer,
      snappedXPercent,
      snappedYPercent,
      gridContainer
    );
  }
  if (enableConfirmButton()) {
    updateConfirmButton();
  }
  console.log(playerGameboard);
}

function enableConfirmButton() {
  const humanShips = humanUser.ships;
  //Check if theres at least one ship that is not placed
  for (const ship in humanShips) {
    const shipObject = humanShips[ship];
    if (shipObject.position === undefined) {
      return false;
    }
  }
  //If all ship placed ,return true
  return true;
}

export function resetGameboard() {
  playerGameboard.gameboard.forEach((coordinate) => {
    if (coordinate.ship != null) {
      coordinate.ship = null;
    }
  });
}

export function resetPlayerShips() {
  const humanShips = humanUser.ships;

  for (const ship in humanShips) {
    const shipObject = humanShips[ship];
    shipObject.position = undefined;
    shipObject.axis = "x";
  }
}
