import { Component } from 'react';
import { signUp, signIn } from '../utils/todo-api.js';
import './AuthPage.css';

export default class AuthPage extends Component {
  state = {
    isSignUp: true,
    name: '',
    email: '',
    password: '',
    error: ''
  }

  handleSwitch = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  }

  handleSubmit = async e => {
    const { isSignUp } = this.state;
    const { onUser, history } = this.props;
 
    e.preventDefault();

    this.setState({ error: '' });

    console.log(this.props.history);

    try {
      const action = isSignUp ? signUp : signIn;
      const user = await action(this.state);

      onUser(user);

      history.push('/todo-list');
    }
    catch (err) {
      this.setState({ error: err.message });
    } 
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  render() {
    const { isSignUp, name, email, password } = this.state;
    return (
      <form className="AuthPage" onSubmit={this.handleSubmit}> 
        {isSignUp && <p>
          <label>
            <span>Name</span>
            <input name="name" value={name} required={true} onChange={this.handleNameChange}/>
          </label>
        </p>}

        <p>
          <label>
            <span>Email</span>
            <input name="email" required={true} value={email} onChange={this.handleEmailChange}/>
          </label>
        </p>

        <p>
          <label>
            <span>Password</span>
            <input name="password" type="password" required={true} value={password} onChange={this.handlePasswordChange}/>
          </label>
        </p>

        <p>
          <button type="submit">Sign {isSignUp ? 'Up' : 'In'}</button>
        </p>

        <p>
          <button type="button" className="switch" onClick={this.handleSwitch}>
            {isSignUp
              ? 'Already have an account?'
              : 'Need to make an account?'
            }
          </button>
        </p>
      
      </form>
    );
  }
}