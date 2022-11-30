const container = document.querySelector(".container");
const gradesContainer = document.querySelector(".gradesContainer");
const inputName = document.querySelector("#inputName");
const inputGrade = document.querySelector("#inputGrade");
const addStudent = document.querySelector("#addStudent");
const addGrade = document.querySelector("#addGrade");
const studentName = document.querySelector(".studentName");
const gradesTable = document.querySelector("#gradesTable");
const studentsTable = document.querySelector("#studentsTable");

let students = [];
let index;
gradesContainer.style.display = "none";

class Student {
  constructor(name) {
    this.name = name;
    this.grades = [];
  }
}

// Add students
(() => {
  const surNames = ['Ursu', 'Vulpe', 'Păstrăv', 'Găină', 'Curcă', 
                    'Iepure', 'Berbec', 'Bursuc', 'Crap', 'Vultur',
                    'Mistreț', 'Lupu', 'Arici', 'Știucă', 'Rață',
                    'Șarpe', 'Furnică', 'Șopârlă', 'Gâscă', 'Melc'];
  const names = ['Carmen', 'Viorica', 'Elena', 'Lidia', 'Mihaela', 
                'Stefan', 'Gheorghe', 'Tudor', 'Mircea', 'Andrei'];
  let j = 0
  for (let i = 0; i < 50; i++) {
    let randomNumber = Math.floor(Math.random() * 10);
    const fullName = surNames[j] + " " + names[randomNumber];
    const newStudent = new Student(fullName);
    if (randomNumber < 4) randomNumber += 7;
    newStudent.grades = [10, randomNumber, Math.floor(Math.random() * 6 + 5)]
    students.push(newStudent);
    j++;
    if (j === 20) j = 0;
  }
})()

// Functions grouped in a class
class UI {
  static createStudentsTable() {
    studentsTable.innerHTML = "";
    let i = 0;
    students.forEach(student => {
      let row = studentsTable.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.textContent = i;
      cell2.textContent = student.name;
      cell3.textContent = UI.calculateAvg(students[i].grades);
      cell4.innerHTML = `<button class="greenBtn view" data-id="${i}">
                            <i class="fa-solid fa-eye view mr" data-id="${i}">
                            </i>Vezi note
                        </button>`;
      cell5.innerHTML = `<button class="redBtn xNames" data-id="${i}">
                            <i class="fas fa-trash xNames mr" data-id="${i}">
                            </i>Șterge elev
                        </button>`;
      i++;
    });
  }
  static createGradesTable() {
    gradesTable.innerHTML = "";
    let i = 0;
    students[index].grades.forEach(grade => {
      let row = gradesTable.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.textContent = grade;
      cell2.innerHTML = `<button class="redBtn xGrades" data-id="${i}">
                            <i class="fas fa-trash xGrades mr" data-id="${i}">
                            </i>Șterge notă
                        </button>`;
      i++;
    });
  }
  static calculateAvg(array) {
    let sum = 0;
    array.forEach(grade => sum += grade);
    if (array.length !== 0) return (sum / array.length).toFixed(2);
  }
  static sortStudentsUp() {
    students.sort((a, b) => (a.name < b.name ? 1 : -1));
  }
  static sortStudentsDown() {
    students.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  static sortGradesUp() {
    students[index].grades.sort((a, b) => b - a);
  }
  static sortGradesDown() {
    students[index].grades.sort((a, b) => a - b);
  }
}

// Event listeners
container.addEventListener("keypress", (event) => {
  if (event.target.id === "inputName" && event.key === "Enter") {
    addStudent.click();
  } else if (event.target.id === "inputGrade" && event.key === "Enter") {
    addGrade.click();
  }
});

container.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (
    clickedElement.id === "addStudent" &&
    inputName.value !== "" &&
    inputName.checkValidity()
  ) {
    const student = new Student(inputName.value.toLowerCase());
    students.push(student);
    inputName.value = "";
    UI.createStudentsTable();
  } else if (
    clickedElement.id === "addGrade" &&
    inputGrade.value !== "" &&
    inputGrade.checkValidity()
  ) {
    students[index].grades.push(Number(inputGrade.value));
    inputGrade.value = "";
    UI.createGradesTable();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("view")) {
    index = Number(clickedElement.dataset.id);
    studentName.textContent = students[index].name;
    gradesContainer.style.display = "flex";
    UI.createGradesTable();
  } else if (clickedElement.classList.contains("xNames")) {
    const indexStudents = Number(clickedElement.dataset.id);
    students.splice(indexStudents, 1);
    gradesContainer.style.display = "none";
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("xGrades")) {
    const indexGrades = Number(clickedElement.dataset.id);
    students[index].grades.splice(indexGrades, 1);
    UI.createGradesTable();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("hideGrades")) {
    gradesContainer.style.display = "none";
  } else if (clickedElement.classList.contains("sortUp")) {
    gradesContainer.style.display = "none";
    UI.sortStudentsUp();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("sortDown")) {
    gradesContainer.style.display = "none";
    UI.sortStudentsDown();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("sortGradesUp")) {
    UI.sortGradesUp();
    UI.createGradesTable();
  } else if (clickedElement.classList.contains("sortGradesDown")) {
    UI.sortGradesDown();
    UI.createGradesTable();
  }
});
UI.createStudentsTable();
