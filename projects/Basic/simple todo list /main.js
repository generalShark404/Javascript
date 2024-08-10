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
                <button class="deleteBtn" onclick="deleteTodo(${id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
                </button>
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
            } if(!value.todo) {
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
        window.location.reload()
    };

    renderTodos();
});