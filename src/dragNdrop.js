import {
  handleShipHorizontally,
  handleShipVertically,
} from "./axisFunctionality";
import { checkButtonState } from "./axisButtonsStateManagement";

export function dragNdrop() {
  const squares = document.querySelectorAll(".squares");

  const gridContainer = document.getElementById("playerGameboardGrid");
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
function handleDrop(event) {
  event.preventDefault();
  const square = event.target;
  const gridContainer = document.getElementById("playerGameboardGrid");
  const draggedShipId = event.dataTransfer.getData("text/plain");
  const draggedContainer = document.getElementById(draggedShipId);
  const draggedShipImg = document.querySelector(`#${draggedShipId} img`);
  square.classList.remove("highlight");

  // Calculate the position relative to the grid container
  const rect = gridContainer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Calculate the size of individual grid cells based on the provided dimensions
  const cellWidth = 60; // width of each cell
  const cellHeight = 59; // height of each cell

  // Snap to the grid by rounding to the nearest cell size
  const snappedX = Math.floor(x / cellWidth) * cellWidth;
  const snappedY = Math.floor(y / cellHeight) * cellHeight;

  // Append ship to grid container to ensure it stays within bounds
  gridContainer.appendChild(draggedShipImg);

  // Determine ship orientation based on button state
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
