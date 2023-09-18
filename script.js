// script.js

// Task list array with objects to store additional task details
let tasks = [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        
        // Calculate the remaining days from task assigned date to the deadline
        const assignedDate = new Date(task.date);
        const deadlineDate = new Date(task.deadline);
        const currentDate = new Date();
        let daysRemaining = Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24)) + 1;

        // Ensure daysRemaining is positive or zero
        daysRemaining = daysRemaining >= 0 ? daysRemaining : 0;

        li.innerHTML = `
            <p><strong>${task.name}</strong></p>
            <p>${task.details}</p>
            <p class="date-label">Assigned Date: ${task.date}</p>
            <p class="date-label">Deadline: ${task.deadline} (${daysRemaining} Days Remaining)</p>
            <button type="button" class="btn btn-danger btn-sm float-right delete-task" data-index="${index}">Delete</button>
            <button type="button" class="btn btn-primary btn-sm float-right edit-task" data-index="${index}">Edit</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask(name, details, date, deadline) {
    const assignedDate = new Date(date);
    const deadlineDate = new Date(deadline);

    // Check if the deadline is before the assigned date
    if (deadlineDate < assignedDate) {
        alert('Invalid deadline date. Deadline cannot be set before the assigned date.');
        return;
    }

    const task = {
        name: name,
        details: details,
        date: date,
        deadline: deadline,
    };
    tasks.push(task);
    renderTasks();
}

// Function to edit a task
function editTask(index, newName, newDetails, newDate, newDeadline) {
    const editedTask = {
        name: newName,
        details: newDetails,
        date: newDate,
        deadline: newDeadline,
    };
    tasks[index] = editedTask;
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Event listener for form submission
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskNameInput = document.getElementById('task');
    const taskDetailsInput = document.getElementById('details');
    const taskDateInput = document.getElementById('date');
    const taskDeadlineInput = document.getElementById('deadline');
    
    const name = taskNameInput.value.trim();
    const details = taskDetailsInput.value.trim();
    const date = taskDateInput.value;
    const deadline = taskDeadlineInput.value;

    if (name !== '') {
        addTask(name, details, date, deadline);
        // Clear input fields
        taskNameInput.value = '';
        taskDetailsInput.value = '';
        taskDateInput.value = '';
        taskDeadlineInput.value = '';
    }
});

// Event delegation for edit and delete buttons
const taskList = document.getElementById('task-list');
taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-task')) {
        const index = e.target.getAttribute('data-index');
        deleteTask(index);
    } else if (e.target.classList.contains('edit-task')) {
        const index = e.target.getAttribute('data-index');
        const task = tasks[index];
        const editedName = prompt('Edit the task name:', task.name);
        if (editedName !== null) {
            const editedDetails = prompt('Edit task details:', task.details);
            const editedDate = prompt('Edit task date:', task.date);
            const editedDeadline = prompt('Edit task deadline:', task.deadline);
            editTask(index, editedName, editedDetails, editedDate, editedDeadline);
        }
    }
});
