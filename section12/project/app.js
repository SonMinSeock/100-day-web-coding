// DOM으로 요소를 접근 하는방법. 1) 드릴링 방법.
//document.body.children[1].children[0].href = "https://google.com";

// DOM으로 요소를 접근 하는방법. 2) 쿼리 메서스 방법.
let aElement = document.getElementById("external-link");
aElement.href = "https://google.com";
