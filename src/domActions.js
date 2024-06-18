import { createPlayerGameboard } from "./renderGameboard";
import { playerGameboard } from "./gameboard";
import allySrc from "./images/ally.png";
import carrierSrc from "./images/carrier.svg";
import battleshipSrc from "./images/battleship.svg";
import cruiserSrc from "./images/cruiser.svg";
import destroyerSrc from "./images/destroyer.svg";
import submarineSrc from "./images/submarine.svg";

export const enterCombatBtn = document.getElementById("enterCombatBtn");

export function createSetupPage() {
  hideMainMenu();
  const setupPageDiv = createSetupPageDiv();
  const setupContainer = createSetupContainer(setupPageDiv);

  createAllyMessageBox(setupContainer);
  createGameboardLayoutSection(setupContainer);
  createResetConfirmButtonSection(setupContainer);

  createPlayerGameboard(playerGameboard);
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
  const allyMessageBox = document.createElement("section");
  allyMessageBox.id = "ally-message-container";
  parent.appendChild(allyMessageBox);

  const allyImage = document.createElement("img");
  allyImage.src = allySrc;
  allyImage.id = "allyImage";
  allyImage.style.height = "80%";
  allyMessageBox.appendChild(allyImage);

  const quoteParagraph = document.createElement("p");
  quoteParagraph.textContent =
    "Ahoy captain! Please choose your fleet configuration";
  allyMessageBox.appendChild(quoteParagraph);
}

function createGameboardLayoutSection(parent) {
  const gameboardLayoutSection = document.createElement("section");
  gameboardLayoutSection.id = "gameboard-layout-container";
  parent.appendChild(gameboardLayoutSection);

  const gridAxisContainer = createGridAxisContainer(gameboardLayoutSection);
  createAxisButtons(gridAxisContainer);
  createBattleshipSidebar(gameboardLayoutSection);
  createGameboardContainer(gridAxisContainer);
}

function createGridAxisContainer(parent) {
  const gridAxisContainer = document.createElement("div");
  gridAxisContainer.id = "gridaAxis-container";
  parent.appendChild(gridAxisContainer);
  return gridAxisContainer;
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
    shipContainer.className = "battleship-container";

    const shipImage = document.createElement("img");
    shipImage.className = "shipImg";
    shipImage.src = ship.src;
    if (ship.title.includes("Submarine")) {
      shipImage.id = "submarineImg";
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

function createGameboardContainer(parent) {
  const gameboardContainer = document.createElement("div");
  gameboardContainer.id = "gameboard-container";
  parent.appendChild(gameboardContainer);

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

  const playerGameboardGrid = document.createElement("div");
  playerGameboardGrid.id = "playerGameboardGrid";
  xAxisGridContainer.appendChild(playerGameboardGrid);
}

function createResetConfirmButtonSection(parent) {
  const section = document.createElement("section");
  section.id = "reset-confirm-button-section";
  parent.appendChild(section);

  const resetBtn = document.createElement("button");
  resetBtn.className = "actionButtons";
  resetBtn.textContent = "Reset";

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "actionButtons";
  confirmBtn.textContent = "Confirm";

  section.append(resetBtn, confirmBtn);
}

export function createGrid(numberOfSquares) {
  const playerGameboardGrid = document.getElementById("playerGameboardGrid");

  for (let i = 0; i < numberOfSquares; i++) {
    const square = document.createElement("div");
    square.className = "squares";
    playerGameboardGrid.appendChild(square);
  }
}
