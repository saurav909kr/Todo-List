const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

const addTodo = () => {
   const inputText = inputBox.value.trim();
   if (inputText.length <= 0) {
      alert("you must write somethings in your to do");
      return false
   }


   if (addBtn.value === "Edit") {
      editTodo.target.previousElementSibling.innerHTML = inputText;
      editlocalTodos(inputText);
      addBtn.value = "Add";
      inputBox.value = "";
   }
   else {

      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = inputText;
      li.appendChild(p);

      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.classList.add("Btn", "edBtn")
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Remove";
      deleteBtn.classList.add("Btn", "delBtn")
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
      inputBox.value = "";
      
      saveLocalTodos(inputText);
   }
} 

const updateTodo = (e) => {
   if (e.target.innerHTML === "Remove") {
      todoList.removeChild(e.target.parentElement);
      deletLocalTodos(e.target.parentElement);
   }

   if (e.target.innerHTML === "Edit") {
      inputBox.value = e.target.previousElementSibling.innerHTML;
      inputBox.focus();
      addBtn.value = "Edit";
      editTodo = e;

   }
}

const saveLocalTodos = (todo) => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos))
}

const getLocalTodos = () => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   else {
      todos = JSON.parse(localStorage.getItem("todos"));
      todos.forEach(todo => {

         const li = document.createElement("li");
         const p = document.createElement("p");
         p.innerHTML = todo;
         li.appendChild(p);

         const editBtn = document.createElement("button");
         editBtn.innerHTML = "Edit";
         editBtn.classList.add("Btn", "edBtn")
         li.appendChild(editBtn);

         const deleteBtn = document.createElement("button");
         deleteBtn.innerHTML = "Remove";
         deleteBtn.classList.add("Btn", "delBtn")
         li.appendChild(deleteBtn);

         todoList.appendChild(li);

      });

   }
}

const deletLocalTodos = (todo) => {

   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }

   let todoText = todo.children[0].innerHTML;
   let todoIndex = todos.indexOf(todoText);
   todos.splice(todoIndex, 1);
   localStorage.setItem("todos", JSON.stringify(todos));
   console.log(todoIndex);
}

const editlocalTodos = (todo) =>{
   let todos = JSON.parse(localStorage.getItem("todos"));
   let todoIndex = todos.indexOf(todo);
   todos[todoIndex] = inputBox.value;
   localStorage.setItem("todos", JSON.stringify(todos));

}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);