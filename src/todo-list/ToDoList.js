import { Component } from 'react';
import { addTask, getTodos, deleteTodo, completeTask } from '../utils/todo-api.js';
import './ToDoList.css';

export default class ToDoList extends Component {
  //state is like local storage in react! it is local to this component.
  state = {
    task: '',
    todos: []  
  }
  
  async componentDidMount() {
    try {

      const todos = await getTodos();
      this.setState({ todos: todos });
    }
    catch (err) {
      console.log(err);
    }
  }

  handleAdd = async e => {
    e.preventDefault();
    const { task, todos } = this.state;

    try {
      const addedTask = await addTask({ task: task });
      const updatedTasks = [...todos, addedTask];
      this.setState({
        todos: updatedTasks,
        task: ''
      });
    }
    catch (err) {
      console.log(err.message);
    }
  }

  handleDelete = async id => {
    const { todos } = this.state;

    try {
      await deleteTodo(id);

      const updatedTasks = todos.filter(todo => todo.id !== id);
      this.setState({ todos: updatedTasks });
    }

    catch (err) {
      console.log(err);
    }
  }

  handleComplete = async task => {
    const { todos } = this.state;

    try {
      //we are making our put request here and sending it completed: true
      const updatedTodo = await completeTask(task, { completed: true });
      //updatedTodo is the response that we are getting from the fetch

      //updatedTodo is used to set state, we are changing todos to updatedTodos
      //mapping through current todos (before updating)in state, checking to see if the unupdated todo matches a todo that we just updated by checking ids, and if they are then we want our updatedTodo to replace the original todo. 
      const updatedTodos = todos.map(todo => todo.id === task.id ? updatedTodo : todo);
      this.setState({ todos: updatedTodos });
      // } else {return this.setState({ todos: todos, completed: false });}

    }

    catch (err) {
      console.log(err);
    }
  }  

  handleTaskChange = ({ target }) => {
    this.setState({ task: target.value });
  }


  render() {
    const { task, todos } = this.state;
    return (
      <div className="ToDoList">
        <form onSubmit={this.handleAdd}>
          Add a new task: <input value={task} onChange={this.handleTaskChange}/>
        </form>

        <ul>
          {/* mapping through each item in todos array (task), render each item */}
          {todos.map(task => (
            <li key={task.id}>
              <h2 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.task}</h2>
              <button className="completed" onClick={() => this.handleComplete(task) }>Completed</button>
              <button className="delete" onClick={() => this.handleDelete(task.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

}