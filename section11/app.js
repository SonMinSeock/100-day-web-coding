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
alert(totalAdultYears);

userAge = 35;
totalAdultYears = calculateAdultYears(userAge);

alert(totalAdultYears);

let person = {
  name: "Son MinSeock",
  greeting() {
    alert("Hello");
  },
};

person.greeting();
