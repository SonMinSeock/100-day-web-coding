// 비동기 처리 이해.
const fs = require("fs/promises");

function readFile() {
  // 동기 파일 읽기.
  //const fileData = fs.readFileSync("data.txt");

  // 비동기 파일 읽기.
  /*
  fs.readFile("data.txt", function (error, fileData) {
    console.log("File parsing Done!");
    console.log(fileData.toString());
    // another async work...
  });
  */

  // 프로미스
  fs.readFile("dat.txt")
    .then(function (fileData) {
      console.log("File parsing Done!");
      console.log(fileData.toString());
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log("Hello there!");
}

readFile();
