const filterGroupSelect = document.querySelector(".filter-group-select");
const searchInput = document.querySelector(".form-control");
const studentsRow = document.querySelector(".students-row");
const studentForm = document.querySelector(".student-form");
const studentModal = document.querySelector("#student-modal");
const confirmModal = document.querySelector("#confirm-modal");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const saveStudentBtn = document.querySelector(".save-btn");
const addStudentBtn = document.querySelector(".add-student-btn");
let group = "all";
let selectedStudent = null;
const studentFormElements = studentForm.elements;

filterGroupSelect.innerHTML = `<option value="all selected>All</option>`;
positions.map((pr) => {
  filterGroupSelect.innerHTML += `<option value="${pr}">${pr}</option>`;
});

function getStudentRow(
  { firstName, lastName, address,birthDay, position, typePosition, salary, isMarried },
  i
) {
  return `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${address}</td>
      <td>${birthDay}</td>
      <td>${position}</td>
      <td>${typePosition}</td>
      <td>${salary}$</td>
      <td>${isMarried ? "Ha" : "Yo'q"}</td>
      <td class="text-end">
        <button class="mr-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#student-modal" onclick="editStudent(${i})">Edit</button>
        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirm-modal" onclick="deleteStudent(${i})">Delete</button>
      </td>
    </tr>
  `;
}

function renderStudents() {
  studentsRow.innerHTML = "";

  let results = Students;

  if (group !== "all") {
    results = Students.filter((el) => el.position === group);
  }

  if (searchInput.value) {
    results = results.filter((el) => {
      return (
        el.firstName.toLowerCase().includes(searchInput.value.trim()) ||
        el.lastName.toLowerCase().includes(searchInput.value.trim())
      );
    });
  }

  results.map((student, i) => {
    studentsRow.innerHTML += getStudentRow(student, i);
  });
}

renderStudents();

studentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const firstName = studentFormElements.firstName.value;
  const lastName = studentFormElements.lastName.value;
  const address = studentFormElements.address.value;
  const birthDay = studentFormElements.birthDay.value
  const position = studentFormElements.position.value;
  const typePosition = studentFormElements.typePosition.value;
  const salary = studentFormElements.salary.value;
  const isMarried = studentFormElements.isMarried.checked || false;

  const student = {
    firstName,
    lastName,
    address,
    birthDay,
    position,
    typePosition,
    salary,
    isMarried,
  };

  if (this.checkValidity()) {
    bootstrap.Modal.getInstance(studentModal).hide();
    if (selectedStudent === null) {
      Students.push(student);
      localStorage.setItem(STUDENTS, JSON.stringify(Students));
    } else {
      Students[selectedStudent] = student;
      localStorage.setItem(STUDENTS, JSON.stringify(Students));
    }
    renderStudents();
  } else {
    this.classList.add("was-validated");
  }
  this.reset();
});

function deleteStudent(i) {
  selectedStudent = i;
}

yesBtn.addEventListener("click", () => {
  Students.splice(selectedStudent, 1);
  bootstrap.Modal.getInstance(confirmModal).hide();
  localStorage.setItem(STUDENTS, JSON.stringify(Students));
  renderStudents();
});

noBtn.addEventListener("click", () => {
  bootstrap.Modal.getInstance(confirmModal).hide();
});

function editStudent(i) {
  saveStudentBtn.innerHTML = "Save student";
  const {
    firstName,
    lastName,
    address,
    position,
    birthDay,
    typePosition,
    salary,
    isMarried,
  } = Students[i];
  console.log(studentFormElements.isMarried);
  studentFormElements.firstName.value = firstName;
  studentFormElements.lastName.value = lastName;
  studentFormElements.address.value = address;
  studentFormElements.birthDay.value = birthDay;
  studentFormElements.position.value = position;
  studentFormElements.typePosition.value = typePosition;
  studentFormElements.salary.value = salary;
  studentFormElements.isMarried.checked = isMarried;
  selectedStudent = i;

  renderStudents();
}

addStudentBtn.addEventListener("click", () => {
  saveStudentBtn.innerHTML = "Add student";
  selectedStudent = null;
  studentForm.reset();
});

filterGroupSelect.addEventListener("change", function () {
  group = this.value;
  renderStudents();
});

searchInput.addEventListener("keyup", function () {
  searchStuff = this.value;
  renderStudents();
});
