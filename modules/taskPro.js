import { Task } from './task.js';

export class TaskPro extends Task {
    constructor(title, text, date, project) {
        super(title, text, date);
        this._project = project;
    }

}

TaskPro.prototype.displayTask = function() {
    Task.prototype.displayTask.call(this);
    console.log(`Project: ${this._project}`);
    return this;
}