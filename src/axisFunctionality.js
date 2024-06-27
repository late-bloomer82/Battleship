import { rotateImage } from "./domActions";

// Function to handle horizontal ship positioning
export function handleShipHorizontally(
  draggedShipId,
  draggedShipImg,
  draggedContainer,
  snappedX,
  snappedY
) {
  const shipSizes = {
    carrierImg: "18rem",
    battleshipImg: "15rem",
    cruiserImg: "11rem",
    submarineImg: "11rem",
    destroyerImg: "8rem",
  };
  if (shipSizes[draggedShipId]) {
    draggedShipImg.style.width = shipSizes[draggedShipId];
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
    carrierImg: "18rem",
    battleshipImg: "15rem",
    cruiserImg: "11rem",
    submarineImg: "11rem",
    destroyerImg: "8rem",
  };

  if (shipSizes[draggedShipId]) {
    draggedShipImg.style.width = shipSizes[draggedShipId];
    rotateImage(draggedShipImg, 90);
    draggedContainer.innerHTML = "";
    // Set the position of the ship
    draggedShipImg.style.position = "absolute";
    draggedShipImg.style.top = `${snappedY}px`;

    switch (draggedShipId) {
      case "carrierImg":
        draggedShipImg.style.left = `${snappedX - 110}px`;
        break;

      case "battleshipImg":
        draggedShipImg.style.left = `${snappedX - 80}px`;
        draggedShipImg.style.top = `${snappedY - 30}px`;
        break;

      case "cruiserImg":
        draggedShipImg.style.left = `${snappedX - 60}px`;
        break;

      case "submarineImg":
        draggedShipImg.style.left = `${snappedX - 55}px`;
        break;

      case "destroyerImg":
        draggedShipImg.style.left = `${snappedX - 30}px`;
        draggedShipImg.style.top = `${snappedY - 25}px`;
    }
  }
}
