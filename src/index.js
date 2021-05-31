import { projectsDOMController } from './projects-dom-controller';
import { todoDOMController } from './todo-dom-controller';
import { projectModule } from './project-module';
import { todoModule } from './todo-module';
import { projectList } from './project-list';
import './index.css';

projectList.setDefaultProject()
let defaultProject = projectList.getDefaultProject()
let projects = projectList.getProjects()
projectsDOMController.loadProjects(defaultProject, projects)

todoDOMController.showList(defaultProject)
projectsDOMController.loadBottomButtons()
todoDOMController.loadTopButtons()
todoDOMController.loadTodoForm()
todoDOMController.loadBottomButtons()

todoModule.addCreateTodoEvents()
todoModule.addTopbarEvents()
todoModule.addAllEditEvents()
projectModule.addEvents()
