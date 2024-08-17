import { createPlayerGameboard } from "./renderGameboard";
import allySrc from "../images/ally.png";
import carrierSrc from "../images/carrier.svg";
import battleshipSrc from "../images/battleship.svg";
import cruiserSrc from "../images/cruiser.svg";
import destroyerSrc from "../images/destroyer.svg";
import submarineSrc from "../images/submarine.svg";
import {
  dragNdrop,
  resetGameboard,
  resetPlayerShips,
} from "../dragNDropFunctionality";
import { toggleButtonState } from "../axisButtonsStateManagement";
import { playerGameboard } from "../classes/gameboard";
import { createGamePage } from "./domGamePage";
import { typeMessage } from "../messageFunctionality";
export const enterCombatBtn = document.getElementById("enterCombatBtn");
export {
  allySrc,
  carrierSrc,
  battleshipSrc,
  cruiserSrc,
  destroyerSrc,
  submarineSrc,
};

export function createSetupPage() {
  hideMainMenu();
  const setupPageDiv = createSetupPageDiv();
  const setupContainer = createSetupContainer(setupPageDiv);

  createAllyMessageBox(setupContainer);
  createGameboardLayoutSection(setupContainer);
  createResetConfirmButtonSection(setupContainer);

  createPlayerGameboard(playerGameboard);
  dragNdrop();
  toggleButtonState();
  resetButton();
  document
    .getElementById("confirmButton")
    .addEventListener("click", gamePageTransition);
}

function hideMainMenu() {
  const mainMenuInterface = document.getElementById("main-menu");
  mainMenuInterface.style.display = "none";
}

function createSetupPageDiv() {
  const setupPageDiv = document.createElement("div");
  setupPageDiv.id = "setup-page";
  setupPageDiv.className = "app-page";
  document.body.appendChild(setupPageDiv);
  return setupPageDiv;
}

function createSetupContainer(parent) {
  const setupContainer = document.createElement("div");
  setupContainer.id = "setup-container";
  parent.appendChild(setupContainer);
  return setupContainer;
}

function createAllyMessageBox(parent) {
  const userName = document.getElementById("nameInput").value;
  const allyMessageBox = document.createElement("section");
  allyMessageBox.id = "ally-message-container";
  parent.appendChild(allyMessageBox);

  const allyImage = document.createElement("img");
  allyImage.src = allySrc;
  allyImage.id = "allyImage";
  allyImage.style.height = "80%";
  allyMessageBox.appendChild(allyImage);

  const quoteParagraph = document.createElement("p");
  const allyTextOne = `Ahoy Captain ${userName}!`;
  const allyTextTwo =
    "Please choose your fleet configuration by selecting the axis and dragging and dropping ships on the map.";
  typeMessage(quoteParagraph, allyTextOne, 30).then(() => {
    setTimeout(() => {
      quoteParagraph.textContent = "";
      typeMessage(quoteParagraph, allyTextTwo, 30);
    }, 1000);
  });

  allyMessageBox.appendChild(quoteParagraph);
}

function createGameboardLayoutSection(parent) {
  const gameboardLayoutSection = document.createElement("section");
  gameboardLayoutSection.id = "gameboard-layout-container";
  parent.appendChild(gameboardLayoutSection);

  const gridAxisContainer = createGridAxisContainer(gameboardLayoutSection);
  createAxisButtons(gridAxisContainer);
  createBattleshipSidebar(gameboardLayoutSection);
  createGameboardContainer(gridAxisContainer, "setup-grid");
}

function createGridAxisContainer(parent) {
  const gridAxisContainer = document.createElement("div");
  gridAxisContainer.id = "gridaAxis-container";
  parent.appendChild(gridAxisContainer);
  return gridAxisContainer;
}
// Function to get the dragged ship details
export function getDraggedShipDetails(event) {
  const draggedShipId = event.dataTransfer.getData("text/plain");
  const draggedContainer = document.getElementById(draggedShipId);
  const draggedShipImg = document.querySelector(`#${draggedShipId} img`);
  return { draggedShipId, draggedContainer, draggedShipImg };
}

