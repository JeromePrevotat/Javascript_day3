import { Task } from './task.js';

export class TaskPersonal extends Task {
    constructor(title, text, date, location) {
        super(title, text, date);
        this._location = location;
    }
    
}

TaskPersonal.prototype.displayTask = function() {
    Task.prototype.displayTask.call(this);
    console.log(`Location: ${this._location}`);
    return this;
}