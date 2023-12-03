let paragrapElement = document.querySelector("p");
let inputElement = document.querySelector("input");

function changePragraphText() {
  paragrapElement.textContent = "Clicked!";
  console.log("paragraph clicked!!");
}
function enteredTextHandler() {
  let enteredText = inputElement.value;
  console.dir(enteredText);
}

paragrapElement.addEventListener("click", changePragraphText);
inputElement.addEventListener("input", enteredTextHandler);
