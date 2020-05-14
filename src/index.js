import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import Footer from "./Footer"; //refer to Footer.js
import Header from "./Header";
import Weather from "./Weather";
import Forecast from "./Forecast";
import * as serviceWorker from "./serviceWorker";

/*let myTitle = (
  <div>
    <img src="logo512.png" alt="some logo" style={{ width: "50px" }}></img>
    <h2>Welcome {username} to Party events</h2>
  </div>
);*/

//let footer = <h3>Amal Vijay</h3>;

class Main extends React.Component {
  render() {
    return (
      <main>
        <p>This is the main componenet</p>
        <Weather title="Current Weather" />
        <Forecast title="Forecast" />
      </main>
    );
  }
}

//ReactDOM.render(<Header username="Amal" />, document.getElementById("header"));
//ReactDOM.render(<Footer />, document.getElementById("footer"));

class Root extends React.Component {
  render() {
    return (
      <div>
        <Header username="Amal" />
        <Main />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
