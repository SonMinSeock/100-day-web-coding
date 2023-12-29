// try-catch 구문 이용힌 에러 처리.
const fs = require("fs");

function readFile() {
  let fileData;
  try {
    fileData = fs.readFileSync("data.json");
    // 새도잉
    //const fileData = fs.readFileSync("data.json");
  } catch (error) {
    console.log(`An error occurred!`);
  }
  console.log(fileData);
  console.log("Hello there!");
}

readFile();
