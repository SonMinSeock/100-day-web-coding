let userName = "Son MinSeock";
let userAge = 25;
let hobbies = ["Socker", "Cooking", "Music"];

let job = { title: "Developer", place: "Seoul", salary: 52000 };

let totalAdultYears;
function calculateAdultYears(userAge) {
  let result = userAge - 18;
  return result;
}

totalAdultYears = calculateAdultYears(userAge);
console.log(totalAdultYears);

userAge = 35;
totalAdultYears = calculateAdultYears(userAge);

console.log(totalAdultYears);

let person = {
  name: "Son MinSeock",
  greeting() {
    console.log("Hello");
  },
};

person.greeting();
