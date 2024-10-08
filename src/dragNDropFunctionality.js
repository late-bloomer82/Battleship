import {
  placeShip,
  modifyShipAxisProperty,
  addClass,
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
let shipId = null;

//Array to track highlighted squares
let currentHighlightedSquares = [];
export function dragNdrop() {
  const squares = document.querySelectorAll(".squares");

  const gridContainer = document.querySelector(".gameboard-grid");
  const shipContainers = document.querySelectorAll(".battleship-container");

  shipContainers.forEach((shipContainer) => {
    shipContainer.addEventListener("dragstart", handleDragStart);
    shipContainer.addEventListener("dragend", () => {
      //Reset
      clearHighlight();
      shipId = null;
    });
  });

  gridContainer.addEventListener("dragover", handleDragOver);
  gridContainer.addEventListener("drop", handleDrop);
  squares.forEach((square) => {
    square.addEventListener("dragleave", clearHighlight);
  });
}

function handleDragOver(event) {
  event.preventDefault();
  const setupGrid = document.getElementById("setup-grid");
  const playerSquares = setupGrid.querySelectorAll(".squares");
  const draggedShip = getShipObject(shipId);
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

  //Clear previous highlighted area
  clearHighlight();

  if (isHoveredAreaUnavailable(x, y, draggedShip.length)) {
    hoveredSquares.forEach((hoveredSquare) => {
      if (hoveredSquare != undefined) {
        hoveredSquare.classList.add("highlight");
        hoveredSquare.classList.add("red");
        currentHighlightedSquares.push(hoveredSquare);
      }
    });
  } else if (!isHoveredAreaUnavailable(x, y, draggedShip.length)) {
    hoveredSquares.forEach((hoveredSquare) => {
      if (hoveredSquare != undefined) {
        hoveredSquare.classList.add("highlight");
        hoveredSquare.classList.add("blue");
        currentHighlightedSquares.push(hoveredSquare);
      }
    });
  }
}

function handleDragStart(event) {
  event.stopPropagation();
  shipId = event.target.id;
  event.dataTransfer.setData("text/plain", shipId);
}

function clearHighlight() {
  currentHighlightedSquares.forEach((square) => {
    square.classList.remove("highlight", "blue", "red");
  });
  currentHighlightedSquares = [];
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
  const xPercent = Math.floor((x / rect.width) * 100);
  const yPercent = Math.floor((y / rect.height) * 100);
  return { xPercent, yPercent };
}

// Function to snap position to the grid in percentages
export function snapToGridInPercent(
  xPercent,
  yPercent,
  squareWidthPercent,
  cellHeightPercent
) {
  const snappedXPercent =
    Math.floor(xPercent / squareWidthPercent) * squareWidthPercent;
  const snappedYPercent =
    Math.floor(yPercent / cellHeightPercent) * cellHeightPercent;
  return {
    snappedXPercent: Math.round(snappedXPercent / 10) * 10,
    snappedYPercent: Math.round(snappedYPercent / 10) * 10,
  };
}
function getSquareDimensions(gridContainer) {
  const square = gridContainer.querySelector(".squares");
  const squareRect = square.getBoundingClientRect();
  const squareWidth = squareRect.width;
  const squareHeight = squareRect.height;
  return {
    squareWidth,
    squareHeight,
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
  //Clear previous highlighted area
  clearHighlight();
  const gridContainer = document.querySelector(".gameboard-grid");
  const { draggedShipId, draggedContainer, draggedShipImg } =
    getDraggedShipDetails(event);
  const shipObject = getShipObject(draggedShipId);
  const { xPercent, yPercent } = getMousePercentageCoordinates(
    event,
    gridContainer
  );

  const { squareWidth, squareHeight } = getSquareDimensions(gridContainer);

  const squareWidthPercent =
    (squareWidth / gridContainer.getBoundingClientRect().width) * 100;
  const squareHeightPercent =
    (squareHeight / gridContainer.getBoundingClientRect().height) * 100;

  const { snappedXPercent, snappedYPercent } = snapToGridInPercent(
    xPercent,
    yPercent,
    squareWidthPercent,
    squareHeightPercent
  );

  //If y button selected
  if (!checkButtonState()) {
    modifyShipAxisProperty(draggedShipId);
  }
  if (
    playerGameboard.getShipCoordinates(
      snappedXPercent,
      snappedYPercent,
      shipObject,
      shipObject.length
    )
  ) {
    //Place ship object on player gameboard
    playerGameboard.placeShipObject(
      snappedXPercent,
      snappedYPercent,
      shipObject,
      shipObject.length
    );
    //If y button selected
    if (!checkButtonState()) {
      addClass(draggedShipImg);
    }
    placeShip(
      draggedShipId,
      draggedShipImg,
      draggedContainer,
      snappedXPercent,
      snappedYPercent,
      gridContainer
    );

    draggedContainer.classList.add("placed-ship-containers");
  }
  if (enableConfirmButton()) {
    updateConfirmButton();
  }
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
