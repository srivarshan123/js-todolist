## app.js
```
class Task {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.taskList = document.getElementById('taskList');
        this.taskForm = document.getElementById('taskForm');
        this.taskForm.addEventListener('submit', this.addTask.bind(this));
        this.render();
    }

    addTask(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;
        const newTask = new Task(title, description, dueDate);
        this.tasks.push(newTask);
        this.saveTasks();
        this.render();
        this.taskForm.reset();
    }

    editTask(index) {
        const title = prompt('Enter new title:', this.tasks[index].title);
        const description = prompt('Enter new description:', this.tasks[index].description);
        const dueDate = prompt('Enter new due date:', this.tasks[index].dueDate);
        if (title && description && dueDate) {
            this.tasks[index].title = title;
            this.tasks[index].description = description;
            this.tasks[index].dueDate = dueDate;
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.render();
    }

    toggleComplete(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.render();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    render() {
        this.taskList.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'complete' : '';
            taskItem.innerHTML = `
                <span>${task.title} - ${task.description} (Due: ${task.dueDate})</span>
                <div>
                    <button onclick="toDoList.toggleComplete(${index})">${task.completed ? 'Incomplete' : 'Complete'}</button>
                    <button onclick="toDoList.editTask(${index})">Edit</button>
                    <button onclick="toDoList.deleteTask(${index})">Delete</button>
                </div>
            `;
            this.taskList.appendChild(taskItem);
        });
    }
}

const toDoList = new ToDoList();
```
