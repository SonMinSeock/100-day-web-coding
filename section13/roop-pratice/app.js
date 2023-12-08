const calculatedBtn = document.querySelector("#calculator button");

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

calculatedBtn.addEventListener("click", calculatedSum);
