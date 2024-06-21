export function dragNdrop() {
  const squares = document.querySelectorAll(".squares");
  const shipContainers = document.querySelectorAll(".battleship-container");

  shipContainers.forEach((shipContainer) => {
    shipContainer.addEventListener("dragstart", handleDragStart);
  });

  squares.forEach((square) => {
    square.addEventListener("dragover", handleDragOver);
    square.addEventListener("dragenter", handleDragEnter);
    square.addEventListener("dragleave", handleDragLeave);
    square.addEventListener("drop", handleDrop);
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
  square.classList.remove("highlight");

  const draggedShipId = event.dataTransfer.getData("text/plain");
  const draggedContainer = document.getElementById(draggedShipId);
  const draggedShipImg = document.querySelector(`#${draggedShipId} img`);

  const shipSizes = {
    submarineImg: "11rem",
    carrierImg: "18rem",
    battleshipImg: "15rem",
    cruiserImg: "11rem",
    destroyerImg: "8rem",
  };

  if (shipSizes[draggedShipId]) {
    draggedShipImg.style.position = "absolute";
    draggedShipImg.style.width = shipSizes[draggedShipId];
    square.appendChild(draggedShipImg);
    draggedContainer.innerHTML = "";
  }
}
