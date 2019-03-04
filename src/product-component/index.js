import React, { Component } from "react";
import "./product.css";

class ProductForm extends Component {

  state = {
    title: "",
    description: "",
    price: "",
    quantity: ""
  }

  onChange(e) {
    const productState = Object.assign({}, this.state);
    productState[e.target.name] = e.target.value;
    this.setState(productState);
  }

  displaySuccess(prodResponse) {
    console.log("New product added", prodResponse)
  }

  createProduct() {
    const {title, description, price, quantity} = this.state
    const authKey = this.props.token
    console.log("About to save prod", authKey)
    console.log(`Token ${authKey}`)

    return fetch(`http://127.0.0.1:8081/products/`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          price,
          quantity
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authKey}`
        }
      })
      .then((response) => {
        console.log("prod", response)
        return response.json();
      })
      .then((response) => {
        console.log("converted response", response);
        return this.displaySuccess(response)
      })
      .catch((err) => {
        console.log("auth no like you, brah", err);
      });
  }

  render() {
    const {title, description, price, quantity} = this.state
    return (
      <div className="product-container">
        <h1>Sell your stuff, make some cash</h1>
        <div>
            <input
              type="text"
              placeholder="title"
              name="title"
              value={title}
              onChange={e => this.onChange(e)}
            />
            <input
              type="text"
              placeholder="description"
              name = "description"
              value={description}
              onChange={e => this.onChange(e)}
            />
            <input
              type="number"
              step="0.01"
              placeholder="price"
              name="price"
              value={price}
              onChange={e => this.onChange(e)}
            />
            <input
              type="number"
              placeholder="quantity"
              name="quantity"
              value={quantity}
              onChange={e => this.onChange(e)}
            />
          </div>
          <button onClick={() => this.createProduct()}>Submit</button>
      </div>
    )
  }
}

export default ProductForm;
