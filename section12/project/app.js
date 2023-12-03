let paragrapElement = document.querySelector("p");

function changePragraphText() {
  paragrapElement.textContent = "Clicked!";
  console.log("paragraph clicked!!");
}
paragrapElement.addEventListener("click", changePragraphText);
