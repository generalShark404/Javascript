// Selectors
const todoInput = document.querySelector('.addSearch');
const addBtn = document.querySelector('#add');
const checkBox = document.querySelector('#chkbx');
const todosCont = document.querySelector('.todos');
const error = document.querySelector('#error');

let todos = getTodos();
let id = crypto.randomUUID();

// Initialize the application
function init() {
    renderTodos();
    addBtn.addEventListener('click', addTodo);
    checkBox.addEventListener('change', toggleCompletedVisibility);
    todoInput.addEventListener('input', searchTodos);
}

function renderTodos() {
    todosCont.innerHTML = '';
    todos.forEach((todo) => {
        const todoElement = createTodoElement(todo);
        todosCont.appendChild(todoElement);
    });
}

function createTodoElement(todo) {
    const todoEle = document.createElement('div');
    todoEle.classList.add('todo');

    const h2 = document.createElement('h2');
    h2.classList.add('text');
    h2.textContent = todo.todo;
    if (todo.done) h2.classList.add('markdone');
    h2.setAttribute('id', todo.id);

    const doneBtn = document.createElement('span');
    doneBtn.classList.add('fas', 'fa-arrow-right');
    doneBtn.addEventListener('click', () => markDone(todo.id));

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('fas', 'fa-trash');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    todoEle.appendChild(h2);
    todoEle.appendChild(doneBtn);
    todoEle.appendChild(deleteBtn);

    return todoEle;
}

function addTodo() {
    const value = todoInput.value.trim();
    if (value === "") {
        showError("Field can't be empty...");
        return;
    }

    const newTodo = { todo: value, done: false, id: crypto.randomUUID() };
    todos.push(newTodo);
    setTodos(todos);
    renderTodos();
    todoInput.value = "";
}

function markDone(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.done = true;
        setTodos(todos);
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    setTodos(todos);
    renderTodos();
}

function toggleCompletedVisibility() {
    const showCompleted = !checkBox.checked;
    todosCont.querySelectorAll('.todo').forEach(todoEle => {
        const isDone = todoEle.querySelector('.text').classList.contains('markdone');
        if (isDone && !showCompleted) {
            todoEle.style.display = 'none';
        } else {
            todoEle.style.display = 'flex';
        }
    });
}

function searchTodos() {
    const searchValue = todoInput.value.toLowerCase();
    todosCont.querySelectorAll('.todo').forEach(todoEle => {
        const text = todoEle.querySelector('.text').textContent.toLowerCase();
        if (text.includes(searchValue)) {
            todoEle.style.display = 'flex';
        } else {
            todoEle.style.display = 'none';
        }
    });
}

function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    setTimeout(() => {
        error.style.display = 'none';
    }, 2000);
}

function getTodos() {
    try {
        const todo = JSON.parse(localStorage.getItem('todos'));
        return todo ? todo : [];
    } catch (err) {
        console.error('Error fetching todos:', err);
        return [];
    }
}

function setTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Initialize the app
init();