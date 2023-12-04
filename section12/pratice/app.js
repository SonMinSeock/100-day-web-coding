let paragrapElement = document.querySelector("p");
let inputElement = document.querySelector("input");

function changePragraphText(event) {
  paragrapElement.textContent = "Clicked!";
  console.log("paragraph clicked!!");
  console.log(event);
}
function enteredTextHandler(event) {
  //let enteredText = inputElement.value;
  let enteredText = event.target.value;
  //let enteredText = event.data;
  console.dir(enteredText.length);
}

paragrapElement.addEventListener("click", changePragraphText);
inputElement.addEventListener("input", enteredTextHandler);
