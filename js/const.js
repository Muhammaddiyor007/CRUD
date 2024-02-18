
const positions = [`Frontend`, `Backend`, `Fullstack`];
const POSITION = `position`;
const STUDENTS = "students";
const students = [
  {
    firstName: "Muhammaddiyor",
    lastName: "Odiljonov",
    address: "Andijon",
    birthDay:"02.07.2004",
    position: "Frontend",
    typePosition: "Junior",
    salary: 500,
    isMarried: false,
  },
  {
    firstName: "Azizbek",
    lastName: "Xotamaliyev",
    address: "Toshkent",
    birthDay:"02.07.2004",
    position: "Frontend",
    typePosition: "Senior",
    salary: 500,
    isMarried: true,
  },
];
let studentsJSON = localStorage.getItem(STUDENTS);
let Students = JSON.parse(studentsJSON) || students;
