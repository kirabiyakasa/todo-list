import { Project } from './constructors.js';
import { projectList } from './project-list';
import { todoModule } from './todo-module';
import { todoDOMController } from './todo-dom-controller';
import { projectsDOMController } from './projects-dom-controller';

const projectModule = (() => {

  const addEvents = () => {
    _addTabEvents()
    _addProjectButtonEvents()
  };

  function _addTabEvents() {
    let projectTabs = document.querySelectorAll('.title-tab');
    projectTabs.forEach( tab => {
      _addTabSwitching(tab)
    });
  };

  function _addTabSwitching(tab) {
    tab.addEventListener('click', (event) => {
      let tabId = parseInt(event.target.dataset.titleId);
      let project;

      if (tabId === 0) {
        project = projectList.getDefaultProject();
      } else {
        project = projectList.getProject(tabId - 1)
      }

      let projectTabs = document.querySelectorAll('.title-tab');
      projectTabs.forEach( tab => {
        projectsDOMController.shrinkTab(tab)
      });
      projectsDOMController.showProperties(project, tabId)
      projectsDOMController.enlargeTab(tab)
      todoDOMController.showList(project)
      todoModule.addAllEditEvents()
    });
  };

  function _getCreateProjectValues() {
    let title = document.getElementById('project-title-field');
    let description = document.getElementById('project-description-field');
    let dueDate = document.getElementById('project-due-date');

    return { title: title.value, description: description.value,
             dueDate: dueDate.value }
  };

  function _addProjectButtonEvents() {
    let newButton = document.getElementById('new-project-button'),
    cancelButton = document.getElementById('cancel-project-button'),
    deleteButton = document.getElementById('delete-project');
    
    newButton.addEventListener('click', (event) => {
      if (event.target.innerHTML === 'New Project') {
        projectsDOMController.showNewProjectForm(event.target,
                                                 cancelButton,
                                                 deleteButton)
      } else if (event.target.innerHTML === 'Create Project') {
        _createProject()
      }
    });

    cancelButton.addEventListener('click', (event) => {
      projectsDOMController.cancelNewProject(newButton,
                                             event.target,
                                             deleteButton)
    });

    // delete event
    deleteButton.addEventListener('click', (event) => {
      _deleteProjectEvent()
    });

  };

  function _deleteProjectEvent() {
    let defaultProject = projectList.getDefaultProject(),
    projects = projectList.getProjects(), 
    projectId = document.getElementById('project').dataset.projectId;
    projectId = parseInt(projectId);

    if (projectId === 0) {
      alert('Cannot delete default project')
    } else {
      projectList.deleteProject(projectId - 1)
    }
    projectId = _switchToLeftTab(projectId);
    projectsDOMController.reloadTabs(defaultProject, projects, 0)

    let tab = document.querySelector(`[data-title-id="${projectId}"]`);
    projectsDOMController.enlargeTab(tab)
    _addTabEvents()
  }

  function _switchToLeftTab(projectId) {
    let project,
    tab;

    if (projectId < 2) {
      projectId = 0;
      tab = document.querySelector('[data-title-id="0"]');
      project = projectList.getDefaultProject();
    } else {
      project = projectList.getProject(projectId - 2);
      projectId -= 1;
    }

    projectsDOMController.showProperties(project, projectId)
    todoDOMController.showList(project)
    todoModule.addAllEditEvents()
    return projectId
  };

  function _createProject() {
    let formValues = _getCreateProjectValues();
    let newProjectButton = document.getElementById('new-project-button');
    let cancelProjectButton = document.getElementById('cancel-project-button'),
    deleteButton = document.getElementById('delete-project');

    let newProject = new Project(formValues.title, formValues.description,
                                    formValues.dueDate);

    if (projectList.addProject(newProject)) {
      let tabNum = projectsDOMController.appendTab(newProject);

      let tab = document.querySelector(`[data-title-id="${tabNum}"]`);
      projectsDOMController.cancelNewProject(newProjectButton,
                                             cancelProjectButton,
                                             deleteButton)
      _addTabSwitching(tab)
    }
    projectList.saveProjects()
  };

  return { addEvents }
})();

export { projectModule }
