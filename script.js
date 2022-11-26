const container = document.querySelector(".container");
const gradesContainer = document.querySelector(".gradesContainer");
const inputName = document.querySelector("#inputName");
const inputGrade = document.querySelector("#inputGrade");
const addStudent = document.querySelector("#addStudent");
const addGrade = document.querySelector("#addGrade");
const studentName = document.querySelector(".studentName");
const gradesTable = document.querySelector("#gradesTable");
const studentsTable = document.querySelector("#studentsTable");

let array = [
  { name: "popescu ion", grades: [5, 7, 4, 10, 8] },
  { name: "blandiana ana", grades: [10, 8, 5, 9, 7] },
];
let index;
gradesContainer.style.display = "none";

class Student {
  constructor(name) {
    this.name = name;
    this.grades = [];
  }
}

class UI {
  static createStudentsTable() {
    studentsTable.innerHTML = "";
    let i = 0;
    array.forEach((el) => {
      let row = studentsTable.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      cell1.textContent = el.name;
      cell2.textContent = UI.calculateAvg(i);
      cell3.innerHTML = `<button class="greenBtn view" data-id="${i}">
                            <i class="fa-solid fa-eye view mr" data-id="${i}"></i>
                            Vezi note
                        </button>`;
      cell4.innerHTML = `<button class="redBtn xNames" data-id="${i}">
                            <i class="fas fa-trash xNames mr" data-id="${i}"></i>
                            Șterge
                        </button>`;
      i++;
    });
  }
  static createGradesTable() {
    gradesTable.innerHTML = "";
    let i = 0;
    array[index].grades.forEach((el) => {
      let row = gradesTable.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.textContent = el;
      cell2.innerHTML = `<button class="redBtn xGrades" data-id="${i}">
                            <i class="fas fa-trash xGrades mr" data-id="${i}"></i>
                            Șterge
                        </button>`;
      i++;
    });
  }
  static calculateAvg(i) {
    let sum = 0;
    let count = 0;
    array[i].grades.forEach((el) => {
      sum += el;
      count++;
    });
    if (count !== 0) {
      return (sum / count).toFixed(2);
    }
  }
  static sortArrayUp() {
    array.sort((a, b) => (a.name < b.name ? 1 : -1));
  }
  static sortArrayDown() {
    array.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  static sortGradesUp() {
    array[index].grades.sort((a, b) => b - a);
  }
  static sortGradesDown() {
    array[index].grades.sort((a, b) => a - b);
  }
}

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
    inputName.value != "" &&
    inputName.checkValidity()
  ) {
    const student = new Student(inputName.value.toLowerCase());
    array.push(student);
    inputName.value = "";
    UI.createStudentsTable();
  } else if (
    clickedElement.id === "addGrade" &&
    inputGrade.value != "" &&
    inputGrade.checkValidity()
  ) {
    array[index].grades.push(Number(inputGrade.value));
    inputGrade.value = "";
    UI.createGradesTable();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("view")) {
    index = Number(clickedElement.dataset.id);
    studentName.textContent = array[index].name;
    gradesContainer.style.display = "flex";
    UI.createGradesTable();
  } else if (clickedElement.classList.contains("xNames")) {
    const indexNames = Number(clickedElement.dataset.id);
    array.splice(indexNames, 1);
    gradesContainer.style.display = "none";
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("xGrades")) {
    const indexGrades = Number(clickedElement.dataset.id);
    array[index].grades.splice(indexGrades, 1);
    UI.createGradesTable();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("hideGrades")) {
    gradesContainer.style.display = "none";
  } else if (clickedElement.classList.contains("sortUp")) {
    gradesContainer.style.display = "none";
    UI.sortArrayUp();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("sortDown")) {
    gradesContainer.style.display = "none";
    UI.sortArrayDown();
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
