import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  //Load users on page load
  async componentDidMount() {
    this.setState({
      loading: true
    });

    let url = `
    https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&
    `;
    const res = await axios.get(url);

    this.setState({
      users: res.data,
      loading: false
    });
  }

  //Search users by name and bio
  searchUsers = async text => {
    this.setState({
      loading: true,
      alert: null
    });

    let url = `
    https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&
    `;

    const res = await axios.get(url);

    this.setState({
      users: res.data.items,
      loading: false
    });
  };

  //Single user result
  getUser = async username => {
    console.log("getting user");
    this.setState({ loading: true });

    let url = `
    https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&
    `;

    const res = await axios.get(url);

    this.setState({
      user: res.data,
      loading: false
    });
  };

  //Reset search results
  clearUsers = () => this.setState({ users: [], loading: false });

  //Search validation alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, loading, user } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      setAlert={this.setAlert}
                      showClear={users.length > 0}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
