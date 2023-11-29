let userName = "Son MinSeock";
let userAge = 25;
let hobbies = ["Socker", "Cooking", "Music"];

let job = { title: "Developer", place: "Seoul", salary: 52000 };

let totalAdultYears;
function calculateAdultYears() {
  return userAge - 18;
}

totalAdultYears = calculateAdultYears();
alert(totalAdultYears);

userAge = 35;
totalAdultYears = calculateAdultYears();

alert(totalAdultYears);
