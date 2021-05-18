import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {

  render() { 
    return (
      <header className="Header">

        <NavLink to="/todo-list">To-Do Tracker</NavLink>
        
      </header>
    );
  }

}
 
export default Header;