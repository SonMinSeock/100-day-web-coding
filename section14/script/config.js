function openPlayerConfig() {
  backdropElement.style.display = "block";
  playerConfigOverlayElement.style.display = "block";
}

function closePlayerConfig() {
  backdropElement.style.display = "none";
  playerConfigOverlayElement.style.display = "none";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername");
  console.log(enteredPlayerName);
}
