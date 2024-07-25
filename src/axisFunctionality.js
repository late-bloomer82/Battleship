import { rotateImage } from "./domSetupPage";

// Function to handle horizontal ship positioning
export function handleShipHorizontally(
  draggedShipId,
  draggedShipImg,
  draggedContainer,
  snappedX,
  snappedY
) {
  const shipSizes = {
    carrierContainer: "50%",
    battleshipContainer: "40%",
    cruiserContainer: "40%",
    submarineContainer: "30%",
    destroyerContainer: "20%",
  };
  if (shipSizes[draggedShipId]) {
    draggedShipImg.style.width = shipSizes[draggedShipId];
    draggedShipImg.style.height = "10%";
    draggedContainer.innerHTML = "";
    // Set the position of the ship
    draggedShipImg.style.position = "absolute";
    draggedShipImg.style.left = `${snappedX}px`;
    draggedShipImg.style.top = `${snappedY}px`;
  }
}

// Function to handle vertical ship positioning
export function handleShipVertically(
  draggedShipId,
  draggedShipImg,
  draggedContainer,
  snappedX,
  snappedY
) {
  const shipSizes = {
    carrierContainer: "50%",
    battleshipContainer: "40%",
    cruiserContainer: "40%",
    submarineContainer: "30%",
    destroyerContainer: "20%",
  };

  if (shipSizes[draggedShipId]) {
    draggedShipImg.style.width = shipSizes[draggedShipId];
    draggedShipImg.style.height = "10%";
    rotateImage(draggedShipImg, 90);
    draggedContainer.innerHTML = "";
    // Set the position of the ship
    draggedShipImg.style.position = "absolute";
    draggedShipImg.style.top = `${snappedY}px`;

    switch (draggedShipId) {
      case "carrierContainer":
        draggedShipImg.style.left = `${snappedX - 115}px`;
        break;

      case "battleshipContainer":
        draggedShipImg.style.left = `${snappedX - 83}px`;
        draggedShipImg.style.top = `${snappedY - 28}px`;
        break;

      case "cruiserContainer":
        draggedShipImg.style.left = `${snappedX - 90}px`;
        draggedShipImg.style.top = `${snappedY - 30}px`;
        break;

      case "submarineContainer":
        draggedShipImg.style.left = `${snappedX - 58}px`;
        break;

      case "destroyerContainer":
        draggedShipImg.style.left = `${snappedX - 30}px`;
        draggedShipImg.style.top = `${snappedY - 25}px`;
    }
  }
}
