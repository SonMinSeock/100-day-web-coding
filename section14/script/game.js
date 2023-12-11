function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  activePlayernameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  activePlayernameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName === "LI") {
    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add("disabled");
    switchPlayer();
  }
}
