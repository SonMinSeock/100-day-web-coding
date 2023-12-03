// DOM으로 요소를 접근 하는방법. 1) 드릴링 방법.
//document.body.children[1].children[0].href = "https://google.com";

// DOM으로 요소를 접근 하는방법. 2) 쿼리 메서스 방법.
let aElement = document.getElementById("external-link");
aElement.href = "https://google.com";

//aElement = document.querySelector("#external-link");
aElement = document.querySelector("p a");
//console.dir(document.querySelectorAll("a"));
aElement.href = "https://naver.com";

//1. Create the New Element.
let newAnchorElement = document.createElement("a");
newAnchorElement.href = "https://google.com";
newAnchorElement.textContent = "This is leads to Google!";

//2. Get Access to the Parent Element that should hold the new Element.
let firstParagraph = document.querySelector("p");

//3. Insert The new Element into the parent Element Content.
firstParagraph.append(newAnchorElement);

// Remove Element
let firstH1Element = document.querySelector("h1");
//firstH1Element.remove();

firstH1Element.parentElement.removeChild(firstH1Element);

firstParagraph.parentElement.append(firstParagraph);
