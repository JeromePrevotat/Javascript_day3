import { Task } from './task.js';

export class TaskPro extends Task {
    constructor(title, text, date, project) {
        super(title, text, date);
        this._project = project;
    }
    toTableRow(){
        const row = document.createElement('tr');
        const titleTd = document.createElement('td');
        titleTd.textContent = this._title;
        row.appendChild(titleTd);
        const textTd = document.createElement('td');
        textTd.textContent = this._text;
        row.appendChild(textTd);
        const dateTd = document.createElement('td');
        dateTd.textContent = this._date.toUTCString();
        row.appendChild(dateTd);
        const locationTd = document.createElement('td');
        locationTd.textContent = (this._location != null) ? this._location : '';
        row.appendChild(locationTd);
        const projectTd = document.createElement('td');
        projectTd.textContent = (this._project != null) ? this._project : '';
        row.appendChild(projectTd);
        return row;
    }

    displayTask() {
        super.displayTask();
        console.log(`Project: ${this._project}`);
        return this;
    }
}
