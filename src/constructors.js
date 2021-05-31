function Todo(title, description, dueDate) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.checked = false;
}

function Project(title, description, dueDate) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.checked = false;

  this.todos = [];

  this.getProperties = function() {
    return { title: this.title, description: this.description, 
             dueDate: this.dueDate, checked: this.checked }
  };

  this.getTodos = function() {
    return this.todos
  };

  this.addTodo = function(todo) {
    this.todos.push(todo)
    this.sortTodosByDate()
  };

  this.editTodo = function(todoId, newProperties) {
    let todo = this.todos[todoId];

    let i = 0;
    for (let property in todo) {
      if (newProperties) {
        todo[property] = newProperties[i]
      }
      i += 1;
    }
    return todo
  }

  this.deleteTodo = function(todoId) {
    this.todos.splice(todoId, 1)
  }

  this.markComplete = function(todoId) {
    this.todos[todoId].checked = true;
  };

  this.sortTodosByDate = function() {
    this.todos.sort(function(a, b) {
      var dateA = new Date(a.dueDate), dateB = new Date(b.dueDate);
      return dateA - dateB
    });
  };
}

export { Todo, Project };
// inherit prototype for <this> variables
