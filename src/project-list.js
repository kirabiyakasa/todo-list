import { Project } from './constructors.js';
import { defaultsModule } from './defaults-module';

const projectList = (() => {

  let projects = { list: [] };

  function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
  }

  if (storageAvailable('localStorage')) {
    if (!localStorage.getItem('projectsList')) {
      console.log('No projects list in local storage.')
    } else {
      let projectsDataList = JSON.parse(localStorage.getItem('projectsList'));
      projectsDataList.forEach(projectData => {
        let project = _createProjectFromData(projectData);
        projects.list.push(project);
      });
    }
  }

  function _sortProjectsByDate() {
  };

  const saveDefaultProject = () => {
    if (storageAvailable('localStorage')) {
      localStorage.setItem('defaultProject', 
                            JSON.stringify(projects.defaultProject))
    }
  };

  const saveProjects = () => {
    if (storageAvailable('localStorage')) {
      localStorage.setItem('projectsList', 
                            JSON.stringify(projects.list))
    }
  };

  function _createProjectFromData(projectData) {
    let project = new Project(projectData.title,
                          projectData.description,
                          projectData.dueDate);
    projectData.todos.forEach(todo => {
      project.addTodo(todo)
    });
    return project
  };

  const setDefaultProject = () => {
    if (!localStorage.getItem('defaultProject')) {
      console.log('No default project in local storage.')
      defaultsModule.loadDefaults()
      let defaultProject = defaultsModule.getDefaultProject()
      projects.defaultProject = defaultProject;
    } else {
      let projectData = JSON.parse(localStorage.getItem('defaultProject'));
      let defaultProject = _createProjectFromData(projectData);
      projects.defaultProject = defaultProject;
    }
  };

  const getDefaultProject = () => {
    return projects.defaultProject
  }

  const getProject = (projectId) => {
    return projects.list[projectId]
  };

  const addProject = (newProject) => {
    projects.list.push(newProject)
    return true
  };

  const getProjects = () => {
    return projects.list
  };

  const deleteProject = (projectId) => {
    projects.list.splice(projectId, 1)
    saveProjects()
  };

  return { setDefaultProject, getProject, getDefaultProject, addProject,
           saveDefaultProject, saveProjects, getProjects, deleteProject }
})();

export { projectList }
