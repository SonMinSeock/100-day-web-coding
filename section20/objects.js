// console.log(new Date().toISOString());

// const job = {
//     title: "Frontend Developer",
//     location: "강남",
//     salaray: 50000,
// };

// const job2 = {
//     title: "Backend Developer",
//     location: "성남",
//     salaray: 65000,
// }

class Job {
  constructor(jobTitle, place, salary) {
    this.title = jobTitle;
    this.place = place;
    this.salary = salary;
  }
}

const frontEndDeveloper = new Job("Frontend Developer", "강남", 5500);
const backEndDeveloper = new Job("Backend Developer", "성남", 6500);

console.log(frontEndDeveloper);
console.log(backEndDeveloper);
