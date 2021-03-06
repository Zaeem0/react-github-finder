import React, { useReducer, useEffect } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_USERS,
  GET_REPOS
} from "../types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search users by name and bio
  const getUsers = async () => {
    setLoading();

    let url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const res = await axios.get(url);

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
    console.log("dispatched GET_USERS");
  };

  //Search users by name and bio
  const searchUsers = async text => {
    setLoading();

    let url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&`;
    const res = await axios.get(url);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  //Single user result
  const getUser = async username => {
    setLoading();
    let url = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&`;

    const res = await axios.get(url);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  //Get user repos
  const getUserRepos = async username => {
    setLoading();
    let url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&`;
    const res = await axios.get(url);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  //Reset search results
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUsers,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
