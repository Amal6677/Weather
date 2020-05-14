import React from "react";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "Amal" };
    //this.state = { username: "Amal" };
  }

  render() {
    return (
      <header style={{ backgroundColor: "Steelblue", padding: "10px" }}>
        <img src="logo512.png" alt="some logo" style={{ width: "50px" }}></img>
        <h2>Welcome {this.state.username} to Party events</h2>
      </header>
    );
  }
}

export default Header;
