import { rotateImage } from "./domSetupPage";
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
export function handleShipHorizontally(
  draggedShipId,
  draggedShipImg,
  draggedContainer,
  snappedX,
  snappedY
) {
  if (shipSizes[draggedShipId]) {
    draggedShipImg.style.width = shipSizes[draggedShipId];
    draggedShipImg.style.height = "10%";
    draggedContainer.innerHTML = "";
    // Set the position of the ship
    draggedShipImg.style.position = "absolute";
    draggedShipImg.style.left = `${snappedX}%`;
    draggedShipImg.style.top = `${snappedY}%`;
  }
}
export function handleShipVertically(
  draggedShipId,
  draggedShipImg,
  draggedContainer,
  snappedX,
  snappedY
) {
  if (shipSizes[draggedShipId]) {
    rotateImage(draggedShipImg, 90);
    draggedShipImg.style.width = shipSizes[draggedShipId];
    draggedShipImg.style.height = "10%";

    draggedContainer.innerHTML = "";
    // Set the position of the ship
    draggedShipImg.style.position = "absolute";

    switch (draggedShipId) {
      case "carrierContainer":
        playerCarrier.axis = "y";
        draggedShipImg.style.left = `${snappedX - 20}%`;
        draggedShipImg.style.top = `${snappedY}%`;
        break;

      case "battleshipContainer":
        playerBattleship.axis = "y";
        draggedShipImg.style.left = `${snappedX - 14.5}%`;
        draggedShipImg.style.top = `${snappedY - 15}%`;
        break;

      case "cruiserContainer":
        playerCruiser.axis = "y";
        draggedShipImg.style.left = `${snappedX - 14.5}%`;
        draggedShipImg.style.top = `${snappedY - 15}%`;
        break;

      case "submarineContainer":
        playerSubmarine.axis = "y";
        draggedShipImg.style.left = `${snappedX - 9.5}%`;
        draggedShipImg.style.top = `${snappedY - 10}%`;
        break;

      case "destroyerContainer":
        playerDestroyer.axis = "y";
        draggedShipImg.style.left = `${snappedX - 5}%`;
        draggedShipImg.style.top = `${snappedY - 5}%`;
    }
  }
}
