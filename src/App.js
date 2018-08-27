import React, { Component } from 'react';
import './App.css';
import Nav from "./nav-component"
import Auth from "./auth-component"

class App extends Component {
  state = {
      isAuth: false,
      showUserForm: false,
      register: false,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      user: ""
    }

  componentDidMount() {
    let token = localStorage.getItem("token")
    let user = localStorage.getItem("user")
    if (token) {
      console.log('user still logged in', user);
      this.setState({
        isAuth: true,
        user: user
      })
    }
  }

  setAuthState(stateObj) {
    this.setState(stateObj, () => {
      console.log(this.state)
    });
  }

  logOut() {
    console.log("log OUT", localStorage.getItem("token"));
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.setAuthState({
      isAuth: !this.state.isAuth
    })
    console.log(localStorage.getItem("token"));
  }

  render() {
    return (
      <div className="App">
        <Nav isAuth={this.state.isAuth} setAuthState={(authobj) => this.setAuthState(authobj)} logOut={() => this.logOut()} user={this.state.user} />

        <h1>This is Bangazon, Bob Ross style</h1>

        {/* conditionally show the auth form only if the user has asked to see it by clicking "login" or "register" in the nav */}
        {this.state.showUserForm ? <Auth authState={this.state} setAuthState={(authobj) => this.setAuthState(authobj)}/> : null}

      </div>
    );
  }
}

export default App;
