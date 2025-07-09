import { Task } from './modules/task.js';
import { TaskPersonal } from './modules/taskPersonal.js';
import { TaskPro } from './modules/taskPro.js';
import { TaskManager } from './modules/taskManager.js';

const taskTypeSelect = document.getElementById('taskTypeSelect');
const taskTitleInput = document.getElementById('taskTitleInput');
const taskTextInput = document.getElementById('taskTextInput');
const taskLocationInputContainer = document.getElementById('taskLocationInputContainer');
const taskLocationInput = document.getElementById('taskLocationInput');
const taskProjectInputContainer = document.getElementById('taskProjectInputContainer');
const taskProjectInput = document.getElementById('taskProjectInput');
const addTaskButton = document.getElementById('addTaskButton');
const displayTaskTableBody = document.getElementById('displayTaskTableBody');

const taskManager = new TaskManager();

function addEventListeners() {
    // SELECT TYPE LISTENER
    taskTypeSelect.addEventListener('change', (event) => {
        if (taskTypeSelect.value !== "1" && taskTypeSelect.value !== "2" && taskTypeSelect.value !== "3") {
            taskTypeSelect.classList.add('is-invalid');
            taskLocationInputContainer.classList.add('d-none');
            taskProjectInputContainer.classList.add('d-none');
        }
        else taskTypeSelect.classList.remove('is-invalid');
        // Clear inputs
        clearInputs();
        switch (taskTypeSelect.value) {
            case "1":
                // Remove unused label input
                taskLocationInputContainer.classList.add('d-none');
                taskProjectInputContainer.classList.add('d-none');
                break;
            case "2":
                // Show in use label
                taskLocationInputContainer.classList.remove('d-none');
                // Remove unused label
                taskProjectInputContainer.classList.add('d-none');
                break;
            case "3":
                // Remove unused label
                taskLocationInputContainer.classList.add('d-none');
                // Show in use label
                taskProjectInputContainer.classList.remove('d-none');
                break;
        }
    });
    // ADD TASK BUTTON LISTENER
    addTaskButton.addEventListener('click', (event) => addTask(event));
}

function clearInputs() {
    taskTitleInput.value = '';
    taskTextInput.value = '';
    taskLocationInput.value = '';
    taskProjectInput.value = '';
}

function addTask(event){
    event.preventDefault();
    const taskType = taskTypeSelect.value;
    const taskTitle = taskTitleInput.value;
    const taskText = taskTextInput.value;
    const taskLocation = taskLocationInput.value;
    const taskProject = taskProjectInput.value;

    let task;
    switch (taskType) {
        case "1":
            task = new Task(taskTitle.trim(), taskText.trim(), new Date(Date.now()));
            console.log("SWITCH 1");
            break;
        case "2":
            task = new TaskPersonal(taskTitle.trim(), taskText.trim(), new Date(Date.now()), taskLocation.trim());
            console.log("SWITCH 2");
            break;
        case "3":
            task = new TaskPro(taskTitle.trim(), taskText.trim(), new Date(Date.now()), taskProject.trim());
            console.log("SWITCH 3");
            break;
        default:
            console.error("Invalid task type");
            return;
        }

    taskManager.addTask(task);
    // DEBUG
    taskManager.displayAllTasks();

    displayAllTasks();
    clearInputs();
}

function displayAllTasks() {
    // Clear the table body
    while (displayTaskTableBody.firstChild) displayTaskTableBody.removeChild(displayTaskTableBody.firstChild);
    // Rebuild the table with current tasks
    // if (taskManager._tasks.length === 0)
    for (let task of taskManager._tasks){
        console.log(task);
        const row = document.createElement('tr');        
        displayTaskTableBody.appendChild(row);

        const titleTd = document.createElement('td');
        titleTd.textContent = (task._title == null) ? '' : task._title;
        row.appendChild(titleTd);

        const textTd = document.createElement('td');
        textTd.textContent = (task._text == null) ? '' : task._text;
        row.appendChild(textTd);

        const locationTd = document.createElement('td');
        locationTd.textContent = (task._location == null) ? '' : task._location;
        row.appendChild(locationTd);

        const projectTd = document.createElement('td');
        projectTd.textContent = (task._project == null) ? '' : task._project;
        row.appendChild(projectTd);
    }
}

function main() {
    console.log("Task Management System");
    addEventListeners();
    console.log("Event listeners added");
    taskLocationInputContainer.classList.add('d-none');
    taskProjectInputContainer.classList.add('d-none');
}

main();