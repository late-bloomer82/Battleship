import {
  playerBattleship,
  playerCarrier,
  playerCruiser,
  playerDestroyer,
  playerSubmarine,
} from "./shipClass";

const shipSizes = {
  carrierContainer: "50%",
  battleshipContainer: "40%",
  cruiserContainer: "40%",
  submarineContainer: "30%",
  destroyerContainer: "20%",
};

// Function to handle horizontal ship positioning
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
  switch (draggedShipId) {
    case "carrierContainer":
      playerCarrier.axis = "y";
      break;

    case "battleshipContainer":
      playerBattleship.axis = "y";
      break;

    case "cruiserContainer":
      playerCruiser.axis = "y";
      break;

    case "submarineContainer":
      playerSubmarine.axis = "y";
      break;

    case "destroyerContainer":
      playerDestroyer.axis = "y";
  }
}

export function rotateImage(img, angle) {
  img.style.transform = `rotate(${angle}deg) translate(0px, -100%)`;
  img.style.transformOrigin = "left top";
}
