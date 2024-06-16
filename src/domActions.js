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
  //Hide main menu page
  const mainMenuInterface = document.getElementById("main-menu");
  mainMenuInterface.style.display = "none";

  //Create setup page
  const setupPageDiv = document.createElement("div");
  setupPageDiv.id = "setup-page";
  setupPageDiv.className = "app-page";
  document.body.appendChild(setupPageDiv);

  //Create the setup wrapper container
  const setupContainer = document.createElement("div");
  setupContainer.id = "setup-container";
  setupPageDiv.appendChild(setupContainer);

  //Create ally message box
  const allyMessageBox = document.createElement("section");
  allyMessageBox.id = "ally-message-container";
  setupContainer.appendChild(allyMessageBox);

  const allyImage = document.createElement("img");
  allyImage.src = allySrc;
  allyImage.id = "allyImage";
  allyImage.style.height = "80%";
  allyMessageBox.appendChild(allyImage);

  const quoteParagraph = document.createElement("p");
  quoteParagraph.textContent =
    "Ahoy captain! Please choose your fleet configuration";
  allyMessageBox.appendChild(quoteParagraph);

  //Create gameboard layout section
  const gameboardLayoutSection = document.createElement("section");
  gameboardLayoutSection.id = "gameboard-layout-container";
  setupContainer.appendChild(gameboardLayoutSection);

  //Create grid and axis container
  const gridAxisContainer = document.createElement("div");
  gridAxisContainer.id = "gridaAxis-container";
  gameboardLayoutSection.appendChild(gridAxisContainer);

  //Create axis buttons container
  const axisBtnContainer = document.createElement("div");
  axisBtnContainer.id = "axis-btn-container";
  gridAxisContainer.appendChild(axisBtnContainer);

  const xAxisButton = document.createElement("button");
  xAxisButton.id = "xAxisButton";
  xAxisButton.textContent = "X axis";
  const yAxisButton = document.createElement("button");
  yAxisButton.id = "yAxisButton";
  yAxisButton.textContent = "Y axis";
  axisBtnContainer.append(xAxisButton, yAxisButton);

  //Create Battleship sidebar
  const battleshipSidebar = document.createElement("div");
  battleshipSidebar.id = "battleship-sidebar";
  gameboardLayoutSection.appendChild(battleshipSidebar);

  const carrierContainer = document.createElement("div");
  const carrierImage = document.createElement("img");
  const carrierTitle = document.createElement("p");
  carrierTitle.textContent = "Carrier (5f)";
  carrierImage.className = "shipImg";
  carrierImage.src = carrierSrc;
  carrierContainer.className = "battleship-container";
  carrierContainer.append(carrierImage, carrierTitle);

  const battleshipContainer = document.createElement("div");
  const battleshipImage = document.createElement("img");
  const battleshipTitle = document.createElement("p");
  battleshipTitle.textContent = "Battleship (4f)";
  battleshipImage.className = "shipImg";
  battleshipImage.src = battleshipSrc;
  battleshipContainer.className = "battleship-container";
  battleshipContainer.append(battleshipImage, battleshipTitle);

  const cruiserContainer = document.createElement("div");
  const cruiserImage = document.createElement("img");
  const cruiserTitle = document.createElement("p");
  cruiserTitle.textContent = "Cruiser (3f)";
  cruiserImage.className = "shipImg";
  cruiserImage.src = cruiserSrc;
  cruiserContainer.className = "battleship-container";
  cruiserContainer.append(cruiserImage, cruiserTitle);

  const submarineContainer = document.createElement("div");
  const submarineImage = document.createElement("img");
  const submarineTitle = document.createElement("p");
  submarineTitle.textContent = "Submarine\n(3f)";
  submarineTitle.style.whiteSpace = "pre";
  submarineTitle.style.textAlign = "center";
  submarineTitle.style.marginTop = "0.2rem";
  submarineImage.className = "shipImg";
  submarineImage.id = "submarineImg";
  submarineImage.src = submarineSrc;
  submarineContainer.className = "battleship-container";
  submarineContainer.append(submarineImage, submarineTitle);

  const destroyerContainer = document.createElement("div");
  const destroyerImage = document.createElement("img");
  const destroyerTitle = document.createElement("p");
  destroyerTitle.textContent = "Destroyer (2f)";
  destroyerImage.className = "shipImg";
  destroyerImage.src = destroyerSrc;
  destroyerContainer.className = "battleship-container";
  destroyerContainer.append(destroyerImage, destroyerTitle);

  battleshipSidebar.append(
    carrierContainer,
    battleshipContainer,
    cruiserContainer,
    submarineContainer,
    destroyerContainer
  );

  //Create gameboard container
  const gameboardContainer = document.createElement("div");
  gameboardContainer.id = "gameboard-container";
  gridAxisContainer.appendChild(gameboardContainer);

  //Create y axis
  const yAxisContainer = document.createElement("div");
  yAxisContainer.id = "y-axis";
  yAxisContainer.textContent = "ABCDEFGHIJ";
  gameboardContainer.appendChild(yAxisContainer);

  //Create xAxisGridContainer
  const xAxisGridContainer = document.createElement("div");
  xAxisGridContainer.id = "x-axis-grid-container";
  gameboardContainer.appendChild(xAxisGridContainer);

  //Create x axis
  const xAxisContainer = document.createElement("div");
  xAxisContainer.id = "x-axis";
  xAxisGridContainer.appendChild(xAxisContainer);

  // create x axis coordinates
  const one = document.createElement("div");
  one.textContent = "1";
  const two = document.createElement("div");
  two.textContent = "2";
  const three = document.createElement("div");
  three.textContent = "3";
  const four = document.createElement("div");
  four.textContent = "4";
  const five = document.createElement("div");
  five.textContent = "5";
  const six = document.createElement("div");
  six.textContent = "6";
  const seven = document.createElement("div");
  seven.textContent = "7";
  const eigth = document.createElement("div");
  eigth.textContent = "8";
  const nine = document.createElement("div");
  nine.textContent = "9";
  const ten = document.createElement("div");
  ten.textContent = "10";

  xAxisContainer.append(
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eigth,
    nine,
    ten
  );

  //Create gameboard grid container
  const playerGameboardGrid = document.createElement("div");
  playerGameboardGrid.id = "playerGameboardGrid";
  xAxisGridContainer.appendChild(playerGameboardGrid);

  //Create reset confirm button section
  const resetConfirmButtonSection = document.createElement("section");
  resetConfirmButtonSection.id = "reset-confirm-button-section";
  setupContainer.appendChild(resetConfirmButtonSection);

  const resetBtn = document.createElement("button");
  resetBtn.className = "actionButtons";
  resetBtn.textContent = "Reset";

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "actionButtons";
  confirmBtn.textContent = "Confirm";

  resetConfirmButtonSection.append(resetBtn, confirmBtn);

  createPlayerGameboard(playerGameboard);
}

export function createGrid(numberOfSquares) {
  const playerGameboardGrid = document.getElementById("playerGameboardGrid");

  for (let i = 0; i < numberOfSquares; i++) {
    const square = document.createElement("div");
    square.className = "squares";
    playerGameboardGrid.appendChild(square);
  }
}
