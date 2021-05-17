import { Component } from 'react';
import './AuthPage.css';

export default class AuthPage extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <form className="AuthPage"> 
        <p>
          <label>
            <span>Name</span>
            <input name="name" value={name} required={true}/>
          </label>
        </p>

        <p>
          <label>
            <span>Email</span>
            <input name="email" required={true} value={email}/>
          </label>
        </p>

        <p>
          <label>
            <span>Password</span>
            <input name="password" type="password" required={true} value={password}/>
          </label>
        </p>

        <p>
          <button type="submit"></button>
        </p>

        <p>
          <button type="button">

          </button>
        </p>
      
      </form>
    );
  }
}