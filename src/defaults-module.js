import { Project, Todo } from './constructors.js';

const defaultsModule = (() => {
  let defaultTodos = [],
      titles = ['Thing 1', 'Thing 2', 'Thing 3'],
      descriptions = ['Do stuff', 'Do more stuff', 'Do some other stuff'],
      dueDates = ['2020/04/30', '2020/05/01', '2020/05/02'];
  
  function _buildDefaultTodos() {
    for(let i = 0; i < titles.length; i++) {
      let newTodo = new Todo(titles[i], descriptions[i], dueDates[i]);
      defaultTodos.push(newTodo)
    }
  };

  let defaultProject,
      projectTitle = 'Main Project Tab',
      projectDescription = 'Projects sorted by earliest due date.',
      projectDueDate = 'N/A';

  function _buildDefaultProject() {
    defaultProject = new Project(projectTitle, projectDescription,
                                 projectDueDate)
    defaultTodos.forEach( todo => {
      defaultProject.addTodo(todo)
    });
  };

  const loadDefaults = () => {
    _buildDefaultTodos()
    _buildDefaultProject()
  };

  const getDefaultProject = () => {
    return defaultProject
  };

  return { loadDefaults, getDefaultProject }
})();

export { defaultsModule }
