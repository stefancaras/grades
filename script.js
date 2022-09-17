const container = document.querySelector('#container');
const note_elev_wrapper = document.querySelector('#note_elev_wrapper');
const inputName = document.querySelector('#inputName');
const inputGrade = document.querySelector('#inputGrade');
const addStudent = document.querySelector('#addStudent');
const addGrade = document.querySelector('#addGrade');
const showName = document.querySelector('#showName');
const tableDiv = document.querySelector('#tableDiv');
const tableGradesDiv = document.querySelector('#tableGradesDiv');

let array = [{name: 'popescu ion', grades: [5, 7, 4, 10, 8]},
    {name: 'blandiana ana', grades: [5, 9, 7, 10, 8]}];
let index;
note_elev_wrapper.remove();

class Student {
    constructor (name, grades) {
        this.name = name;
        this.grades = grades;
    }
}

class UI {
    static createTableNames() {
        tableDiv.innerHTML = `
            <table id="tableNames">
                <tr>
                    <td><b>Nume și prenume</b></td>
                    <td><b>Medie</b></td>
                    <td><b>Note</b></td>
                    <td></td>
                </tr>
            </table>`;
        const tableNames = document.querySelector('#tableNames');
        let i = 0;
        array.forEach(el => {
            let row = tableNames.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.textContent = el.name;
            cell2.textContent = UI.calculateAvg(i);
            cell3.innerHTML = `<button class="view" id="${i+1000}">Vezi note</button>`;
            cell4.innerHTML = `<i class="fas fa-window-close xNames" id="${i+2000}"></i>`;
            i++;
        });
    }
    static createTableGrades() { 
        tableGradesDiv.innerHTML = `
            <table id="tableGrades">
                <tr>
                    <td><b>Note</b></td>
                    <td></td>
                </tr>
            </table>`;
        const tableGrades = document.querySelector('#tableGrades');
        let i = 0;
        array[index].grades.forEach(el => {
            let row = tableGrades.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.textContent = el;
            cell2.innerHTML = `<i class="fas fa-window-close xGrades" id="${i}"></i>`;
            i++;
        });
    }
    static calculateAvg(i) {
        let sum = 0;
        let count = 0;
        array[i].grades.forEach(el => {
            sum += el;
            count++;
        });
        return (sum/count).toFixed(2);
    }
    static sortArrayUp() {
        array.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
    }
    static sortArrayDown() {
        array.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }
    static sortGradesUp() { 
        array[index].grades.sort((a,b) => b-a);
    }
    static sortGradesDown() {
        array[index].grades.sort((a,b) => a-b);
    }
}

container.addEventListener('keypress', (event) => {
    if (event.target.id === 'inputName' && event.key === 'Enter') {
        addStudent.click();
    } else if (event.target.id === 'inputGrade' && event.key === 'Enter') {
        addGrade.click();
    }
});

container.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.id === 'addStudent' &&
    inputName.value != "" && inputName.checkValidity()) {
        const student = new Student;
        student.name = inputName.value.toLowerCase();
        student.grades = [];
        array.push(student);
        inputName.value = "";
        UI.createTableNames();
    } else if (clickedElement.id === 'addGrade' && 
    inputGrade.value != "" && inputGrade.checkValidity()) {
        array[index].grades.push(Number(inputGrade.value));
        inputGrade.value = "";
        UI.createTableGrades();
        UI.createTableNames();
    } else if (clickedElement.classList.contains("view")) {
        index = Number(clickedElement.id)-1000;
        showName.textContent = array[index].name;
        container.append(note_elev_wrapper);
        UI.createTableGrades();
    } else if (clickedElement.classList.contains("xNames")) {
        const indexNames = Number(clickedElement.id)-2000;
		array.splice(indexNames,1);
        if (index === indexNames) {
            note_elev_wrapper.remove();
        }
        UI.createTableNames();
    } else if (clickedElement.classList.contains("xGrades")) {
        const indexGrades = Number(clickedElement.id);
		array[index].grades.splice(indexGrades,1);
        UI.createTableGrades();
        UI.createTableNames();
    } else if (clickedElement.id === "hideGrades") {
        note_elev_wrapper.remove();
    } else if (clickedElement.id === "sortUp") {
        UI.sortArrayUp();
        UI.createTableNames();
    } else if (clickedElement.id === "sortDown") {
        UI.sortArrayDown();
        UI.createTableNames();
    } else if (clickedElement.id === "sortGradesUp") {
        UI.sortGradesUp();
        UI.createTableGrades();
    } else if (clickedElement.id === "sortGradesDown") {
        UI.sortGradesDown();
        UI.createTableGrades();
    } 
});
UI.createTableNames();