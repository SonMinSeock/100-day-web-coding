// try-catch 구문 이용힌 에러 처리.
const fs = require("fs");

function readFile() {
  try {
    const fileData = fs.readFileSync("data.json");
  } catch (error) {
    console.log(`An error occurred!`);
  }
  console.log("Hello there!");
}

readFile();
