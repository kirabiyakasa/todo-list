const projectsDOMController = (() => {

  const loadProjects = (defaultProject, projects) => {
    _loadContainers();
    let projectId = 0;
    _loadDefaultTab(defaultProject, projectId)
    _loadTabs(projects, projectId)
  };

  function _loadDefaultTab(defaultProject, projectId) {
    let tab = _loadTab(defaultProject, projectId)
    showProperties(defaultProject, projectId)
    enlargeTab(tab)
  };

  function _loadTabs(projects, projectId) {
    projects.forEach(project => {
      projectId += 1;
      _loadTab(project, projectId)
    });
  };

  const showProperties = (project, tabId) => {
    let properties = project.getProperties();
    let projectContainer = document.getElementById('project');
    projectContainer.dataset.projectId = tabId;
  
    let description = document.getElementById('project-description'),
        dueDate = document.getElementById('project-due-date'),
        checked = getCheckedElement();

    description.innerHTML = properties.description;
    dueDate.innerHTML = properties.dueDate;
  };

  function getCheckedElement() {
  };

  const enlargeTab = (tab) => {
    tab.style.fontSize = '20px';
  };

  const shrinkTab = (tab) => {
    tab.style.fontSize = '16px';
  };

  function _getContainers() {
    let description = '<h3 id="project-description"></h3>',
        topBar = '<div id="top-todo-bar"></div>',
        todoWrapper = '<div id="todo-list-wrapper"></div>',
        bottomBar = '<div id="bottom-todo-bar"></div>',
        dueDate = '<h2 id="project-due-date"></h2>',
        checked = '<div id="project-checked-status"></div>';
    
    let containers = description + topBar + todoWrapper + bottomBar +
                     dueDate + checked;
    return containers
  };

  function _loadTab(project, i) {
    let titleContainer = document.getElementById('title-tab-container');
    // rename project container
    let title = project.getProperties().title,
    titleTab = document.createElement('p');
    titleTab.className = 'title-tab';
    titleTab.dataset.titleId = i;
    titleTab.innerHTML = title;
    titleContainer.appendChild(titleTab)
    return titleTab
  };

  function _loadContainers() {
    let projectElement = document.getElementById('project');
    let containers = _getContainers();

    projectElement.innerHTML = containers;
    let todoListWrapper = document.getElementById('todo-list-wrapper');

    let todoListContainer = document.createElement('div');
    todoListContainer.id = 'todo-list-container';
    todoListWrapper.appendChild(todoListContainer)
  };

  const loadProjectTabs = (projects) => {
    let i = 1;
    projects.forEach( project => {
      _loadTab(project, i)
      i += 1;
    });
  };

  const appendTab = (newProject) => {
    let projectTabs = document.querySelectorAll('.title-tab');
    let i = projectTabs.length;

    _loadTab(newProject, i)
    return i
  };

  const reloadTabs = (defaultProject, projects, projectId) => {
    let tabContainer = document.getElementById('title-tab-container');
    tabContainer.innerHTML = '';

    appendTab(defaultProject)
    _loadTabs(projects, projectId)
  };
// here ......................
  const loadBottomButtons = () => {
    let bottomBar = document.getElementById('bottom-project-bar');

    let newProjectButton = createNewProjectButton();
    bottomBar.appendChild(newProjectButton)

    let cancelProjectButton = createCancelProjectButton();
    bottomBar.appendChild(cancelProjectButton);

    let deleteProjectButton = createDeleteProjectButton();
    bottomBar.appendChild(deleteProjectButton)
  };

  function createNewProjectButton() {
    let newProjectButton = document.createElement('button');
    newProjectButton.id = 'new-project-button';
    newProjectButton.innerHTML = 'New Project';

    return newProjectButton
  };

  function createCancelProjectButton() {
    let cancelProjectButton = document.createElement('button');
    cancelProjectButton.id = 'cancel-project-button';
    cancelProjectButton.innerHTML = 'Cancel';
    cancelProjectButton.style.display = 'none';

    return cancelProjectButton
  };

  function createDeleteProjectButton() {
    let deleteProjectButton = document.createElement('button');
    deleteProjectButton.id = 'delete-project';
    deleteProjectButton.innerHTML = 'Delete Project'

    return deleteProjectButton
  };

  const showNewProjectForm = (newButton, cancelButton, deleteButton) => {
    newButton.innerHTML = 'Create Project';
    cancelButton.style.display = 'inline-block';
    deleteButton.style.display = 'none';
    _toggleFormFields()
  };

  const cancelNewProject = (newButton, cancelButton, deleteButton) => {
    let titleField = document.getElementById('project-title-field'),
    descriptionField = document.getElementById('project-description-field'),
    projectDueDateField = document.getElementById('project-due-date-field');

    titleField.value = '';
    descriptionField.value = '';
    projectDueDateField.value = '';
    
    newButton.innerHTML = 'New Project';
    cancelButton.style.display = 'none';
    deleteButton.style.display = 'inline-block';
    _toggleFormFields()
  };

  function _toggleFormFields() {
    let projectElement = document.getElementById('project');
    let projectFieldsContainer = document.getElementById('create-project');

    if (projectFieldsContainer.style.display === 'flex') {
      projectElement.style.display = 'block';
      projectFieldsContainer.style.display = 'none';
    } else {
      projectElement.style.display = 'none';
      projectFieldsContainer.style.display = 'flex';
    }
  };

  return { loadProjects, loadProjectTabs, showProperties, 
           loadBottomButtons, enlargeTab, shrinkTab, showNewProjectForm, 
           cancelNewProject, appendTab, reloadTabs }
})();

export { projectsDOMController }
