const container = document.querySelector('#container');
const name = document.querySelector('#name');
const addStudent = document.querySelector('#addStudent');
const sortUp = document.querySelector('#sortUp');
const sortDown = document.querySelector('#sortDown');
const tableNames = document.querySelector('#tableNames');
const note_elev_wrapper = document.querySelector('#note_elev_wrapper');
const grade = document.querySelector('#grade');
const addGrade = document.querySelector('#addGrade');
const sortGradesUp = document.querySelector('#sortGradesUp');
const sortGradesDown = document.querySelector('#sortGradesDown');

name.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addStudent.click();
    }
});

grade.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addGrade.click();
    }
});

addStudent.addEventListener('click', function() {
    if (name.value != "") {
        let row = tableNames.insertRow(1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell1.innerText = name.value;
        cell2.innerText = 10;
        cell3.innerHTML = `<button id="view">Vezi note</button>`;
        cell4.innerHTML = `<i class="fas fa-window-close" id="x"></i>`;
        name.value = "";
    }
});

container.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const td1 = clickedElement.parentNode.parentNode.firstChild;
    if (clickedElement.id === 'x') {
		clickedElement.parentNode.parentNode.remove();
    } else if (clickedElement.id === "hideGrades") {
        note_elev_wrapper.remove();
    } else if (clickedElement.id === "view") {
        note_elev_wrapper.append();
    }
});