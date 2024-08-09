import { createGameboardContainer } from "./domSetupPage";
import enemySrc from "../images/enemy.png";
import { allySrc } from "./domSetupPage";
import { populatePlayerGameboard } from "./renderGameboard";
import { computerGameboard } from "../classes/gameboard";
export { enemySrc };
export function createGamePage() {
  const gamePageContainer = document.createElement("div");
  gamePageContainer.id = "game-page";
  const gameContainer = document.createElement("div");
  gameContainer.id = "game-container";
  document.body.appendChild(gamePageContainer);
  gamePageContainer.appendChild(gameContainer);
  const gameboardArea = createGameboardArea();
  const quoteArea = createQuoteArea();
  gameContainer.append(gameboardArea, quoteArea);
  createGrid("player-grid");
  createGrid("computer-grid");
  populatePlayerGameboard();
  console.log("computa:", computerGameboard);
}

function createGameboardArea() {
  const gameboardSection = document.createElement("section");
  gameboardSection.id = "gameboardSection";
  createGameboardContainer(gameboardSection, "player-grid", "player-gameboard");
  createGameboardContainer(
    gameboardSection,
    "computer-grid",
    "computer-gameboard"
  );

  return gameboardSection;
}

function createQuoteArea() {
  const quoteSection = document.createElement("section");
  quoteSection.id = "quoteSection";
  createQuoteBoxes(
    quoteSection,
    allySrc,
    "Our formation is set and ready for action captain. We are awaiting your orders."
  );
  createQuoteBoxes(
    quoteSection,
    enemySrc,
    "You will regret the day you started this. I will end you."
  );
  return quoteSection;
}

function createQuoteBoxes(parent, img, string) {
  const messageBox = document.createElement("section");
  messageBox.className = "message-container";
  parent.appendChild(messageBox);

  const avatar = document.createElement("img");
  avatar.src = img;
  avatar.className = "avatar";
  avatar.style.height = "80%";
  messageBox.appendChild(avatar);

  const quoteParagraph = document.createElement("p");
  quoteParagraph.textContent = string;
  messageBox.appendChild(quoteParagraph);
}

function createGrid(grid) {
  const gameboardGrid = document.getElementById(grid);

  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.className = "squares";
    gameboardGrid.appendChild(square);
  }
}
