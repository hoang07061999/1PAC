import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";

class RootContainer extends Component {
  render() {
    return <App />;
  }
}

ReactDOM.render(<RootContainer />, document.getElementById("root"));
