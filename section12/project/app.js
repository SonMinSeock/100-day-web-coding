const remainingChars = document.querySelector("#remaining-chars");
const productNameInput = document.querySelector("#product-name");
const productNameInputMaxLength = productNameInput.maxLength;

console.dir(productNameInput);

function remainCharsCountUpdate(event) {
  const enteredText = event.target.value;
  const enteredTextLength = enteredText.length;

  remainingChars.textContent = productNameInputMaxLength - enteredTextLength;
}

productNameInput.addEventListener("input", remainCharsCountUpdate);
