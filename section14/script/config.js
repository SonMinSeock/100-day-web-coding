function openPlayerConfig() {
  backdropElement.style.display = "block";
  playerConfigOverlayElement.style.display = "block";
}

function closePlayerConfig() {
  backdropElement.style.display = "none";
  playerConfigOverlayElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorOutputElement.textContent = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim();

  if (!enteredPlayerName) {
    // event.target.firstElementChild.className = "error";
    event.target.firstElementChild.classList.add("error");
    errorOutputElement.textContent = "Please enter a valid name!";
    return;
  }
}
