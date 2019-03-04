import React, { Component } from 'react';
import './App.css';
import Nav from "./nav-component"
import Auth from "./auth-component"
import ProductForm from "./product-component"

class App extends Component {
  state = {
      isAuth: false,
      showUserForm: false,
      register: false,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      password: "",
      user: "",
      showSellForm: false
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
      // console.log(this.state)
    })
  }

  displaySell() {
    this.setState({showSellForm: !this.state.showSellForm})
  }

  logOut() {
    console.log("log OUT", localStorage.getItem("token"));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Set everything to false again
    this.setAuthState({
      isAuth: !this.state.isAuth,
      user: "",

    })
    console.log(localStorage.getItem("token")) // Will be gone
  }

  render() {
    return (
      <div className="App">
        <Nav
          isAuth={this.state.isAuth}
          setAuthState={(stateObj) => this.setAuthState(stateObj)} logOut={() => this.logOut()}
          user={this.state.user}
          displaySell={() => this.displaySell()}
        />

        <h1>This is Bangazon, Bob Ross style</h1>

        {/* conditionally show the auth form only if the user has asked to see it by clicking "login" or "register" in the nav */}
        {this.state.showUserForm ? <Auth authState={this.state} setAuthState={(authobj) => this.setAuthState(authobj)}/> : null}

        {/* conditionally show the product form only if the user has asked to see it by clicking "sell" in the nav */}
        {this.state.showSellForm ? <ProductForm token={localStorage.getItem("token")} displaySell={() => this.displaySell()}/> : null}

      </div>
    )
  }
}

export default App
