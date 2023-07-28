const date = document.getElementById("date");
date.innerText = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric"
});

const form = document.getElementById("form");
const input = document.getElementById("input");
const todoList = document.getElementById("todo-list");
const clearAllButton = document.querySelector("#btn-right button");

// Load Todo list from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
todos.forEach((todo) => {
  const todoItem = createTodoItem(todo.text, todo.completed);
  todoList.appendChild(todoItem);
});

// Save Todo list to local storage
function saveToLocalStorage() {
  const todoItems = [...todoList.children];
  const todos = todoItems.map((item) => ({
    text: item.querySelector("label").textContent,
    completed: item.querySelector("input").checked
  }));
  localStorage.setItem("todos", JSON.stringify(todos));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoText = input.value.trim();
  if (todoText !== "") {
    const todoItem = createTodoItem(todoText);
    todoList.appendChild(todoItem);
    saveToLocalStorage();
    input.value = "";
    input.focus();
  }
});

// Clear All Todos
clearAllButton.addEventListener("click", () => {
  todoList.innerHTML = "";
  saveToLocalStorage();
});

// Mark Todo item as done
todoList.addEventListener("change", (event) => {
  const checkbox = event.target;
  if (checkbox.type === "checkbox") {
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
    } else {
      label.style.textDecoration = "none";
    }
    saveToLocalStorage();
  }
});

// Function to create a new Todo item
function createTodoItem(todoText) {
  const li = document.createElement("li");
  li.className = "list-group-item p-3";

  const checkbox = document.createElement("input");
  checkbox.className = "form-check-input me-1";
  checkbox.type = "checkbox";
  checkbox.id = `todo-${todoList.childElementCount + 1}`;

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.htmlFor = checkbox.id;
  label.textContent = todoText;

  li.appendChild(checkbox);
  li.appendChild(label);

  return li;
}
