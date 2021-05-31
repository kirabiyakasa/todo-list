import { projectList } from './project-list';
import { Todo } from './constructors.js';
import { todoDOMController } from './todo-dom-controller';

const todoModule = (() => {

  function _getProjectFromList() {
    let project,
    type, 
    projectId = document.getElementById('project').dataset.projectId
    projectId = parseInt(projectId);

    if (projectId === 0) {
      project = projectList.getDefaultProject()
      type = 'default';
    } else {
      project = projectList.getProject(projectId - 1)
      type = 'nonDefault';
    }
    return { object: project, type }
  };
  // rework this?

  const addTopbarEvents = () => {
    _addDeleteEvent()
    _addCompleteEvent()
  };

  function _closeCurrentEditForm() {
    if (document.getElementById('edit-form-buttons-container')) {
      let todoId = document.getElementById(
               'edit-form-buttons-container'
               ).dataset.editFormId;

      todoId = parseInt(todoId);

      let project = _getProjectFromList();
      let todo = project.object.todos[todoId];

      todoDOMController.showSingleTodo(todo, todoId)
    }
  };

  function _loadEditEvents(button) {
    button.addEventListener('click', (event) => {
      _closeCurrentEditForm()

      let todoId = event.target.dataset.editId;

      let project = _getProjectFromList();
      let todo = project.object.todos[todoId];

      todoDOMController.loadEditForm(todo, todoId)
      _addCancelEditEvent()
      _addConfirmEditEvent()
    });
  };

  const addAllEditEvents = () => {
    let editButtons = document.querySelectorAll('.edit-buttons');

    editButtons.forEach( button => {
      _loadEditEvents(button)
    });
  };

  function _addConfirmEditEvent() {
    let confirmButton = document.getElementById('confirm-edit-todo');

    confirmButton.addEventListener('click', (event) => {
      let todoId = confirmButton.parentNode.dataset.editFormId;
      todoId = parseInt(todoId);
  
      let project = _getProjectFromList(),
      todoItem = document.querySelector(`[data-todo-id="${todoId}"]`),
      todoFields = _getTodoFormFields(todoItem);

      let todo = project.object.editTodo(todoId,
                                        [todoFields.title.value,
                                         todoFields.description.value,
                                         todoFields.dueDate.value])
      if (project.type === 'default') {
        projectList.saveDefaultProject()
      } else {
        projectList.saveProjects()
      }
      todoDOMController.showSingleTodo(todo, todoId)
    });
  };

  const addCreateTodoEvents = () => {
    let newTodoButton = document.getElementById('new-todo-button'),
    cancelNewTodoButton = document.getElementById('cancel-new-todo');

    newTodoButton.addEventListener('click', (event) => {
      if (newTodoButton.innerHTML === 'Add Todo') {
        todoDOMController.showTodoForm()
      } else if (newTodoButton.innerHTML === 'Create Todo') {
        _createNewTodo()
      }
    });

    cancelNewTodoButton.addEventListener('click', (event) => {
      todoDOMController.hideTodoForm()
    });
  };

  function _createNewTodo() {
    let project = _getProjectFromList(),
    newTodoForm = document.getElementById('new-todo-form'),
    todoFields = _getTodoFormFields(newTodoForm);

    let todoItems = document.querySelectorAll('.todo-items'),
    todoId = todoItems.length,

    newTodo = new Todo(todoFields.title.value,
                       todoFields.description.value,
                       todoFields.dueDate.value);
    project.object.addTodo(newTodo)

    if (project.type === 'default') {
      projectList.saveDefaultProject()
    } else {
      projectList.saveProjects()
    }

    todoDOMController.showList(project.object)
    todoModule.addAllEditEvents()
  };

  function _getTodoFormFields(todoItem) {
    let title = todoItem.querySelector('.todo-title-field'),
    description = todoItem.querySelector('.todo-description-field'),
    dueDate = todoItem.querySelector('.todo-duedate-field');

    return { title, description, dueDate }
  };

  function _addCancelEditEvent() {
    let cancelEditTodoButton = document.getElementById('cancel-edit-todo');

    cancelEditTodoButton.addEventListener( 'click', (event) => {
      _closeCurrentEditForm()
    });
  };

  function _addDeleteEvent() {
    let deleteTodoButton = document.getElementById('delete-todo');

    deleteTodoButton.addEventListener('click', (event) => {
      let selectButtons = document.querySelectorAll('.select-buttons'),
      project = _getProjectFromList(),
      actionType = 'delete';

      performCheckboxAction(selectButtons, project, actionType);
      todoDOMController.showList(project.object)
      todoModule.addAllEditEvents()
    });
  };

  function _addCompleteEvent() {
    let completeTodoButton = document.getElementById('complete-todo');

    completeTodoButton.addEventListener('click', (event) => {
      let selectButtons = document.querySelectorAll('.select-buttons'),
      project = _getProjectFromList(),
      actionType = 'complete';

      performCheckboxAction(selectButtons, project, actionType);
      todoDOMController.showList(project.object)
      todoModule.addAllEditEvents()
    });
  };

  function performCheckboxAction(selectButtons, project, actionType) {
    let i = 0;
    selectButtons.forEach( button => {
      if (button.checked) {
        let todoId = button.dataset.checkboxId;
        todoId = parseInt(todoId);

        if (actionType === 'delete') {
          project.object.deleteTodo(todoId - i)
        } else if (actionType === 'complete') {
          project.object.markComplete(todoId)
        }
        i += 1;
      }
    });

    if (project.type === 'default') {
      projectList.saveDefaultProject()
    } else {
      projectList.saveProjects()
    }
  };

  return { addCreateTodoEvents, addTopbarEvents, addAllEditEvents }
})();

export { todoModule }
