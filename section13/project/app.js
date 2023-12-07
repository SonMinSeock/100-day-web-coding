const remainingChars = document.querySelector("#remaining-chars");
const productNameInput = document.querySelector("#product-name");
const productNameInputMaxLength = productNameInput.maxLength;

function remainCharsCountUpdate(event) {
  const enteredText = event.target.value;
  const enteredTextLength = enteredText.length;

  const currentWriteTextLength = productNameInputMaxLength - enteredTextLength;
  remainingChars.textContent = currentWriteTextLength;

  if (currentWriteTextLength <= 10) {
    productNameInput.classList.add("warning");
    remainingChars.classList.add("warning");
  }
}

productNameInput.addEventListener("input", remainCharsCountUpdate);
