import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Users from "./components/users/Users";

class App extends Component {
  state = {
    users: [],
    loading: false
  };
  async componentDidMount() {
    this.setState({
      loading: true
    });

    let url = `
    https://api.github.com/users?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&
    `;
    const res = await axios.get(url);

    this.setState({
      users: res.data,
      loading: false
    });
  }
  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