function createAxisButtons(parent) {
  const axisBtnContainer = document.createElement("div");
  axisBtnContainer.id = "axis-btn-container";
  parent.appendChild(axisBtnContainer);

  const xAxisButton = document.createElement("button");
  xAxisButton.id = "xAxisButton";
  xAxisButton.textContent = "X axis";
  const yAxisButton = document.createElement("button");
  yAxisButton.id = "yAxisButton";
  yAxisButton.textContent = "Y axis";
  axisBtnContainer.append(xAxisButton, yAxisButton);
}

function createBattleshipSidebar(parent) {
  const battleshipSidebar = document.createElement("div");
  battleshipSidebar.id = "battleship-sidebar";
  parent.appendChild(battleshipSidebar);

  const ships = [
    { src: carrierSrc, title: "Carrier (5f)" },
    { src: battleshipSrc, title: "Battleship (4f)" },
    { src: cruiserSrc, title: "Cruiser (3f)" },
    { src: submarineSrc, title: "Submarine\n(3f)" },
    { src: destroyerSrc, title: "Destroyer (2f)" },
  ];

  ships.forEach((ship) => {
    const shipContainer = document.createElement("div");
    shipContainer.setAttribute("draggable", "true");
    shipContainer.className = "battleship-container";

    const shipImage = document.createElement("img");
    shipImage.setAttribute("draggable", "false");
    shipImage.className = "shipImg";
    shipImage.src = ship.src;
    if (ship.title.includes("Submarine")) {
      shipContainer.id = "submarine";
      shipImage.id = "submarineImg";
    }
    if (ship.title.includes("Battleship")) {
      shipContainer.id = "battleship";
    }
    if (ship.title.includes("Cruiser")) {
      shipContainer.id = "cruiser";
    }
    if (ship.title.includes("Carrier")) {
      shipContainer.id = "carrier";
    }
    if (ship.title.includes("Destroyer")) {
      shipContainer.id = "destroyer";
    }

    const shipTitle = document.createElement("p");
    shipTitle.textContent = ship.title;
    if (ship.title.includes("Submarine")) {
      shipTitle.style.whiteSpace = "pre";
      shipTitle.style.textAlign = "center";
      shipTitle.style.marginTop = "0.2rem";
    }

    shipContainer.append(shipImage, shipTitle);
    battleshipSidebar.appendChild(shipContainer);
  });
}

export function createGameboardContainer(parent, gridId, gameboardId) {
  const gameboardContainer = document.createElement("div");
  gameboardContainer.className = "gameboard-container";
  gameboardContainer.id = gameboardId;
  parent.appendChild(gameboardContainer);

  if (gameboardId) {
    const gameboardHeader = document.createElement("header");
    gameboardHeader.className = "gameboard-header";
    gameboardContainer.appendChild(gameboardHeader);

    if (gameboardId === "player-gameboard") {
      gameboardHeader.textContent = "Friendly Waters";
    } else if (gameboardId === "computer-gameboard") {
      gameboardHeader.textContent = "Enemy Waters";
    }
  }

  const yAxisContainer = document.createElement("div");
  yAxisContainer.id = "y-axis";
  yAxisContainer.textContent = "ABCDEFGHIJ";
  gameboardContainer.appendChild(yAxisContainer);

  const xAxisGridContainer = document.createElement("div");
  xAxisGridContainer.id = "x-axis-grid-container";
  gameboardContainer.appendChild(xAxisGridContainer);

  const xAxisContainer = document.createElement("div");
  xAxisContainer.id = "x-axis";
  xAxisGridContainer.appendChild(xAxisContainer);

  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].forEach((num) => {
    const div = document.createElement("div");
    div.textContent = num;
    xAxisContainer.appendChild(div);
  });

  const gameboardGrid = document.createElement("div");
  gameboardGrid.id = gridId;
  gameboardGrid.className = "gameboard-grid";
  xAxisGridContainer.appendChild(gameboardGrid);
}

