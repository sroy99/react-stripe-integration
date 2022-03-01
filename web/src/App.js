import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import axios from 'axios'

function App() {
  const [product, setproduct] = useState({
    name: "Abc",
    price: 10,
  });

  const makePayment = async (token) => {
    const body = { token, product };
    const headers = { "Content-Type": "application/json" }; 

    try {
      const response = await axios.post('http://localhost:8000/payment',body,{headers});
      return response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 
        </a>
        <StripeCheckout
          stripeKey="pk_test_51KWbYBSCxTDAyqXLiHYFSsObS7rFEt4qhsX2gVV02FPl5jwri03rGDJNx89ynMmb9ivmmAnLLg7F6grUB8iaM4MZ002HJJ0Yo3"
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
        >
          <button className="btn-large blue">Buy React in 10$</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
