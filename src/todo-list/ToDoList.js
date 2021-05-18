import { Component } from 'react';
import { addTask, getTodos, deleteTodo, completeTask } from '../utils/todo-api.js';
import './ToDoList.css';

export default class ToDoList extends Component {
  state = {
    //completed?
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

  handleComplete = async id => {
    const { todos } = this.state;

    try {
      const updatedTodo = await completeTask(id);

      //change complete from false to true if clicked
      const updatedTodos = todos.map(todo => todo.id === id ? updatedTodo : todo);


      this.setState({ todos: updatedTodos });
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
    console.log(todos);
    return (
      <div className="ToDoList">
        <form onSubmit={this.handleAdd}>
          Add a new task: <input value={task} onChange={this.handleTaskChange}/>
        </form>

        <ul>
          {todos.map(task => (
            <li key={task.id}>
              <h2>{task.task}</h2>
              <button className="completed" onClick={() => this.handleComplete(task.id)}>Completed</button>
              <button className="delete" onClick={() => this.handleDelete(task.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

}