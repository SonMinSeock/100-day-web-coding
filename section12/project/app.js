let remainingChars = document.querySelector("#remaining-chars");
let productNameInput = document.querySelector("#product-name");
let productNameInputMaxLength = productNameInput.maxLength;

console.dir(productNameInput);

function remainCharsCountUpdate(event) {
  let enteredText = event.target.value;
  let enteredTextLength = enteredText.length;

  remainingChars.textContent = productNameInputMaxLength - enteredTextLength;
}

productNameInput.addEventListener("input", remainCharsCountUpdate);
