import React, { Component } from "react";
import './nav.css';

class Nav extends Component {

  logOut() {
    this.props.logOut()
  }

  displayLogin() {
    this.props.setAuthState({register: false, showUserForm: true})
  }

  // Should the child know about the parent's properties like this? Would it be better to simply call "displayRegister" here and set the props in the render statement?
  displayRegister() {
    this.props.setAuthState({
      register: true,
      showUserForm: true
    })
  }
  // Like so?
  // displayRegister() {
  //   this.props.setAuthState()
  // }
  // Possibly, but then setAuthState isn't reusable. Would need a method for each state change we wanted to have happen. Hmmm
  // end ofcomparison of separation of concerns

  displaySell() {
    this.props.displaySell()
  }

  render() {
    const isAuth = this.props.isAuth
    return (
      <nav>
        <h3>This is a nav bar</h3>
        <ul>
          { isAuth &&
          <span>
            <li>
              <h3>Welcome, {this.props.user}</h3>
            </li>
            <li>
              <button onClick={() => this.displaySell()}>Sell</button>
            </li>
          </span>
          }
          <li>
            <button onClick = {() => isAuth ? this.logOut() : this.displayLogin()}>
            Log {isAuth ? "out" : "in"}
            </button>
          </li>
          { !isAuth &&
          <li>
            <button onClick={() => this.displayRegister()}>Register</button>
          </li>
          }
        </ul>
      </nav>
    )
  }
}

export default Nav
