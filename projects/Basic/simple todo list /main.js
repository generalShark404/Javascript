document.addEventListener("DOMContentLoaded", () => {
    const todoInp = document.querySelector("#inp");
    const addTodoBtn = document.querySelector("#btn");
    const items = document.querySelector(".items");
    const message = document.querySelector(".message");
    const intro = document.querySelector("#intro");

    function getLocalStorage() {
        return localStorage.getItem("todoList2") ?
            JSON.parse(localStorage.getItem("todoList2")) : [];
    }

    function setLocalStorage(todos) {
        localStorage.setItem("todoList2", JSON.stringify(todos));
    }

    function renderHtml(todo, id) {
        return `
            <div class="item">
                <span class="todo-text">${id + 1}) ${todo.todo}</span>
                <button class="deleteBtn fas fa-trash" onclick="deleteTodo(${id})"></button>
            </div>
        `;
    }

    function renderTodos() {
        const itemFromLocal = getLocalStorage();
        
        if (itemFromLocal.length > 0) {
            intro.style.display = 'none';
            items.innerHTML = itemFromLocal.map((todo, id) => renderHtml(todo, id)).join('');
        } else {
            intro.style.display = 'block';
        }

        addTodoBtn.addEventListener("click", () => {
            const value = {
                todo: todoInp.value.trim()
            };

            if (value.todo) {
                itemFromLocal.push(value);
                setLocalStorage(itemFromLocal);
                showMessage("Todo added successfully!", "success");
                todoInp.value = "";
                renderTodos();
            } else {
                showMessage("No input, please insert a todo!", "error");
            }
        });
    }

    function showMessage(text, type) {
        message.textContent = text;
        message.style.color = type === "success" ? "green" : "red";
        message.classList.remove('hide');
        setTimeout(() => {
            message.classList.add('hide');
        }, 3000);
    }

    window.deleteTodo = (id) => {
        let todos = getLocalStorage();
        todos.splice(id, 1);
        setLocalStorage(todos);
        showMessage("Todo deleted successfully!", "success");
        renderTodos();
    };

    renderTodos();
});