const remainingChars = document.querySelector("#remaining-chars");
const productNameInput = document.querySelector("#product-name");
const productNameInputMaxLength = productNameInput.maxLength;

function remainCharsCountUpdate(event) {
  const enteredText = event.target.value;
  const enteredTextLength = enteredText.length;

  const currentWriteTextLength = productNameInputMaxLength - enteredTextLength;
  remainingChars.textContent = currentWriteTextLength;

  if (currentWriteTextLength === 0) {
    productNameInput.classList.add("error");
    remainingChars.classList.add("error");
  } else if (currentWriteTextLength <= 10) {
    productNameInput.classList.add("warning");
    remainingChars.classList.add("warning");
    productNameInput.classList.remove("error");
    remainingChars.classList.remove("error");
  } else {
    productNameInput.classList.remove("warning");
    remainingChars.classList.remove("warning");
  }
}

productNameInput.addEventListener("input", remainCharsCountUpdate);
