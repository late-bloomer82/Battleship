import {
  placeShip,
  modifyShipAxisProperty,
  rotateImage,
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

// Function to get the dragged ship details
function getDraggedShipDetails(event) {
  const draggedShipId = event.dataTransfer.getData("text/plain");
  const draggedContainer = document.getElementById(draggedShipId);
  const draggedShipImg = document.querySelector(`#${draggedShipId} img`);
  return { draggedShipId, draggedContainer, draggedShipImg };
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

// Main function to handle drop event
function handleDrop(event) {
  event.preventDefault();

  const square = event.target;
  const gridContainer = document.querySelector(".gameboard-grid");
  const { draggedShipId, draggedContainer, draggedShipImg } =
    getDraggedShipDetails(event);

  square.classList.remove("highlight");

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

  playerGameboard.placeShipObject(
    snappedXPercent,
    snappedYPercent,
    draggedShipId
  );

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

  console.log(playerGameboard);
}
