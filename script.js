const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("todoList");

document.addEventListener("DOMContentLoaded", loadTodos);

button.addEventListener("click", addTodo);

function addTodo() {
    const text = input.value.trim();
    if (text === "") return;

    const todo = {
        text: text,
        completed: false
    };

    createTodoElement(todo);
    saveTodo(todo);

    input.value = "";
}

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateStorage();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
}

function saveTodo(todo) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(createTodoElement);
}

function updateStorage() {
    const todos = [];
    document.querySelectorAll("li").forEach(li => {
        todos.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
