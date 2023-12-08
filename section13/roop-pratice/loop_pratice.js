for (let i = 0; i < 10; i++) {
  console.log(i);
}

const users = ["Son", "Lee", "Kim"];

for (const userName of users) {
  console.log(userName);
}

// for (let i = 0; i < users.length; i++) {
//   console.log(users[i]);
// }

const loggedInUser = {
  name: "Son MinSeock",
  age: 25,
  isAdmin: true,
};

for (const propertyName in loggedInUser) {
  console.log(loggedInUser[propertyName]);
}

let isFinished = false;
while (!isFinished) {
  isFinished = confirm("Do you want to quit?");
  console.log(isFinished);
}
console.log("Done!");
