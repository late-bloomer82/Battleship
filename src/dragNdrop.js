import {
  handleShipHorizontally,
  handleShipVertically,
} from "./axisFunctionality";
import { checkButtonState } from "./axisButtonsStateManagement";
import { playerGameboard } from "./gameboard";

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
// Function to prevent default drop behavior
function preventDefault(event) {
  event.preventDefault();
}

// Function to get the dragged ship details
function getDraggedShipDetails(event) {
  const draggedShipId = event.dataTransfer.getData("text/plain");
  const draggedContainer = document.getElementById(draggedShipId);
  const draggedShipImg = document.querySelector(`#${draggedShipId} img`);
  return { draggedShipId, draggedContainer, draggedShipImg };
}

// Function to calculate the position relative to the grid container
function calculateRelativePosition(event, gridContainer) {
  const rect = gridContainer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

// Function to snap position to the grid
function snapToGrid(x, y, cellWidth, cellHeight) {
  const snappedX = Math.floor(x / cellWidth) * cellWidth;
  const snappedY = Math.floor(y / cellHeight) * cellHeight;
  return { snappedX, snappedY };
}

// Function to place the ship on the gameboard
function placeShipOnGameboard(
  snappedX,
  snappedY,
  draggedShipId,
  draggedShipImg,
  gridContainer
) {
  playerGameboard.placeShipObject(snappedX, snappedY, draggedShipId);
  console.log(playerGameboard.gameboard);
  gridContainer.appendChild(draggedShipImg);
}

// Main function to handle drop event
function handleDrop(event) {
  preventDefault(event);

  const square = event.target;
  const gridContainer = document.querySelector(".gameboard-grid");
  const { draggedShipId, draggedContainer, draggedShipImg } =
    getDraggedShipDetails(event);

  square.classList.remove("highlight");

  const { x, y } = calculateRelativePosition(event, gridContainer);

  const cellWidth = 56.55;
  const cellHeight = 55.69;

  const { snappedX, snappedY } = snapToGrid(x, y, cellWidth, cellHeight);

  placeShipOnGameboard(
    snappedX,
    snappedY,
    draggedShipId,
    draggedShipImg,
    gridContainer
  );

  if (checkButtonState()) {
    handleShipHorizontally(
      draggedShipId,
      draggedShipImg,
      draggedContainer,
      snappedX,
      snappedY
    );
  } else {
    handleShipVertically(
      draggedShipId,
      draggedShipImg,
      draggedContainer,
      snappedX,
      snappedY
    );
  }
}
