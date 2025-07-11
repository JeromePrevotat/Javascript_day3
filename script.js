import { Task } from './modules/task.js';
import { TaskPersonal } from './modules/taskPersonal.js';
import { TaskPro } from './modules/taskPro.js';
import { TaskManager } from './modules/taskManager.js';

const taskTypeSelect = document.getElementById('taskTypeSelect');
const taskTitleInput = document.getElementById('taskTitleInput');
const taskTextInput = document.getElementById('taskTextInput');
const taskDateInput = document.getElementById('taskDateInput');
const taskLocationInputContainer = document.getElementById('taskLocationInputContainer');
const taskLocationInput = document.getElementById('taskLocationInput');
const taskProjectInputContainer = document.getElementById('taskProjectInputContainer');
const taskProjectInput = document.getElementById('taskProjectInput');
const addTaskButton = document.getElementById('addTaskButton');
const displayTaskTableBody = document.getElementById('displayTaskTableBody');
const filterInput = document.getElementById('filter-input');
const startDateFilterInput = document.getElementById('filter-startDate');
const endDateFilterInput = document.getElementById('filter-endDate');

const taskManager = new TaskManager();
let oldTimeoutID = 0;
let nb_thread = 0;

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

    // FILTER INPUT LISTENER
    filterInput.addEventListener('input', (event) => {
        if (oldTimeoutID){
            console.log("Clearing old timeout ID: ", oldTimeoutID);
            clearTimeout(oldTimeoutID);
        }
        oldTimeoutID = setTimeout(() => {
            applyFilter(event);
        }, 2000);
    });

    startDateFilterInput.addEventListener('input', (event) => {
        if (oldTimeoutID){
            console.log("Clearing old timeout ID: ", oldTimeoutID);
            clearTimeout(oldTimeoutID);
        }
        oldTimeoutID = setTimeout(() => {
            applyFilter(event);
        }, 2000);
    });

    endDateFilterInput.addEventListener('input', (event) => {
        if (oldTimeoutID){
            console.log("Clearing old timeout ID: ", oldTimeoutID);
            clearTimeout(oldTimeoutID);
        }
        oldTimeoutID = setTimeout(() => {
            applyFilter(event);
        }, 2000);
    });

}

function clearInputs() {
    taskTitleInput.value = '';
    taskTextInput.value = '';
    taskDateInput.value = '';
    taskLocationInput.value = '';
    taskProjectInput.value = '';
}

function clearDisplayTasksTable() {
    while (displayTaskTableBody.firstChild) displayTaskTableBody.removeChild(displayTaskTableBody.firstChild);
}

function validateTaskCreationInputs() {
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.alert-danger').forEach(errorLabel => errorLabel.classList.add('d-none'));

    if (taskTitleInput.value == null || taskTitleInput.value.trim() === '') {
        document.getElementById('taskTitleInputError').classList.remove('d-none');
        isValid = false;
    }

    if (taskTextInput.value == null || taskTextInput.value.trim() === '') {
        document.getElementById('taskTextInputError').classList.remove('d-none');
        isValid = false;
    }

    if (taskDateInput.value == null || taskDateInput.value.trim() === '') {
        document.getElementById('taskDateInputError').classList.remove('d-none');
        isValid = false;
    }

    if (taskLocationInput.value == null || taskLocationInput.value.trim() === '') {
        document.getElementById('taskLocationInputError').classList.remove('d-none');
        isValid = false;
    }

    if (taskProjectInput.value == null || taskProjectInput.value.trim() === '') {
        document.getElementById('taskProjectInputError').classList.remove('d-none');
        isValid = false;
    }

    return isValid;
}

function addTask(event){
    event.preventDefault();
    const taskType = taskTypeSelect.value;
    const taskTitle = taskTitleInput.value;
    const taskText = taskTextInput.value;
    const taskDate = taskDateInput.value;
    const taskLocation = taskLocationInput.value;
    const taskProject = taskProjectInput.value;

    let task;
    // Validate inputs before creating a task
    if (!validateTaskCreationInputs()) return;

    switch (taskType) {
        case "1":
            task = new Task(taskTitle.trim(), taskText.trim(), new Date(taskDate.trim()));
            break;
        case "2":
            task = new TaskPersonal(taskTitle.trim(), taskText.trim(), new Date(taskDate.trim()), taskLocation.trim());
            break;
        case "3":
            task = new TaskPro(taskTitle.trim(), taskText.trim(), new Date(taskDate.trim()), taskProject.trim());
            break;
        default:
            console.error("Invalid task type");
            return;
        }

    taskManager.addTask(task);
    // DEBUG
    taskManager.displayAllTasks();

    displayAllTasks(taskManager._tasks);
    clearInputs();
}

function displayAllTasks(tasks) {
    // Clear the table body
    clearDisplayTasksTable();
    // Rebuild the table with current tasks
    if (tasks.length === 0){
        const row = document.createElement('tr');
        const emptyTd = document.createElement('td');
        emptyTd.setAttribute('colspan', '5');
        emptyTd.textContent = 'No tasks available';
        row.appendChild(emptyTd);
        displayTaskTableBody.appendChild(row);
        return;
    }
    for (let task of tasks){
        console.log(task);
        const row = task.toTableRow();
        displayTaskTableBody.appendChild(row);
    }
}

function applyFilter(event) {
    console.log("nb_thread: ", nb_thread);
    const keyword = filterInput.value.toLowerCase();
    const startDate = startDateFilterInput.value;
    const endDate = endDateFilterInput.value;
    let filteredTasks = taskManager._tasks;
    console.log("Applying filter with keyword: ", keyword, "Start Date: ", startDate, "End Date: ", endDate);

    if ((keyword == null || keyword.trim() === '')
        && (startDate == null || startDate.trim() === '')
        && (endDate == null || endDate.trim() === '')) {
        displayAllTasks(taskManager._tasks);
        return;
    }
    // Clear the table body
    clearDisplayTasksTable();
    // Filter tasks based on the keyword
    if (keyword && keyword.trim() !== '') {
        filteredTasks = filteredTasks.filter(task => {
            return (task._title != null && task._title.toLowerCase().includes(keyword)) ||
                   (task._text != null && task._text.toLowerCase().includes(keyword)) ||
                   (task._location != null && task._location.toLowerCase().includes(keyword)) ||
                   (task._project != null && task._project.toLowerCase().includes(keyword));
        });
    }

    // Filter tasks based on the date range
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start > end) return console.error("Start date cannot be after end date");

        filteredTasks = filteredTasks.filter(task => task.isBetween(start, end));
        filteredTasks.filter(task => console.log(task.isBetween(start, end)));
    }
    displayAllTasks(filteredTasks);
}

function main() {
    console.log("Task Management System");
    addEventListeners();
    console.log("Event listeners added");
    taskLocationInputContainer.classList.add('d-none');
    taskProjectInputContainer.classList.add('d-none');
}

main();