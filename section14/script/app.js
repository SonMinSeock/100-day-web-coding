const backdropElement = document.getElementById("backdrop");
const playerConfigOverlayElement = document.getElementById("config-overlay");
const cancleConfigBtnElement = document.getElementById("cancle-config-btn");
const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const formElement = document.querySelector("form");

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);
cancleConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);
formElement.addEventListener("submit", savePlayerConfig);