function createResetConfirmButtonSection(parent) {
  const section = document.createElement("section");
  section.id = "reset-confirm-button-section";
  parent.appendChild(section);

  const resetBtn = document.createElement("button");
  resetBtn.className = "actionButtons";
  resetBtn.id = "resetButton";
  resetBtn.textContent = "Reset";

  const confirmBtn = document.createElement("button");
  confirmBtn.disabled = true;
  confirmBtn.classList.add("disabled-confirmButton");
  confirmBtn.classList.add("actionButtons");
  confirmBtn.id = "confirmButton";
  confirmBtn.textContent = "Confirm";

  section.append(resetBtn, confirmBtn);
}

function rotateImage(image, angle) {
  image.style.transform = `rotate(${angle}deg)`;
}

export function createGrid(numberOfSquares) {
  const gameboardGrid = document.getElementById("setup-grid");

  for (let i = 0; i < numberOfSquares; i++) {
    const square = document.createElement("div");
    square.className = "squares";
    gameboardGrid.appendChild(square);
  }
}

function submarineStyle(submarineImg, submarineText) {
  submarineImg.style.paddingTop = "1rem";
  submarineImg.style.width = "8rem";
  submarineImg.style.height = "4rem";
  submarineText.style.whiteSpace = "pre";
  submarineText.style.textAlign = "center";
  submarineText.style.marginTop = "0.2rem";
}

function resetButton() {
  function resetShip(placedShip, shipContainer, shipText) {
    shipContainer.classList.remove("placed-ship-containers");
    placedShip.classList.remove("placed-ships");
    placedShip.style.position = "relative";
    placedShip.style.top = "0";
    placedShip.style.left = "0";
    placedShip.style.width = "6rem";
    placedShip.style.height = "3.5rem";
    rotateImage(placedShip, 0);

    const shipTitle = document.createElement("p");
    shipTitle.textContent = shipText;
    shipContainer.append(placedShip, shipTitle);
    if (placedShip.src === submarineSrc) {
      submarineStyle(placedShip, shipTitle);
    }
  }

  function resetConfirmButton() {
    const confirmButton = document.getElementById("confirmButton");
    confirmButton.disabled = true;
    confirmButton.classList.add("disabled-confirmButton");
  }
  const resetBtn = document.getElementById("resetButton");

  resetBtn.addEventListener("click", () => {
    const containers = {
      [carrierSrc]: {
        container: document.getElementById("carrier"),
        text: "Carrier (5f)",
      },
      [battleshipSrc]: {
        container: document.getElementById("battleship"),
        text: "Battleship (4f)",
      },
      [cruiserSrc]: {
        container: document.getElementById("cruiser"),
        text: "Cruiser (3f)",
      },
      [submarineSrc]: {
        container: document.getElementById("submarine"),
        text: "Submarine\n(3f)",
      },
      [destroyerSrc]: {
        container: document.getElementById("destroyer"),
        text: "Destroyer (2f)",
      },
    };

    const placedShips = document.querySelectorAll(".gameboard-grid .shipImg");

    placedShips.forEach((placedShip) => {
      const shipInfo = containers[placedShip.src];
      if (shipInfo) {
        resetShip(placedShip, shipInfo.container, shipInfo.text);
      }
    });

    resetGameboard();
    resetPlayerShips();
    resetConfirmButton();
  });
}

function gamePageTransition() {
  hideSetupPage();
  createGamePage();
}

function hideSetupPage() {
  const setupPageContainer = document.getElementById("setup-page");
  setupPageContainer.style.display = "none";
}

export function updateConfirmButton() {
  const confirmButton = document.getElementById("confirmButton");
  confirmButton.disabled = false;
  confirmButton.classList.remove("disabled-confirmButton");
}
