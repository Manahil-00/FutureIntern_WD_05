const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const pendingTasksList = document.getElementById("pending-tasks");
const completedTasksList = document.getElementById("completed-tasks");

let tasks = [];

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        addedAt: new Date().toLocaleString()
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = "";
}

function renderTasks() {
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task.text} <small>(Added: ${task.addedAt})</small></span>
            <div>
                ${!task.completed ? `<button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>` : ""}
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        if (task.completed) {
            completedTasksList.appendChild(taskItem);
        } else {
            pendingTasksList.appendChild(taskItem);
        }
    });
}

function completeTask(id) {
    const task = tasks.find((task) => task.id === id);
    task.completed = true;
    task.completedAt = new Date().toLocaleString();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
}

function editTask(id) {
    const task = tasks.find((task) => task.id === id);
    const newTaskText = prompt("Edit your task:", task.text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        task.text = newTaskText;
        renderTasks();
    }
}
