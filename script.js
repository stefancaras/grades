const $ = (query) => document.querySelector(query);
const studentURL = "https://632b4aa31090510116d6319b.mockapi.io/students";
let students = [];
let student;
let response;

//Asynchronous functions
class Async {
  static async fetchStudents() {
    const result = await fetch(studentURL);
    students = await result.json();
    UI.createStudentsTable();
  }
  static async addStudent() {
    response = await fetch(studentURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: $("#inputName").value,
        grades: [],
      }),
    });
    $("#inputName").value = "";
    let data = await response.json();
    console.log(data);
    UI.confirmMsg("student", "added");
    Async.fetchStudents();
  }
  static async deleteStudent(id) {
    response = await fetch(`${studentURL}/${id}`, { method: "DELETE" });
    UI.confirmMsg("student", "removed");
    Async.fetchStudents();
  }
  static async addGrade(string) {
    response = await fetch(`${studentURL}/${student.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grades: student.grades,
      }),
    });
    let data = await response.json();
    console.log(data);
    UI.confirmMsg("grade", string);
  }
}

// Functions grouped in a class
class UI {
  static createStudentsTable() {
    $("#studentsTable").innerHTML = "";
    students.forEach((student) => {
      let row = $("#studentsTable").insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.textContent = student.id;
      cell2.textContent = student.name;
      cell3.textContent = UI.calculateAvg(student.grades);
      cell4.innerHTML = `<button class="greenBtn view" data-id="${student.id}">
                            <i class="fa-solid fa-eye view mr" data-id="${student.id}">
                            </i>Vezi note
                        </button>`;
      cell5.innerHTML = `<button class="redBtn xNames" data-id="${student.id}">
                            <i class="fas fa-trash xNames mr" data-id="${student.id}">
                            </i>Șterge elev
                        </button>`;
    });
  }
  static createGradesTable() {
    $("#gradesTable").innerHTML = "";
    $(".avg").textContent = UI.calculateAvg(student.grades);
    let i = 0;
    student.grades.forEach((grade) => {
      let row = $("#gradesTable").insertRow(0);
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
    array.forEach((grade) => (sum += grade));
    if (array.length !== 0) return (sum / array.length).toFixed(2);
  }
  static sortStudents() {
    students.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }
  static sortGrades() {
    student.grades.sort((a, b) => a - b);
  }
  static confirmMsg(string1, string2) {
    if (response.ok) {
      $(".confirm").textContent = `The ${string1} has been ${string2}.`;
    } else {
      $(".confirm").classList.add("redBg");
      $(".confirm").textContent = "There was a problem, view console log.";
    }
    $(".confirm").style.display = "block";
    setTimeout(() => {
      $(".confirm").style.display = "none";
    }, 1000);
  }
}

// Event listeners
// $(".container").addEventListener("keypress", (event) => {
//   if (event.target.id === "inputName" && event.key === "Enter") {
//     $("#addStudent").click();
//   } else if (event.target.id === "inputGrade" && event.key === "Enter") {
//     $("#addGrade").click();
//   }
// });

$(".container").addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (
    clickedElement.id === "addStudent" &&
    $("#inputName").value !== "" &&
    $("#inputName").checkValidity()
  ) {
    Async.addStudent();
  } else if (
    clickedElement.id === "addGrade" &&
    $("#inputGrade").value !== "" &&
    $("#inputGrade").checkValidity()
  ) {
    student.grades.push(Number($("#inputGrade").value));
    $("#inputGrade").value = "";
    Async.addGrade("added");
    UI.createGradesTable();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("view")) {
    const id = clickedElement.dataset.id;
    student = students.find((el) => el.id === id);
    $(".studentName").textContent = student.name;
    $(".avg").textContent = UI.calculateAvg(student.grades);
    $("#myModal").style.display = "block";
    UI.createGradesTable();
  } else if (clickedElement.classList.contains("xNames")) {
    const id = clickedElement.dataset.id;
    Async.deleteStudent(id);
  } else if (clickedElement.classList.contains("xGrades")) {
    const indexGrades = Number(clickedElement.dataset.id);
    student.grades.splice(indexGrades, 1);
    Async.addGrade("removed");
    UI.createGradesTable();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("close")) {
    $("#myModal").style.display = "none";
  } else if (clickedElement.classList.contains("sortUp")) {
    UI.sortStudents();
    students.reverse();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("sortDown")) {
    UI.sortStudents();
    UI.createStudentsTable();
  } else if (clickedElement.classList.contains("sortGradesUp")) {
    UI.sortGrades();
    student.grades.reverse();
    UI.createGradesTable();
  } else if (clickedElement.classList.contains("sortGradesDown")) {
    UI.sortGrades();
    UI.createGradesTable();
  }
});
Async.fetchStudents();
