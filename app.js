const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');
const initialTaskItems = [...incompleteTasksList.children, ...completedTasksList.children];

const createTaskItem = function (taskString) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  //innerText encodes special characters, HTML does not.
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskItem(taskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const parentList = listItem.parentNode;

  parentList.removeChild(listItem);
};

const setTaskCompletion = function () {
  const listItem = this.parentNode;
  const isChecked = this.checked;
  const targetList = isChecked ? completedTasksList : incompleteTasksList;

  targetList.append(listItem);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = setTaskCompletion;
};

for (const task of initialTaskItems) {
  bindTaskEvents(task);
}
