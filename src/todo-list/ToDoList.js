import { Component } from 'react';
import { addTask, getTodos } from '../utils/todo-api.js';
import './ToDoList.css';

export default class ToDoList extends Component {
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
            </li>
          ))}
        </ul>
      </div>
    );
  }

}