let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameOver = false;

const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const backdropElement = document.getElementById("backdrop");
const playerConfigOverlayElement = document.getElementById("config-overlay");
const cancleConfigBtnElement = document.getElementById("cancle-config-btn");
const errorOutputElement = document.getElementById("config-errors");
const gameAreaElement = document.getElementById("active-game");
const gameBoardElement = document.getElementById("game-board");
const activePlayernameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");
const winnerElement = document.getElementById("winner-name");

const formElement = document.querySelector("form");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const startNewGameBtnElement = document.getElementById("start-game-btn");
const gameFieldElements = document.querySelectorAll("#game-board li");

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);
cancleConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);
formElement.addEventListener("submit", savePlayerConfig);
startNewGameBtnElement.addEventListener("click", startNewGame);

// for (const gameFieldElement of gameFieldElements) {
//   gameFieldElement.addEventListener("click", selectGameField);
// }

gameBoardElement.addEventListener("click", selectGameField);
