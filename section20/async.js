// 비동기 처리 이해.
const fs = require("fs/promises");

async function readFile() {
  let fileData;
  try {
    fileData = (await fs.readFile("data.txt")).toString();
    //fileData = (await fs.readFile("dat.txt")).toString();
  } catch (error) {
    console.log(error);
  }
  console.log("File parsing Done!");
  console.log(fileData);

  console.log("Hello there!");
}

readFile();
