function greetUser(greetingPrefix, userName = "User") {
  console.log(greetingPrefix + " " + userName + "!");
}

greetUser("Hi", "Son MinSeock");
greetUser("Hello");

function sumUp(...numbers) {
  let result = 0;
  for (const number of numbers) {
    result += number;
  }

  return result;
}

const inputNumbers = [1, 4, 10, 16];
console.log(sumUp(...inputNumbers));

console.log(sumUp);
