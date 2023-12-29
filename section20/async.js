// 비동기 처리 이해.
const fs = require("fs");

function readFile() {
  // 동기 파일 읽기.
  //const fileData = fs.readFileSync("data.txt");

  // 비동기 파일 읽기.
  fs.readFile("data.txt", function (error, fileData) {
    console.log("File parsing Done!");
    console.log(fileData.toString());
  });

  console.log("Hello there!");
}

readFile();
