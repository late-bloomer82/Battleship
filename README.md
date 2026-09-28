# Battleship

A browser-based Battleship game where you play against a computer opponent.

**Live demo:** https://late-bloomer82.github.io/Battleship/

## Features

- Drag-and-drop ship placement with a horizontal/vertical axis toggle
- Turn-based play against a computer opponent that fires randomly until it scores a hit, then targets the adjacent squares
- Real-time board updates, win/loss detection and sound effects

## Tech

JavaScript (ES6 classes), HTML, CSS, Jest, Babel, Webpack, ESLint

## Structure

- `src/classes/` holds the core game logic as `Ship`, `Gameboard` and `Player` classes
- `src/dom/` handles rendering and user interaction, kept separate from the game logic
- `tests/` contains the Jest unit tests for the three core classes

## Running locally

```bash
npm install
npm test          # runs the Jest suite with a coverage report
npm run build     # bundles the app with Webpack
```

## What I learned

- **Separating logic from the DOM.** Keeping game rules in plain classes made them much easier to test than code mixed with DOM updates. Some of my DOM functions still do too much, and splitting them up further is the first thing I would refactor.
- **Testing.** Writing Jest tests for the core classes showed me the value of test-driven thinking: deciding a function's inputs and expected outputs before implementing it leads to smaller, more focused functions.
- **Async turn flow.** Timing the computer's turns with `setTimeout` taught me how JavaScript's single-threaded event loop works, and why a recursive callback was needed instead of a loop.
- **Reference vs value.** JavaScript compares arrays by reference, not by content, which caused a few bugs in coordinate checks before I understood it. 