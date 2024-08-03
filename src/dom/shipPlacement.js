import {
  playerBattleship,
  playerCarrier,
  playerCruiser,
  playerDestroyer,
  playerSubmarine,
} from "../classes/ship";

const shipSizes = {
  carrier: "50%",
  battleship: "40%",
  cruiser: "30%",
  submarine: "30%",
  destroyer: "20%",
};

// Function to placeShip on the gameboard grid
export function placeShip(
  draggedShipId,
  draggedShipImg,
  draggedContainer,
  snappedX,
  snappedY,
  gridContainer
) {
  if (shipSizes[draggedShipId]) {
    draggedShipImg.style.width = shipSizes[draggedShipId];
    draggedShipImg.style.height = "10%";
    draggedContainer.innerHTML = "";
    // Set the position of the ship
    draggedShipImg.style.position = "absolute";
    draggedShipImg.style.left = `${snappedX}%`;
    draggedShipImg.style.top = `${snappedY}%`;
    gridContainer.appendChild(draggedShipImg);
  }
}

export function modifyShipAxisProperty(draggedShipId) {
  const shipMapping = {
    carrier: playerCarrier,
    battleship: playerBattleship,
    cruiser: playerCruiser,
    submarine: playerSubmarine,
    destroyer: playerDestroyer,
  };

  const ship = shipMapping[draggedShipId];
  if (ship) {
    ship.axis = "y";
  }
}

export function rotateImage(img, angle) {
  img.style.transform = `rotate(${angle}deg) translate(0px, -100%)`;
  img.style.transformOrigin = "left top";
}
