/**
 * class task
 * @param {number} id - id for each task
 * @param {string} desc - description/would be displayed to user in the todo list
 * @param {Boolean} isCompleted - is the task completed
 */

let addTask = document.getElementById("addTask");
let addButton = document.getElementById("addButton");
let taskList = document.querySelector(".taskList");
let clearCompleted = document.getElementById("clearCompleted");
class Task {
  constructor(desc, id) {
    this.id = id; //generate random id
    this.desc = desc;
    this.isCompleted = false;
  }
}
class Todo {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.TaskInput();
    this.render(this.tasks);
  }

  render(currentTask) {
    //clear task before display
    taskList.innerHTML = "";
    this.displayTask(currentTask);
  }

  //this holds all the event attached to the task, add, clear completed, clear list
  TaskInput() {
    addButton.addEventListener("click", () => {
      if (addTask.value != "" && addTask.value != null) {
        //initialize and push Task class into tasks array
        this.tasks.push(new Task(addTask.value, this.randomId()));
        this.saveToLocalStorage();
        //clear addTask value
        addTask.value = "";
      } else {
        console.error("input cannot be empty");
      }

      //without render, displayTask doesn't seem to work, why?
      this.render(this.tasks);
    });

    clearCompleted.addEventListener("click", () => {
      this.tasks = this.tasks.filter((task) => !task.isCompleted);
      this.saveToLocalStorage();
      this.render(this.tasks);
    });
    // clear every item in the todo list
    clearList.addEventListener("click", () => {
      //Consider adding a confirmation dialog before clearing the entire list, such as window.confirm("Are you sure you want to clear the entire list?").
      this.tasks.length = 0;
      this.saveToLocalStorage();
      this.render(this.tasks);
    });
  }

  randomId() {
    return Math.floor(Math.random() * 9999); //create a random ID for each task
  }

  createDisplayTask(userInput) {
    let li = document.createElement("li");
    li.id = userInput.id;
    li.classList.add("listItem");
    li.textContent = userInput.desc;

    if (userInput.isCompleted) {
      li.style.textDecoration = "line-through";
      li.style.textDecorationColor = "green";
      li.style.color = "rgba(0, 0, 0, 0.253)";
    }
    li.addEventListener("click", () => {
      userInput.isCompleted = !userInput.isCompleted; //add toggle effect to the task
      if (userInput.isCompleted) {
        li.style.textDecoration = "line-through";
        li.style.textDecorationColor = "green";
        li.style.color = "rgba(0, 0, 0, 0.253)";
      } else {
        li.style.textDecoration = "none";
        li.style.color = "black";
      }
    });
    taskList.appendChild(li);
    this.saveToLocalStorage();

    console.log(taskList);
  }

  displayTask(currentTask) {
    currentTask.forEach((userInput) => {
      this.createDisplayTask(userInput);
      console.log(currentTask);
    });
  }

  saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
let todo = new Todo();
// todo.addTaskInput();
// console.log(todo.createDisplayTask());
// console.log(todo.addTask());
