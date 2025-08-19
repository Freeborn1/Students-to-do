const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = function() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed));
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  renderTask(taskText, false);
  saveTasks();
  taskInput.value = "";
}

function renderTask(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  // Toggle completion
  li.addEventListener("click", function() {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = function(e) {
    e.stopPropagation(); // prevent toggle
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
