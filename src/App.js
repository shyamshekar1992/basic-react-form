import React, { Component } from "react";
import "./App.css";
import Form from "./Form";

class App extends Component {
  state = {
    amount: "",
    times: "",
    monthly: 0,
    yearly: 0
  };

  handleChange = (e) => {
    const { name, value } = e.target
    console.log("text entered", name, value)
    if (isNaN(value)) {
      this.setState({
        error: 'Please enter valid number'
      })
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  calculate = () => {
    const { amount, times } = this.state;
    const final = Number(amount) < 5000 ? Number(amount) * 0.014 * times : Number(amount) * 0.015 * times;
    console.log("calculated amount", final)
    // let basic = 0;
    // if (taxRate < 0.35) {
    //   basic = 0.35
    // } else if (taxRate > 2) {
    //   basic = 2
    // } else {
    //   basic = taxRate
    // }
    // const final = amount * times * basic
    // console.log("estimated amount", final)
    this.setState({
      monthly: final,
      yearly: final * 12,
    })
  };

  render() {
    return (
      <div className="App">
        <h1>Price calculator</h1>
        <label for="amount">Amount:</label>
        <input id="amount" type="text" name="amount" value={this.state.amount} onChange={e => this.handleChange(e)} />
        <br></br>
        <br></br>

        <label for="times">Numberoftimes:</label>
        <input id="times" type="text" name="times" value={this.state.times} onChange={e => this.handleChange(e)} />
        <br />
        {this.state.error ? <div> {this.state.error}</div> : null}
        <br />
        <button onClick={() => this.calculate()}>Calculate </button>
        <br />
        {this.state.monthly && this.state.yearly ? <div>
          <div>cost per month: €{this.state.monthly} </div>
          <div>cost per year: €{this.state.yearly} </div>
        </div> : null
        }
      </div >
    );
  }
}

export default App;
