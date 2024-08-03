import {
  placeShip,
  modifyShipAxisProperty,
  rotateImage,
} from "./dom/shipPlacement";
import { checkButtonState } from "./axisButtonsStateManagement";
import { playerGameboard } from "./classes/gameboard";
import { getDraggedShipDetails } from "./dom/domSetupPage";
import {
  playerBattleship,
  playerCarrier,
  playerCruiser,
  playerDestroyer,
  playerSubmarine,
} from "./classes/ship";

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
    square.addEventListener("dragenter", handleDragEnter);
    square.addEventListener("dragleave", handleDragLeave);
  });
}

function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragEnter(event) {
  event.preventDefault();
  event.target.classList.add("highlight");
}

function handleDragLeave(event) {
  event.preventDefault();
  event.target.classList.remove("highlight");
}

// Function to calculate the position relative to the grid container in percentages
export function calculateRelativePositionInPercent(event, gridContainer) {
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

  const square = event.target;
  const gridContainer = document.querySelector(".gameboard-grid");
  const { draggedShipId, draggedContainer, draggedShipImg } =
    getDraggedShipDetails(event);

  square.classList.remove("highlight");
  const shipObject = getShipObject(draggedShipId);
  const { xPercent, yPercent } = calculateRelativePositionInPercent(
    event,
    gridContainer
  );

  const cellWidthPercent =
    (56.94 / gridContainer.getBoundingClientRect().width) * 100;
  const cellHeightPercent =
    (55.99 / gridContainer.getBoundingClientRect().height) * 100;

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

  playerGameboard.placeShipObject(
    snappedXPercent,
    snappedYPercent,
    shipObject,
    shipObject.length
  );

  console.log(playerGameboard);
}
