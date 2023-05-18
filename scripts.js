const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');
const tasksContainer = document.querySelector('.tasks-container');

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        inputElement.classList.add('error');
        return;
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;
    taskContent.addEventListener('click', () => handleClick(taskContent, taskItemContainer));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('bi', 'bi-trash');
    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = '';

    updateLocalStorage();
};

const handleClick = (taskContent, taskItemContainer) => {
    taskContent.classList.toggle('completed');
    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer) => {
    taskItemContainer.remove();
    updateLocalStorage();
};

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        inputElement.classList.remove('error');
    }
    updateLocalStorage();
};

const updateLocalStorage = () => {
    const tasks = tasksContainer.querySelectorAll('.task-item');

    const localStorageTasks = Array.from(tasks).map(task => {
        const content = task.querySelector('p');
        const isCompleted = content.classList.contains('completed');

        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if (tasksFromLocalStorage) {
        tasksFromLocalStorage.forEach(task => {
            const taskItemContainer = document.createElement('div');
            taskItemContainer.classList.add('task-item');

            const taskContent = document.createElement('p');
            taskContent.innerText = task.description;

            if (task.isCompleted) {
                taskContent.classList.add('completed');
            }

            taskContent.addEventListener('click', () => handleClick(taskContent, taskItemContainer));

            const deleteItem = document.createElement('i');
            deleteItem.classList.add('bi', 'bi-trash');
            deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer));

            taskItemContainer.appendChild(taskContent);
            taskItemContainer.appendChild(deleteItem);
            tasksContainer.appendChild(taskItemContainer);
        });
    }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener('click', handleAddTask);
inputElement.addEventListener('change', handleInputChange);
