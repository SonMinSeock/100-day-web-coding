let userName = "Son MinSeock";
let userAge = 25;
let hobbies = ["Socker", "Cooking", "Music"];

let job = { title: "Developer", place: "Seoul", salary: 52000 };

let adultYears;

function calculateAdultYears() {
  adultYears = userAge - 18;
}

calculateAdultYears();
alert(adultYears);

userAge = 35;
calculateAdultYears();

alert(adultYears);
