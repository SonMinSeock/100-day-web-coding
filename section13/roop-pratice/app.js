const calculatedBtn = document.querySelector("#calculator button");

const showHighlightLinksBtn = document.querySelector("#highlight-links button");

function calculatedSum() {
  const userNumberInput = document.getElementById("user-number");
  const calculatedSumParagraph = document.getElementById("calculated-sum");

  const enteredNumber = userNumberInput.value;

  let sum = 0;

  for (let i = 0; i <= enteredNumber; i++) {
    sum += i;
  }

  calculatedSumParagraph.textContent = sum;
  calculatedSumParagraph.style.display = "block";
}

function showHighlightLinks() {
  const highlightLinks = document.querySelectorAll("#highlight-links a");
  for (const link of highlightLinks) {
    link.classList.add("highlight");
  }
}

calculatedBtn.addEventListener("click", calculatedSum);
showHighlightLinksBtn.addEventListener("click", showHighlightLinks);
