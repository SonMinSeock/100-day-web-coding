const hobbies = ["Sports", "Cooking"];
hobbies.push("Reading");

console.log(hobbies);

const person = {
  age: 25,
};

function getAdultYears(p) {
  p.age -= 18;
  return p.age;
}

console.log(getAdultYears({ ...person }));
console.log(person);
