const container = document.querySelector('#container');
const inputName = document.querySelector('#inputName');
const addStudent = document.querySelector('#addStudent');
const note_elev_wrapper = document.querySelector('#note_elev_wrapper');
const showName = document.querySelector('#showName');
const inputGrade = document.querySelector('#inputGrade');
const addGrade = document.querySelector('#addGrade');
const tableDiv = document.querySelector('#tableDiv');
const tableGradesDiv = document.querySelector('#tableGradesDiv');

let array = [];
let avg = 0;
note_elev_wrapper.remove();

class Student {
    constructor (name, grades, avg) {
        this.name = name;
        this.grades = grades;
        this.avg = avg;
    }
}

class UI {
    static createTable() {
        tableDiv.innerHTML = `
        <table id="tableNames">
            <tr>
                <td><b>Nume și prenume</b></td>
                <td><b>Medie</b></td>
                <td><b>Note</b></td>
                <td></td>
            </tr>
        </table>`
        const tableNames = document.querySelector('#tableNames');
        array.forEach(el => {
            let row = tableNames.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.textContent = el.name;
            cell2.textContent = avg;
            cell3.innerHTML = `<button id="view">Vezi note</button>`;
            cell4.innerHTML = `<i class="fas fa-window-close" id="x"></i>`;
        });
    }
    static createTableGrades() { 
        tableGradesDiv.innerHTML = `
        <table id="tableGrades">
            <tr>
                <td><b>Note</b></td>
                <td></td>
            </tr>
        </table>`
        const tableGrades = document.querySelector('#tableGrades');
        const obj = array.find(x => x.name === showName.textContent);
        const index = array.indexOf(obj);
        let sum = 0;
        let count = 0;
        array[index].grades.forEach(el => {
            let row = tableGrades.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.textContent = el;
            cell2.innerHTML = `<i class="fas fa-window-close" id="x"></i>`;
            sum += el;
            count++;
        });
        avg = sum/count;
    }
    static sortArrayUp() {
        array.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
    }
    static sortArrayDown() {
        array.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }
    static sortGradesUp() {
        const obj = array.find(x => x.name === showName.textContent);
        const index = array.indexOf(obj); 
        array[index].grades.sort((a,b) => a-b);
    }
    static sortGradesDown() {
        const obj = array.find(x => x.name === showName.textContent);
        const index = array.indexOf(obj); 
        array[index].grades.sort((a,b) => b-a);
    }
}

container.addEventListener('keypress', function(event) {
    if (event.target.id === 'inputName' && event.key === 'Enter') {
        addStudent.click();
    } else if (event.target.id === 'inputGrade' && event.key === 'Enter') {
        addGrade.click();
    }
});

container.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const td1 = clickedElement.parentNode.parentNode.firstChild;
    if (clickedElement.id === 'addStudent' &&
     inputName.value != "" && inputName.checkValidity()) {
        const student = new Student;
        student.name = inputName.value.toLowerCase();
        student.grades = [];
        array.push(student);
        inputName.value = "";
        UI.createTable();
    } else if (clickedElement.id === 'addGrade' && 
    inputGrade.value != "" && inputGrade.checkValidity()) {
        const obj = array.find(x => x.name === showName.textContent);
        const index = array.indexOf(obj);
        array[index].grades.push(Number(inputGrade.value));
        UI.createTableGrades();
        UI.createTable();
        inputGrade.value = "";
    } else if (clickedElement.id === 'x') {
		clickedElement.parentNode.parentNode.remove();
    } else if (clickedElement.id === "hideGrades") {
        note_elev_wrapper.remove();
    } else if (clickedElement.id === "view") {
        const view = document.querySelector('#view');
        container.append(note_elev_wrapper);
        showName.textContent = view.parentNode.parentNode.firstChild.textContent;
    } else if (clickedElement.id === "sortUp") {
        UI.sortArrayUp();
        tableNames.remove();
        UI.createTable();
    } else if (clickedElement.id === "sortDown") {
        UI.sortArrayDown();
        tableNames.remove();
        UI.createTable();
    } else if (clickedElement.id === "sortGradesUp") {
        UI.sortGradesUp();
        tableGrades.remove();
        UI.createTableGrades();
    } else if (clickedElement.id === "sortGradesDown") {
        UI.sortGradesDown();
        tableGrades.remove();
        UI.createTableGrades();
    } 
});