// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    
    tasks.forEach(task => {
        createTaskElement(taskList, task.text, task.completed);
    });
}

function createTaskElement(parent, taskText, completed) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    if (completed) {
        taskSpan.classList.add('completed');
    }

    const taskActions = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(taskSpan);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(taskItem);

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Done';
    toggleBtn.onclick = () => toggleCompleted(taskSpan);

    taskActions.appendChild(editBtn);
    taskActions.appendChild(deleteBtn);
    taskActions.appendChild(toggleBtn);

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(taskActions);

    parent.appendChild(taskItem);
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if (taskInput.value.trim() !== '') {
        createTaskElement(taskList, taskInput.value, false);
        saveTaskToLocalStorage(taskInput.value, false);
        taskInput.value = '';
    }
}

function editTask(taskSpan) {
    const newTaskText = prompt('Edit task:', taskSpan.textContent);
    if (newTaskText && newTaskText.trim() !== '') {
        taskSpan.textContent = newTaskText;
        updateTaskInLocalStorage(taskSpan.parentElement.parentElement);
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
    updateTaskInLocalStorage();
}

function toggleCompleted(taskSpan) {
    taskSpan.classList.toggle('completed');
    updateTaskInLocalStorage(taskSpan.parentElement.parentElement);
}

function saveTaskToLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskItem = null) {
    const taskItems = document.querySelectorAll('.task-item');
    const tasks = [];

    taskItems.forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const isCompleted = item.querySelector('span').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    if (taskItem !== null) {
        taskItem.remove();
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
