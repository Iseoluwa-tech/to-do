// ===== FORM HANDLING =====
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent reload

  let valid = true;
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  formMessage.textContent = "";

  // Required validation
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required";
    valid = false;
  }
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required";
    valid = false;
  } else if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    emailError.textContent = "Please enter a valid email";
    valid = false;
  }

  if (passwordInput.value.trim().length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    valid = false;
  }

  if (valid) {
    formMessage.textContent = "Form submitted successfully!";
        document.querySelector('.container').style.display = 'none';
    document.querySelector('.divider').style.display = 'block';
       localStorage.setItem('isLoggedIn', 'true'); // Save login state
  }
});
// On page load, check login state
window.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.divider').style.display = 'block';
  } else {
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.divider').style.display = 'none';
  }
});
document.getElementById('backToLoginBtn').addEventListener('click', function() {
  document.querySelector('.divider').style.display = 'none';
  document.querySelector('.container').style.display = 'block';
    localStorage.removeItem('isLoggedIn'); // Remove login state
  form.reset();
  formMessage.textContent = "";
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
});

// ===== TO-DO LIST =====
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo;

    const actions = document.createElement("div");
    actions.classList.add("todo-actions");

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveAndRender();
    };

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const newTask = prompt("Edit task:", todo);
      if (newTask) {
        todos[index] = newTask;
        saveAndRender();
      }
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    todoList.appendChild(li);
  });

  todoCount.textContent = `You have ${todos.length} items in your list`;
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  if (task) {
    todos.push(task);
    todoInput.value = "";
    saveAndRender();
  }
});

renderTodos();
// ...existing code...

document.getElementById('backToLoginBtn').addEventListener('click', function() {
  document.querySelector('.divider').style.display = 'none';
  document.querySelector('.container').style.display = 'block';
  // Optionally clear the form and messages
  form.reset();
  formMessage.textContent = "";
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
});

// ...existing code...