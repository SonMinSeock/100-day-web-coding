const calculatedBtn = document.querySelector("#calculator button");
const showHighlightLinksBtn = document.querySelector("#highlight-links button");
const showUserDataBtn = document.querySelector("#user-data button");
const rollDiceBtn = document.querySelector("#statistics button");

const dummyUserData = {
  firstName: "Son",
  lastName: "MinSeock",
  age: 25,
};

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

function showUserData() {
  const outputUserDataList = document.getElementById("output-user-data");

  outputUserDataList.innerHTML = "";

  for (const key in dummyUserData) {
    const outputUserDataItem = document.createElement("li");
    const outputText = key.toUpperCase() + ": " + dummyUserData[key];
    outputUserDataItem.textContent = outputText;
    outputUserDataList.append(outputUserDataItem);
  }
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1; // 1 ~ 6 난수 값 반환.
}

function deriveRollDice() {
  const userTargetNumberInput = document.getElementById("user-target-number");
  const enteredUserTargetNumber = +userTargetNumberInput.value;
  const diceRollsList = document.getElementById("dice-rolls");
  const outputTotalRollsSpan = document.getElementById("output-total-rolls");
  const outputTargetNumberSpan = document.getElementById("output-target-number");

  diceRollsList.innerHTML = "";

  let hasRolledTargetNumber = false;
  let numberOfRolls = 0; // 주사위 던진 횟수.

  while (!hasRolledTargetNumber) {
    const rollDiceNumber = rollDice();
    numberOfRolls++;

    const newRollListItem = document.createElement("li");
    const outputText = "Roll " + numberOfRolls + ": " + rollDiceNumber;

    newRollListItem.textContent = outputText;
    diceRollsList.append(newRollListItem);

    hasRolledTargetNumber = rollDiceNumber === enteredUserTargetNumber;
  }

  outputTotalRollsSpan.textContent = numberOfRolls;
  outputTargetNumberSpan.textContent = enteredUserTargetNumber;
}

calculatedBtn.addEventListener("click", calculatedSum);
showHighlightLinksBtn.addEventListener("click", showHighlightLinks);
showUserDataBtn.addEventListener("click", showUserData);
rollDiceBtn.addEventListener("click", deriveRollDice);
