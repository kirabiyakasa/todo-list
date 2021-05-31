import { format } from 'date-fns'

const todoDOMController = (() => {

  function _createTodoElements(todo) {
    let title = `<p>${todo.title}</p>`,
        description = `<p>${todo.description}</p>`,
        dueDate = `<p>${format(new Date(todo.dueDate.split('/')),
                               'yyyy-MM-dd')}</p>`;

    let todoElements = title + description + dueDate;
    return todoElements
  };

  function _getSelectBox(todoId) {
    let selectButtonContainer = document.createElement('div'),
    selectButton = document.createElement('input');

    selectButtonContainer.className = 'side-bar-sub-container';
    selectButton.className = 'select-buttons';
    selectButton.dataset.checkboxId = todoId;
    selectButton.type = 'checkbox';

    selectButtonContainer.appendChild(selectButton)
    return selectButtonContainer
  };

  function _getTodoListItem(todoElements, todoId) {
    let todoItem = document.createElement('div');
    todoItem.className = 'todo-items';
    todoItem.dataset.todoId = todoId;
    todoItem.innerHTML = todoElements;

    return todoItem
  };

  function _getCompletedStatus(todo, todoItem) {
    let completedStatusContainer = document.createElement('div'),
    completedStatus = document.createElement('p');

    completedStatusContainer.className = 'completed-status-container';
    completedStatus.className = 'completed-status';

    if (todo.checked === true) {
      todoItem.style.textDecoration = 'line-through';
      completedStatus.innerHTML = 'Complete';
    } else {
      completedStatus.innerHTML = 'Incomplete';
    }
    completedStatusContainer.appendChild(completedStatus)

    return completedStatusContainer
  };

  function _getEditButton(i) {
    let editButtonContainer = document.createElement('div'),
    editButton = document.createElement('button');

    editButtonContainer.className = 'edit-button-container';
    editButton.className = 'edit-buttons';
    editButton.innerHTML = 'Edit';
    editButton.dataset.editId = i;
    editButtonContainer.appendChild(editButton)

    return editButtonContainer
  };

  function _getRightBoxes(todo, todoId, todoItem) {
    let rightBoxes = document.createElement('div');
    rightBoxes.className = 'right-side-bar-boxes';

    let completedStatusContainer = _getCompletedStatus(todo, todoItem);
    let editButtonContainer = _getEditButton(todoId);

    rightBoxes.appendChild(completedStatusContainer)
    rightBoxes.appendChild(editButtonContainer)
    return rightBoxes
  };

  function _getListElements(todos) {
    let leftSideBar = document.createElement('div');
    leftSideBar.id = 'left-side-bar';

    let todoList = document.createElement('ol')
    todoList.id = 'todo-list';

    let rightSideBar = document.createElement('div');
    rightSideBar.id = 'right-side-bar';

    let todoId = 0;
    todos.forEach( todo => {
      let listItem = document.createElement('li');
      let todoElements = _createTodoElements(todo);

      let todoItem = _getTodoListItem(todoElements, todoId);
      leftSideBar.appendChild(_getSelectBox(todoId))
      listItem.appendChild(todoItem)
      rightSideBar.appendChild(_getRightBoxes(todo, todoId, todoItem))
      todoList.appendChild(listItem)
      todoId += 1;
    });
    return { leftSideBar, todoList, rightSideBar }
  };

  const showList = (project) => {
    let todos = project.getTodos(),
    todoListContainer = document.getElementById('todo-list-container');
    todoListContainer.innerHTML = '';
    let listElements = _getListElements(todos);

    todoListContainer.appendChild(listElements.leftSideBar)
    todoListContainer.appendChild(listElements.todoList)
    todoListContainer.appendChild(listElements.rightSideBar)
  };

  function _getFormElements() {
    let formElements = '',
    titleElements =
    '<label for="todo-title-field">Title: </label>' +
    '<input class="todo-title-field"></input>',
    descriptionElements =
    '<label for="todo-description-field">Description: </label>' +
    '<input class="todo-description-field"></input>',
    dueDateElements =
    '<label for="due-date-field">Due Date: </label>' +
    '<input type="date" class="todo-duedate-field"' + 
    'max=""></input>';

    let elements = [titleElements, descriptionElements, dueDateElements];

    elements.forEach( element => {
      formElements += '<div class"form-field-containers">' +
                      `${element}</div>`
    });

    return formElements
  };

  const loadTodoForm = () => {
    let todoFormContainer = document.createElement('div');
    todoFormContainer.id = 'todo-form-container';

    let bottomTodoBar = document.getElementById('bottom-todo-bar'),
    todoForm = document.createElement('div'),
    formElements = _getFormElements();

    todoForm.id = 'new-todo-form';
    todoForm.style.display = 'none';
    todoForm.innerHTML = formElements;
    todoFormContainer.appendChild(todoForm)
    bottomTodoBar.appendChild(todoFormContainer)
  };

  const loadTopButtons = () => {
    let deleteButton = document.createElement('button'),
    completeTodoButton = document.createElement('button'),
    topTodoBar = document.getElementById('top-todo-bar');

    deleteButton.id = 'delete-todo';
    deleteButton.innerHTML = 'Delete';
    completeTodoButton.id = 'complete-todo';
    completeTodoButton.innerHTML = 'Complete';

    topTodoBar.appendChild(deleteButton)
    topTodoBar.appendChild(completeTodoButton)
  };

  const loadBottomButtons = () => {
    let todoButtonsContainer = document.createElement('div');
    todoButtonsContainer.id = 'todo-buttons-container';

    let newTodoButton = document.createElement('button'),
    cancelNewTodoButton = document.createElement('button');

    newTodoButton.id = 'new-todo-button';
    cancelNewTodoButton.id = 'cancel-new-todo';
    newTodoButton.innerHTML = 'Add Todo';
    cancelNewTodoButton.innerHTML = 'Cancel';
    cancelNewTodoButton.style.display = 'none';

    todoButtonsContainer.appendChild(newTodoButton)
    todoButtonsContainer.appendChild(cancelNewTodoButton)

    let bottomTodoBar = document.getElementById('bottom-todo-bar');
    bottomTodoBar.appendChild(todoButtonsContainer)
  };

  function _getEditFormElements(todo) {
    console.log(todo.dueDate)
    let title = '<label>Title: </label>' +
                '<input class="todo-title-field"' +
                `value="${todo.title}"></input><br>`,
    description = '<label>Description: </label>' +
                  '<input class="todo-description-field"' +
                  `value="${todo.description}"></input><br>`,
    dueDate = '<label>Due Date: </label>' +
              '<input type="date" class="todo-duedate-field"' +
              `value="${todo.dueDate}"></input>`;

    let formElements = title + description + dueDate;
    return formElements
  };

  function _getEditFormButtons(todoId) {
    let editFormButtonsContainer = document.createElement('div');
    editFormButtonsContainer.id = 'edit-form-buttons-container';
    editFormButtonsContainer.dataset.editFormId = todoId;

    let confirmButton = '<button id="confirm-edit-todo">Confirm</button>',
    cancelButton = '<button id="cancel-edit-todo">Cancel</button>';

    editFormButtonsContainer.innerHTML = confirmButton + cancelButton;
    return editFormButtonsContainer
  };

  const loadEditForm = (todo, todoId) => {
    let todoElement = document.querySelector(`[data-todo-id="${todoId}"]`),
    formElements = _getEditFormElements(todo),
    formButtons = _getEditFormButtons(todoId);

    todoElement.innerHTML = formElements;
    todoElement.appendChild(formButtons)
  };

  function _loadSingleTodo(todo, todoId, todoItem) {
    let todoList = document.getElementById('todo-list'),
    listItem = document.createElement('li'),
    leftSideBar = document.getElementById('left-side-bar'),
    rightSideBar = document.getElementById('right-side-bar');

    leftSideBar.appendChild(_getSelectBox(todoId))
    rightSideBar.appendChild(_getRightBoxes(todo, todoId))

    listItem.appendChild(todoItem)
    todoList.appendChild(listItem)
  };

  function _revertEditForm(item, todoItem) {
    let listElement =  item.parentElement;
    listElement.innerHTML = '';
    listElement.appendChild(todoItem)
  };

  const showSingleTodo = (todo, todoId) => {
    let todoElements = _createTodoElements(todo);
    let todoItem = _getTodoListItem(todoElements, todoId)
    let todoListItems = document.querySelectorAll('.todo-items');

    if (todoListItems.length === todoId) {
      _loadSingleTodo(todo, todoId, todoItem)
    }

    todoListItems.forEach( item => {
      if (item.dataset.todoId == todoId) {
        _revertEditForm(item, todoItem)
      }
    });
  };

  const showTodoForm = () => {
    let newTodoForm = document.getElementById('new-todo-form'),
    newTodoButton = document.getElementById('new-todo-button'),
    cancelNewTodoButton = document.getElementById('cancel-new-todo');

    newTodoForm.style.display = 'flex';
    newTodoButton.innerHTML = 'Create Todo';
    cancelNewTodoButton.style.display = 'inline-block';
  };

  const hideTodoForm = () => {
    let newTodoForm = document.getElementById('new-todo-form'),
    newTodoButton = document.getElementById('new-todo-button'),
    cancelNewTodoButton = document.getElementById('cancel-new-todo');

    newTodoForm.style.display = 'none';
    newTodoButton.innerHTML = 'Add Todo';
    cancelNewTodoButton.style.display = 'none';
  };

  return { showList, loadTodoForm, showTodoForm, hideTodoForm, loadTopButtons,
           loadBottomButtons, loadEditForm, showSingleTodo }
})();

export { todoDOMController }
