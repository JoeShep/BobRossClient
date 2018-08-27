import React, { Component } from "react";
import './nav.css';

class Nav extends Component {

  logOut() {
    this.props.logOut()
  }

  displayLogin() {
    this.props.setAuthState({register: false, showUserForm: true})
  }

  displayRegister() {
    this.props.setAuthState({
      register: true,
      showUserForm: true
    })
  }

  render() {
    const isAuth = this.props.isAuth
    return (
      <nav>
        <h3>This is a nav bar</h3>
        { isAuth &&
          <h3>Welcome, {this.props.user}</h3>
        }
        <ul>
          <li>
            <button onClick = {e => isAuth ? this.logOut(e) : this.displayLogin(e)}>
            Log {isAuth ? "out" : "in"}
            </button>
          </li>
          { !isAuth &&
          <li>
            <button onClick={e => this.displayRegister(e)}>Register</button>
          </li>
          }
        </ul>
      </nav>
    )
  }
}

export default Nav
