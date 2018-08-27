import React, { Component } from "react";
import "./auth.css";

class Auth extends Component {


  setAuthState(userObj) {
    this.props.setAuthState(userObj)
  }

  onChange(e) {
    // Make a copy of state obj that doesn't ref the orignal object
    const userState = this.props.authState;
    userState[e.target.name] = e.target.value;
    this.setAuthState(userState);
  }

  postAuth(route, user) {
    console.log('PostAuth called', route, user );

    return fetch(`http://127.0.0.1:8000/${route}/`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        console.log("auth", response)
        return response.json();
      })
      .then((tokenObj) => {
        console.log("converted token", tokenObj.token);
        localStorage.setItem("token", tokenObj.token)
        localStorage.setItem("user", this.props.authState.first_name)
        return this.setAuthState({
          user: this.props.authState.username,
          username: "",
          password: "",
          isAuth: !this.props.isAuth,
          showUserForm: false
        });
      })
      .catch((err) => {
        console.log("auth no like you, brah", err);
      });
  }

  register() {
    console.log("register called");
    // e.preventDefault();
    // get user data from state, not directly from form
    const {
      username,
      first_name,
      last_name,
      email,
      password
    } = this.props.authState;

    const user = {
      username,
      first_name,
      last_name,
      email,
      password
    };
    this.postAuth("register", user)
    .then( () => {
      console.log("new user registered!")
      this.setAuthState({register: false})
    })
  }

  logIn() {
    console.log('log IN', localStorage.getItem("token"));
    const user = {
      username: this.props.authState.username,
      password: this.props.authState.password
    };
    this.postAuth("api-token-auth", user)
    .then( () => {
      console.log("user logged in!")
    })
  }

  render() {
    const {username, first_name, last_name, email, password, register } = this.props.authState;
    return (
      <div>
        {/* https://blog.stvmlbrn.com/2017/04/07/submitting-form-data-with-react.html */}
        {register &&
          <div>
            <input
              type="text"
              placeholder="first name"
              name="first_name"
              value={first_name}
              onChange={e => this.onChange(e)}
            />
            <input
              type="text"
              placeholder="last name"
              name="last_name"
              value={last_name}
              onChange={e => this.onChange(e)}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={e => this.onChange(e)}
            />
          </div>
        }
        <input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={e => this.onChange(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={e => this.onChange(e)}
        />
        <button onClick = {() => register ? this.register() : this.logIn()}>
          submit
        </button>
      </div>
    );
  }
}

export default Auth;
