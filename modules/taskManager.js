import { Task } from './task.js';

export class TaskManager {
    constructor() {
        this._tasks = [];
    }

    addTask(task) {
        if (this.errorHandler(task)) return;
        this._tasks.push(task);
    }

    removeTask(task) {
        if (this.errorHandler(task)) return;
        const index = this._tasks.indexOf(task);
        if (index > -1) this._tasks.splice(index, 1);
    }

    errorHandler(task) {
        if (task == null) return () => {
            console.error("Cannot add a null task");
            return true;
        };
        if (!(task instanceof Task)) return () => {
            console.error("Only instances of Task can be added");
            return true;
        };
        return false;
    }

    filterByKeyword(keyword) {
        if (keyword == null || keyword.trim() === "") return [];
        return this._tasks.filter(task => {
            let result = [];
            if (task.getTitle().includes(keyword.trim()) || task.getText().includes(keyword.trim())) result.push(task);
            return result;
        });
    }

    filterByDate(startDate, endDate) {
        if (startDate == null || endDate == null) return [];
        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        if (sDate > eDate) return [];
        return this._tasks.filter(task => task.isBetween(startDate, endDate));
    }

    displayAllTasks() {
        if (this._tasks != null && this._tasks.length > 0) for (let task of this._tasks) task.displayTask();
        else console.log("No tasks available.");
    }

    countTasks() {
        if (this._tasks != null && this._tasks.length > 0) return this._tasks.length;
        console.log("No tasks available.");
    }
}
